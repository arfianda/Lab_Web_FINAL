const About = {
    template: `
        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen py-12 px-6">
            <div class="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
                <div class="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 relative">
                    <!-- Profile avatar container -->
                    <div class="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <div class="w-24 h-24 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold shadow-md">
                            PB
                        </div>
                    </div>
                </div>
                <div class="pt-16 pb-8 px-6 text-center">
                    <h2 class="text-2xl font-bold text-gray-800">Arfianda</h2>
                    <p class="text-indigo-600 font-medium text-sm">Mahasiswa Universitas Pelita Bangsa</p>
                    <p class="text-gray-500 text-sm mt-1">Teknik Informatika</p>
                    <div class="border-t border-gray-100 my-6"></div>
                    <h3 class="font-bold text-gray-800 text-left mb-3">Informasi Praktikum</h3>
                    <div class="space-y-3 text-left">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-400">Mata Kuliah:</span>
                            <span class="text-gray-700 font-semibold">Pemrograman Web 2</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-400">Dosen Pengampu:</span>
                            <span class="text-gray-700 font-semibold">Agung Nugroho, S.Kom., M.Kom.</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-400">Status Keamanan:</span>
                            <span class="text-green-600 font-semibold"><i class="fas fa-lock"></i> Terproteksi (SPA Auth)</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-400">Lokasi Kelas:</span>
                            <span class="text-gray-700 font-semibold text-right">Bekasi, Jawa Barat</span>
                        </div>
                    </div>
                    <div class="mt-8">
                        <router-link to="/" class="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors duration-200">
                            <i class="fas fa-arrow-left mr-1"></i> Kembali ke Beranda
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    `
};
