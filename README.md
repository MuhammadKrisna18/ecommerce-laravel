# 🛍️ Tokped E-Commerce Enterprise Platform

Platform E-Commerce modern berbasis **Laravel 12**, **Inertia.js**, dan **React** yang dirancang dengan standar arsitektur kelas enterprise, fokus pada performa tinggi, pengalaman pengguna (UI/UX) yang intuitif, serta sistem keamanan autentikasi yang ketat.

---

## 📖 1. Deskripsi Aplikasi

**Tokped E-Commerce** adalah sistem pengelolaan platform belanja daring (*e-commerce*) dengan panel administrasi modern. Aplikasi ini memadukan keandalan arsitektur backend Laravel dengan kelincahan antarmuka SPA (*Single Page Application*) dari React via Inertia.js. Panel admin menyajikan visualisasi data analitik toko, manajemen pengaturan sistem, kontrol lokalisasi multi-bahasa, serta perlindungan akses administratif secara menyeluruh.

---

## 🎯 2. Tujuan Aplikasi

1. **Efisiensi Manajemen Toko**: Menyediakan pusat kendali (*command center*) yang cepat dan responsif bagi administrator untuk memantau performa penjualan, pesanan, dan konfigurasi toko.
2. **Keamanan & Integritas Sesi Terjamin**: Memastikan data sensitif administratif terlindungi dari celah keamanan umum (XSS, Session Hijacking, Unauthorized Back-History Cache, dan brute-force).
3. **Pengalaman Pengguna (UI/UX) Berkualitas Tinggi**: Menghadirkan antarmuka minimalis bernuansa *maroon & dark mode*, transisi animasi yang mulus (*Framer Motion*), serta navigasi yang ergonomis di perangkat desktop maupun mobile.
4. **Kode yang Terstruktur & Scalable**: Membangun fondasi kode yang bersih (*Clean Code*) dan mudah dirawat atau diperluas di masa depan dengan pemisahan tanggung jawab yang jelas.

---

## ✨ 3. Fitur-Fitur yang Ada Sekarang

### 🛡️ Autentikasi & Keamanan (Security)
- **Role-Based Access Control (RBAC)**: Pembatasan akses berbasis peran (`admin`), memblokir akses rute privat dari pengguna yang tidak memiliki wewenang.
- **Sesi Expired Otomatis saat Logout**: Ketika tombol logout diklik, sesi langsung dihancurkan (`invalidate`), token CSRF diregenerasi, dan sesi lama tidak dapat digunakan kembali.
- **Pencegahan Riwayat Browser (Anti Back-History Cache)**: Penerapan header anti-cache (`Cache-Control: no-cache, no-store, must-revalidate`) serta pembersihan client router state (`window.location.replace`), sehingga user yang sudah logout tidak dapat kembali melihat data dashboard saat menekan tombol *Back* pada peramban (Chrome/Edge/Firefox).
- **Halaman Login Interaktif**: Dilengkapi fitur *Show/Hide Password*, *Remember Me*, *Rate Limiting* / proteksi throttle, dan animasi *micro-interaction*.

### 📊 Dashboard Monitoring
- **Statistik & Metrik Penjualan**: Ringkasan Total Pengguna, Total Pesanan, Akumulasi Pendapatan, dan Tingkat Konversi dengan indikator tren pertumbuhan.
- **Log Aktivitas & Audit Keamanan**: Pemantauan langsung peristiwa sistem (pemberitahuan keamanan, perubahan cache, dan status integritas database).
- **Desain Modern Minimalis**: Tampilan *dark maroon* yang elegan dengan layout grid responsif dan efek *ambient glow*.

### ⚙️ Pengaturan Toko & Lokalisasi
- **Pengaturan Metadata Toko**: Konfigurasi Nama Toko, Deskripsi, Kontak Email, dan Nomor Telepon.
- **Multi-Bahasa (i18n)**: Dukungan dinamis untuk multi-bahasa (Bahasa Indonesia, English, Español) dengan dialog konfirmasi pergantian bahasa.
- **Optimasi Caching Pengaturan**: Pengambilan pengaturan toko dioptimalkan dengan Laravel Cache (`Cache::rememberForever`) dan pembersihan otomatis saat data diperbarui.

---

## 🏛️ 4. Arsitektur yang Dipakai

Aplikasi ini mengadopsi pola **Layered Architecture** tingkat lanjut (Enterprise Pattern) di atas ekosistem Laravel & React:

```
[ Frontend: React + Inertia.js ]
            │  (HTTP / JSON State)
            ▼
[ Controller Layer ] (Web/Admin/Auth)
            │
            ├──────────────► [ DTO (Data Transfer Objects) ]
            ▼
[ Action Layer ] (Single Responsibility: e.g. UpdateSettingsAction)
            │
            ├──────────────► [ Service Layer & Cache ] (e.g. SettingService)
            ▼
[ Repository Layer ] (e.g. SettingRepository -> BaseRepository)
            │
            ▼
[ Eloquent Models & Database (MySQL / PostgreSQL / SQLite) ]
```

### Penjelasan Lapisan Arsitektur:

1. **Frontend Layer (Inertia.js + React + Tailwind CSS + Framer Motion)**:
   - Menghilangkan kebutuhan untuk membangun API RESTful manual dengan tetap mempertahankan keuntungan SPA (tanpa reload halaman penuh).
   - Desain modular berbasis komponen (`Components/ui`, `Features`, `Layouts`).

2. **Controller Layer (`app/Http/Controllers`)**:
   - Berperan ramping (*thin controller*) hanya untuk menerima HTTP request, memanggil validasi Form Request, dan mendelegasikan tugas ke Action / Service.

3. **Action Layer (`app/Actions`)**:
   - Menerapkan prinsip *Single Responsibility Principle (SRP)*. Tiap operasi bisnis utama (misalnya `UpdateSettingsAction`) dibungkus dalam satu class Action dengan manajemen transaksi database (`DB::beginTransaction`).

4. **Service & Cache Layer (`app/Services`)**:
   - Menangani orkestrasi logika bisnis tingkat menengah dan strategi caching (misal `SettingService`) untuk memastikan performa database tetap optimal.

5. **Repository Layer (`app/Repositories`)**:
   - Mengabstraksi logika akses data Eloquent melalui antarmuka (`RepositoryInterface` dan `BaseRepository`), memudahkan unit testing dan decoupling langsung terhadap database engine.

6. **DTO Layer (`app/DTOs`)**:
   - Menyediakan struktur transfer data yang terdefinisi dengan tipe data yang jelas antara Controller dan Action.

---

## 🚀 Panduan Menjalankan Proyek

### Prasyarat
- PHP >= 8.2
- Composer
- Node.js >= 18.x & NPM

### Langkah Instalasi
```bash
# 1. Clone repositori
git clone https://github.com/MuhammadKrisna18/ecommerce-laravel.git
cd ecommerce-laravel

# 2. Install dependensi backend & frontend
composer install
npm install

# 3. Konfigurasi Environment
cp .env.example .env
php artisan key:generate

# 4. Jalankan Migrasi Database & Seeder
php artisan migrate --seed

# 5. Jalankan Server Pengembangan
# Terminal 1:
php artisan serve

# Terminal 2:
npm run dev
```

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah lisensi [MIT](LICENSE).
