const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Tentukan lokasi API REST End Point secara dinamis sesuai base URL yang diakses
const getApiUrl = () => {
    const loc = window.location;
    // Jika diakses melalui subfolder Laragon (misal: /lab11_php_ci/ci4/lab8_vuejs/)
    if (loc.pathname.includes('/lab11_php_ci/ci4/')) {
        return loc.origin + '/lab11_php_ci/ci4/public';
    }
    // Jika diakses melalui spark serve (localhost:8080)
    return loc.origin;
};

const apiUrl = getApiUrl();

// =========================================================================
// IMPLEMENTASI AXIOS INTERCEPTORS (Penyuntik Token Otomatis)
// =========================================================================
axios.interceptors.request.use(
    (config) => {
        // Ambil token dari local storage browser
        const token = localStorage.getItem('userToken');
        
        // Jika token tersedia, masukkan ke dalam HTTP Header Authorization Bearer
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Tangkap secara global jika server merespon dengan error 401 (Unauthorized)
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            alert('Sesi Anda telah berakhir atau Token tidak sah. Silakan login kembali.');
            localStorage.clear(); // Bersihkan local storage
            window.location.href = '#/login'; // Tendang paksa ke halaman login
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

// 1. Definisikan mapping rute URL ke Komponen beserta properti Meta-Auth
const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { 
        path: '/artikel', 
        component: Artikel,
        meta: { requiresAuth: true } // Hanya boleh diakses jika user sudah login
    },
    {
        path: '/about',
        component: About,
        meta: { requiresAuth: true } // Terproteksi sesuai Praktikum 13
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 2. Implementasi Navigation Guards (Pencegat Akses Rute Klien)
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    
    // Jika rute tujuan membutuhkan autentikasi dan user belum login
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        alert('Akses Ditolak! Anda harus login terlebih dahulu.');
        next('/login'); // Belokkan paksa ke halaman login
    } else {
        next(); // Izinkan akses menuju rute tujuan
    }
});

// 3. Inisialisasi Root Instance dengan State Navigasi Global
const app = createApp({
    data() {
        return {
            isLoggedIn: false
        }
    },
    mounted() {
        // Cek status login saat aplikasi pertama kali dimuat oleh browser
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    },
    methods: {
        logout() {
            if (confirm('Apakah Anda yakin ingin keluar aplikasi?')) {
                localStorage.clear();
                this.isLoggedIn = false;
                this.$router.push('/');
            }
        }
    }
});

app.use(router);
app.mount('#app');
