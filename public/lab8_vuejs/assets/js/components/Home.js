const Home = {
    template: `
        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen py-12 px-6">
            <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 py-10 px-8 text-white relative overflow-hidden">
                    <div class="relative z-10">
                        <span class="bg-blue-500 bg-opacity-35 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Dashboard</span>
                        <h1 class="text-4xl font-extrabold mt-3 tracking-tight">Selamat Datang di Portal Admin</h1>
                        <p class="text-blue-100 mt-2 text-lg font-light">Sistem Single Page Application (SPA) berbasis Vue.js 3 dan CodeIgniter 4 REST API.</p>
                    </div>
                    <!-- Decorative background shape -->
                    <div class="absolute -right-10 -bottom-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
                </div>
                <div class="p-8">
                    <p class="text-gray-600 leading-relaxed text-lg mb-8">
                        Aplikasi ini dikembangkan untuk mendemonstrasikan integrasi modern antara backend framework PHP (CodeIgniter 4) yang aman dengan antarmuka dinamis frontend JavaScript (Vue.js 3). Seluruh pertukaran data diamankan dengan <strong>Token-Based Authentication</strong> dan diotomatisasi melalui <strong>Axios Interceptors</strong>.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 transition-all duration-300 hover:scale-105 hover:shadow-md">
                            <div class="text-blue-600 text-3xl mb-3">
                                <i class="fas fa-key"></i>
                            </div>
                            <h3 class="font-bold text-gray-800 text-lg">Keamanan Klien</h3>
                            <p class="text-gray-500 text-sm mt-2">Proteksi rute dengan Navigation Guards (beforeEach) mencegah akses ilegal sebelum login.</p>
                        </div>
                        <div class="bg-indigo-50 p-6 rounded-xl border border-indigo-100 transition-all duration-300 hover:scale-105 hover:shadow-md">
                            <div class="text-indigo-600 text-3xl mb-3">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h3 class="font-bold text-gray-800 text-lg">Keamanan Server</h3>
                            <p class="text-gray-500 text-sm mt-2">Setiap request manipulasi data divalidasi oleh Filter Token di sisi server CodeIgniter 4.</p>
                        </div>
                        <div class="bg-purple-50 p-6 rounded-xl border border-purple-100 transition-all duration-300 hover:scale-105 hover:shadow-md">
                            <div class="text-purple-600 text-3xl mb-3">
                                <i class="fas fa-sync-alt"></i>
                            </div>
                            <h3 class="font-bold text-gray-800 text-lg">Interseptor Axios</h3>
                            <p class="text-gray-500 text-sm mt-2">Injeksi token Bearer secara otomatis pada header request dan redirect otomatis jika sesi berakhir (401).</p>
                        </div>
                    </div>
                    <div class="mt-10 flex flex-wrap gap-4 justify-center">
                        <router-link to="/artikel" class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:-translate-y-0.5">
                            Mulai Kelola Artikel <i class="fas fa-arrow-right ml-2"></i>
                        </router-link>
                        <router-link to="/login" v-if="!$root.isLoggedIn" class="bg-white border border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300">
                            Masuk Akun
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    `
};
