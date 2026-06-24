<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\Http\RequestInterface;
use CodeIgniter\Http\ResponseInterface;
use Config\Services;
use App\Models\UserModel;

class ApiAuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // 1. Ambil data Header Authorization dari request klien
        // Some servers pass Authorization in redirect header or HTTP_AUTHORIZATION
        $authHeader = $request->getServer('HTTP_AUTHORIZATION');
        
        // Alternative fetch if HTTP_AUTHORIZATION is empty (e.g. Apache stripping it)
        if (!$authHeader) {
            $authHeader = $request->header('Authorization');
            if ($authHeader) {
                $authHeader = (string) $authHeader->getValue();
            }
        }

        if (!$authHeader) {
            // Jika header tidak ditemukan, kirim respon error 401
            $response = Services::response();
            $response->setStatusCode(401);
            return $response->setJSON([
                'status' => 401,
                'error' => 401,
                'messages' => 'Akses Ditolak. Token tidak ditemukan pada request!'
            ]);
        }

        // 2. Ekstrak string token (Memisahkan kata 'Bearer' dengan string token)
        $token = null;
        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
        }

        if (!$token || empty($token)) {
            $response = Services::response();
            $response->setStatusCode(401);
            return $response->setJSON([
                'status' => 401,
                'error' => 401,
                'messages' => 'Akses Ditolak. Format token tidak valid!'
            ]);
        }

        // 3. Validasi Token
        try {
            $decoded = base64_decode($token);
            if ($decoded && strpos($decoded, 'TOKEN-SECRET-') === 0) {
                $username = substr($decoded, strlen('TOKEN-SECRET-'));
                $userModel = new UserModel();
                $user = $userModel->where('username', $username)->first();
                if ($user) {
                    // Token valid, lanjutkan request
                    return;
                }
            }
        } catch (\Exception $e) {
            // validasi gagal
        }

        $response = Services::response();
        $response->setStatusCode(401);
        return $response->setJSON([
            'status' => 401,
            'error' => 401,
            'messages' => 'Sesi Token tidak valid atau kedaluwarsa!'
        ]);
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak diperlukan aksi setelah request diproses
    }
}
