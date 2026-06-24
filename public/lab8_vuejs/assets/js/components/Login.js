const Login = {
    template: `
        <div class="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen py-16 px-6 flex items-center justify-center">
            <div class="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mx-auto mb-4">
                        <i class="fas fa-lock"></i>
                    </div>
                    <h2 class="text-3xl font-extrabold text-gray-800">Form Login Admin</h2>
                    <p class="text-gray-500 mt-2 text-sm">Masuk untuk mengelola artikel portal berita</p>
                </div>
                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Username / Email</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <i class="fas fa-user"></i>
                            </span>
                            <input type="text" v-model="username" required
                                class="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                                placeholder="Masukkan username atau email">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <i class="fas fa-key"></i>
                            </span>
                            <input type="password" v-model="password" required
                                class="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                                placeholder="Masukkan password">
                        </div>
                    </div>
                    <div>
                        <button type="submit" :disabled="loading"
                            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex justify-center items-center">
                            <span v-if="loading" class="spinner-border mr-2 border-2 border-t-transparent border-white rounded-full w-4 h-4 animate-spin"></span>
                            Masuk Aplikasi
                        </button>
                    </div>
                </form>
                <div v-if="errorMessage" class="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <div class="flex">
                        <div class="flex-shrink-0 text-red-500">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            loading: false
        };
    },
    methods: {
        handleLogin() {
            this.loading = true;
            this.errorMessage = '';
            axios.post(apiUrl + '/api/login', {
                username: this.username,
                password: this.password
            })
            .then(response => {
                this.loading = false;
                if (response.data.status === 200) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userToken', response.data.data.token);
                    this.$root.isLoggedIn = true;
                    this.$router.push('/artikel');
                }
            })
            .catch(error => {
                this.loading = false;
                if (error.response && error.response.data && error.response.data.messages) {
                    const msg = error.response.data.messages;
                    this.errorMessage = typeof msg === 'object' ? Object.values(msg).join(', ') : msg;
                } else {
                    this.errorMessage = 'Terjadi kesalahan jaringan atau server.';
                }
            });
        }
    }
};
