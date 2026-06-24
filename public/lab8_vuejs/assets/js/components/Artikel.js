const Artikel = {
    template: `
        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen py-12 px-6">
            <div class="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
                <!-- Header Section -->
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-6 mb-8">
                    <div>
                        <h2 class="text-3xl font-extrabold text-gray-800 tracking-tight">Kelola Artikel Berita</h2>
                        <p class="text-gray-500 mt-1 text-sm">Dashboard manajemen konten berbasis Single Page Application</p>
                    </div>
                    <button @click="tambah"
                        class="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center">
                        <i class="fas fa-plus mr-2"></i> Tambah Artikel
                    </button>
                </div>

                <!-- Alert Messages -->
                <div v-if="successMessage" class="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-green-500 mr-3"><i class="fas fa-check-circle"></i></span>
                        <p class="text-sm font-semibold text-green-800">{{ successMessage }}</p>
                    </div>
                    <button @click="successMessage = ''" class="text-green-800 hover:text-green-950 font-bold">&times;</button>
                </div>

                <div v-if="errorMessage" class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-red-500 mr-3"><i class="fas fa-exclamation-circle"></i></span>
                        <p class="text-sm font-semibold text-red-800">{{ errorMessage }}</p>
                    </div>
                    <button @click="errorMessage = ''" class="text-red-800 hover:text-red-950 font-bold">&times;</button>
                </div>

                <!-- Loading Spinner -->
                <div v-if="loading" class="text-center py-12">
                    <div class="spinner-border text-blue-600 border-4 border-t-transparent border-blue-600 rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
                    <p class="text-gray-500 font-medium">Memuat data artikel dari server...</p>
                </div>

                <!-- Articles Table -->
                <div v-else class="overflow-x-auto rounded-xl border border-gray-150">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 text-gray-700 uppercase text-xs font-bold border-b border-gray-200">
                                <th class="py-4 px-6">ID</th>
                                <th class="py-4 px-6 w-1/2">Judul & Isi</th>
                                <th class="py-4 px-6">Author</th>
                                <th class="py-4 px-6">Status</th>
                                <th class="py-4 px-6 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 text-sm text-gray-600">
                            <tr v-for="(row, index) in artikel" :key="row.id" class="hover:bg-gray-50 transition-colors duration-150">
                                <td class="py-4 px-6 font-bold text-gray-800">{{ row.id }}</td>
                                <td class="py-4 px-6">
                                    <div class="font-bold text-gray-900 text-base mb-1">{{ row.judul }}</div>
                                    <div class="text-gray-500 text-xs line-clamp-2 max-w-lg">{{ row.isi.substring(0, 100) }}...</div>
                                </td>
                                <td class="py-4 px-6 font-medium">{{ row.author || 'Admin' }}</td>
                                <td class="py-4 px-6">
                                    <span :class="parseInt(row.status) == 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                                        class="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                                        {{ statusText(row.status) }}
                                    </span>
                                </td>
                                <td class="py-4 px-6 text-center">
                                    <div class="flex justify-center space-x-2">
                                        <button @click="edit(row)"
                                            class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1.5 px-3 rounded shadow-sm transition-colors duration-150 flex items-center">
                                            <i class="fas fa-edit mr-1"></i> Edit
                                        </button>
                                        <button @click="hapus(index, row.id)"
                                            class="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded shadow-sm transition-colors duration-150 flex items-center">
                                            <i class="fas fa-trash-alt mr-1"></i> Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="artikel.length === 0">
                                <td colspan="5" class="py-8 text-center text-gray-400 font-medium">Tidak ada data artikel.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Form Modal -->
                <div class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300"
                    v-if="showForm">
                    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all border border-gray-100 animate-fade-in-up">
                        <!-- Modal Header -->
                        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 py-4 px-6 text-white flex justify-between items-center">
                            <h3 class="text-xl font-bold">{{ formTitle }}</h3>
                            <button @click="showForm = false" class="text-white hover:text-gray-200 text-2xl font-bold leading-none">&times;</button>
                        </div>

                        <!-- Modal Body -->
                        <form @submit.prevent="saveData" class="p-6 space-y-6">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Judul Artikel</label>
                                <input type="text" v-model="formData.judul" required
                                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                                    placeholder="Masukkan judul artikel minimal 5 karakter">
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Isi Artikel</label>
                                <textarea v-model="formData.isi" rows="6" required
                                    class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                                    placeholder="Masukkan isi konten artikel minimal 10 karakter"></textarea>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">Penulis (Author)</label>
                                    <input type="text" v-model="formData.author"
                                        class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                                        placeholder="Nama penulis">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">Status Publikasi</label>
                                    <select v-model="formData.status"
                                        class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200">
                                        <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <!-- Modal Footer -->
                            <div class="flex justify-end space-x-3 border-t border-gray-100 pt-4 mt-8">
                                <button type="button" @click="showForm = false"
                                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200">
                                    Batal
                                </button>
                                <button type="submit" :disabled="formSaving"
                                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 flex items-center">
                                    <span v-if="formSaving" class="spinner-border mr-2 border-2 border-t-transparent border-white rounded-full w-4 h-4 animate-spin"></span>
                                    Simpan Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            artikel: [],
            formData: {
                id: null,
                judul: '',
                isi: '',
                status: 1,
                author: 'Admin'
            },
            showForm: false,
            formTitle: 'Tambah Data',
            formSaving: false,
            loading: false,
            successMessage: '',
            errorMessage: '',
            statusOptions: [
                { text: 'Draft', value: 0 },
                { text: 'Publish', value: 1 },
            ]
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.loading = true;
            this.errorMessage = '';
            axios.get(apiUrl + '/post')
                .then(response => {
                    this.artikel = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.errorMessage = 'Gagal mengambil data artikel: ' + (error.response?.data?.messages || error.message);
                });
        },
        tambah() {
            this.formTitle = 'Tambah Artikel Baru';
            this.formData = {
                id: null,
                judul: '',
                isi: '',
                status: 1,
                author: 'Admin'
            };
            this.showForm = true;
        },
        edit(row) {
            this.formTitle = 'Ubah Data Artikel';
            this.formData = {
                id: row.id,
                judul: row.judul,
                isi: row.isi,
                status: parseInt(row.status),
                author: row.author || 'Admin'
            };
            this.showForm = true;
        },
        hapus(index, id) {
            if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
                axios.delete(apiUrl + '/post/' + id)
                    .then(response => {
                        this.artikel.splice(index, 1);
                        this.successMessage = 'Artikel berhasil dihapus.';
                        setTimeout(() => this.successMessage = '', 3000);
                    })
                    .catch(error => {
                        this.errorMessage = 'Gagal menghapus artikel: ' + (error.response?.data?.messages || error.message);
                    });
            }
        },
        saveData() {
            this.formSaving = true;
            this.errorMessage = '';

            const isEdit = !!this.formData.id;
            const request = isEdit
                ? axios.put(apiUrl + '/post/' + this.formData.id, this.formData)
                : axios.post(apiUrl + '/post', this.formData);

            request
                .then(response => {
                    this.formSaving = false;
                    this.showForm = false;
                    this.successMessage = isEdit ? 'Artikel berhasil diperbarui.' : 'Artikel baru berhasil ditambahkan.';
                    this.loadData();
                    setTimeout(() => this.successMessage = '', 3500);
                })
                .catch(error => {
                    this.formSaving = false;
                    if (error.response && error.response.data && error.response.data.messages) {
                        const msg = error.response.data.messages;
                        this.errorMessage = typeof msg === 'object' ? Object.values(msg).join(', ') : msg;
                    } else {
                        this.errorMessage = 'Gagal menyimpan data: ' + (error.message || 'Error');
                    }
                });
        },
        statusText(status) {
            return parseInt(status) === 1 ? 'Publish' : 'Draft';
        }
    }
};
