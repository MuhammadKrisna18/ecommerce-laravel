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
- **Role-Based Access Control (RBAC)**: Pembatasan akses berbasis peran (`UserRole::ADMIN`), memblokir akses rute privat dari pengguna non-admin.
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

Aplikasi ini mengadopsi pola **Layered Architecture** tingkat lanjut (Enterprise Pattern) yang mematuhi prinsip **SOLID** (terutama **SRP** & **DIP**):

```
[ Frontend: React + Inertia.js ]
            │  (HTTP / JSON State)
            ▼
[ Controller Layer ] (e.g. SettingsController)
            │
            ├──────────────► [ FormRequest (SRP Validation) ] & [ DTO Layer ]
            ▼
[ Action Layer ] (Single Responsibility: UpdateSettingsAction)
            │
            ▼
[ Service Contract / DIP Interface ] (SettingServiceInterface)
            │
            ▼
[ Service & Cache Layer ] (SettingService)
            │
            ▼
[ Repository Contract / DIP Interface ] (SettingRepositoryInterface)
            │
            ▼
[ Repository Layer ] (SettingRepository -> BaseRepository)
            │
            ▼
[ Eloquent Models & Database ]
```

### Penjelasan Lapisan Arsitektur & Prinsip yang Diterapkan:

1. **Frontend Layer (Inertia.js + React + Tailwind CSS + Framer Motion)**:
   - Menghilangkan kebutuhan untuk membangun API RESTful manual dengan tetap mempertahankan keuntungan SPA (tanpa reload halaman penuh).
   - Desain modular berbasis komponen (`Components/ui`, `Features`, `Layouts`).

2. **Controller Layer (`app/Http/Controllers`)**:
   - Berperan ramping (*thin controller*) hanya untuk menerima HTTP request, mendelegasikan validasi ke FormRequest, dan memanggil Action.

3. **Form Request & DTO Layer (`app/Http/Requests` & `app/DTOs`)**:
   - Mematuhi **Single Responsibility Principle (SRP)**: Validasi dan otorisasi diisolasi penuh di Form Request.
   - Data hasil validasi dipetakan ke dalam Data Transfer Object bertipe (`UpdateSettingsDTO`) untuk transportasi data yang bersih dan aman.

4. **Action Layer (`app/Actions`)**:
   - Satu class Action merepresentasikan satu skenario bisnis tunggal (*Single Responsibility*).

5. **Dependency Inversion Principle (DIP)**:
   - Lapisan tingkat atas tidak bergantung pada modul konkret, melainkan pada abstraksi kontrak:
     - `SettingServiceInterface` diikat (*bound*) ke `SettingService`.
     - `SettingRepositoryInterface` diikat (*bound*) ke `SettingRepository`.
   - Seluruh registrasi binding terpusat di `AppServiceProvider`.

6. **Eliminasi Hardcode (Clean Code)**:
   - Nilai peran menggunakan PHP Enum (`App\Enums\UserRole`).
   - Kode bahasa menggunakan PHP Enum (`App\Enums\AppLocale`).
   - Kunci pengaturan menggunakan constant class (`App\Constants\SettingKey`).
   - Seluruh pesan notifikasi dan status menggunakan fungsi lokalisasi `__('...')`.

---

## 🧪 5. Pengujian Kualitas (Testing with EP & BVA)

Aplikasi dilengkapi unit testing dan feature testing berbasis teknik rekayasa perangkat lunak standar industri:

- **Equivalence Partitioning (EP)**:
  - Pembagian partisi data input ke dalam kelas valid dan invalid (misalnya partisi email sah vs email cacat, partisi locale valid `id, en, es` vs partisi ilegal `fr, jp, 123`).
  - Pencegahan *mass-assignment* pada DTO (pengabaian properti asing).
- **Boundary Value Analysis (BVA)**:
  - Pengujian titik batas ekstrem pada aturan validasi:
    - Nama Toko: Batas $N=255$ karakter (Valid) vs $N+1=256$ karakter (Invalid).
    - Deskripsi Toko: Batas $N=1000$ karakter (Valid) vs $N+1=1001$ karakter (Invalid).
    - Telepon: Batas $N=20$ karakter (Valid) vs $N+1=21$ karakter (Invalid).
    - Password: Batas panjang 0 (Invalid) vs panjang 1 (Valid).

### Menjalankan Testing
```bash
# Menjalankan seluruh pengujian unit (EP & BVA)
php artisan test tests/Unit

# Menjalankan seluruh test suite aplikasi
php artisan test
```

---

## 🚀 6. Panduan Menjalankan Proyek

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
