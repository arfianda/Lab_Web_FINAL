<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ArtikelModel;

class Post extends ResourceController
{
    use ResponseTrait;

    protected $format = 'json';

    // all articles
    public function index()
    {
        $model = new ArtikelModel();
        $data = $model->orderBy('id', 'DESC')->findAll();
        return $this->respond($data);
    }

    // create a new article
    public function create()
    {
        $model = new ArtikelModel();
        $judul = $this->request->getVar('judul');
        $isi = $this->request->getVar('isi');
        $status = $this->request->getVar('status') ?? '1'; // default to published
        $author = $this->request->getVar('author') ?? 'Admin';

        $data = [
            'judul'  => $judul,
            'isi'    => $isi,
            'slug'   => ArtikelModel::createSlug($judul),
            'status' => $status,
            'author' => $author,
        ];

        if (!$model->insert($data)) {
            return $this->fail($model->errors(), 400);
        }

        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => [
                'success' => 'Data artikel berhasil ditambahkan.'
            ]
        ];
        return $this->respondCreated($response);
    }

    // single article
    public function show($id = null)
    {
        $model = new ArtikelModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }

    // update article
    public function update($id = null)
    {
        $model = new ArtikelModel();
        
        if ($id === null) {
            $id = $this->request->getVar('id');
        }

        $article = $model->find($id);
        if (!$article) {
            return $this->failNotFound('Data tidak ditemukan.');
        }

        $judul = $this->request->getVar('judul') ?? $article['judul'];
        $isi = $this->request->getVar('isi') ?? $article['isi'];
        $status = $this->request->getVar('status') ?? $article['status'];
        $author = $this->request->getVar('author') ?? $article['author'];

        $data = [
            'id'     => $id,
            'judul'  => $judul,
            'isi'    => $isi,
            'slug'   => ArtikelModel::createSlug($judul),
            'status' => $status,
            'author' => $author,
        ];

        if (!$model->update($id, $data)) {
            return $this->fail($model->errors(), 400);
        }

        $response = [
            'status'   => 200,
            'error'    => null,
            'messages' => [
                'success' => 'Data artikel berhasil diubah.'
            ]
        ];
        return $this->respond($response);
    }

    // delete article
    public function delete($id = null)
    {
        $model = new ArtikelModel();

        if ($id === null) {
            $id = $this->request->getVar('id');
        }

        $article = $model->find($id);
        if ($article) {
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Data artikel berhasil dihapus.'
                ]
            ];
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }
}
