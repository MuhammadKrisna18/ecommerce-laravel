# 🛍️ Tokped E-Commerce Enterprise Platform

Platform E-Commerce modern berbasis **Laravel 12**, **Inertia.js**, dan **React** yang dirancang dengan standar arsitektur kelas enterprise, fokus pada performa tinggi, pengalaman pengguna (UI/UX) yang intuitif, pemisahan peran yang tegas (**Admin & User**), serta sistem keamanan autentikasi yang ketat.

---

## 📖 1. Deskripsi Aplikasi

**Tokped E-Commerce** adalah sistem pengelolaan platform belanja daring (*e-commerce*) dengan panel administrasi modern dan area pengguna (*User*). Aplikasi ini memadukan keandalan arsitektur backend Laravel dengan kelincahan antarmuka SPA (*Single Page Application*) dari React via Inertia.js.

Sistem mendukung alur multi-role secara komprehensif:
- **Admin**: Mengelola pengaturan toko, memantau statistik pengguna, dan mengawasi daftar akun pengguna secara real-time.
- **User (Pelanggan)**: Melakukan registrasi mandiri dari portal login, masuk ke dashboard pengguna khusus, dan disiapkan untuk modul transaksi selanjutnya.

---

## 🎯 2. Tujuan Aplikasi

1. **Efisiensi Manajemen Toko & Pengguna**: Menyediakan pusat kendali (*command center*) bagi administrator untuk memantau daftar pengguna terdaftar dan konfigurasi toko secara real-time dari basis data.
2. **Autentikasi & Registrasi Mandiri yang Aman**: Memungkinkan pengguna baru membuat akun role `User` dengan validasi ketat, termasuk penolakan otomatis untuk nama panggilan (*nickname*) yang sudah ada secara *case-insensitive*.
3. **Pemisahan Peran Tegas (Multi-Role RBAC)**: Memastikan rute Admin dan rute User terproteksi secara terpisah oleh middleware dengan pengalihan cerdas (*auto-redirect*) tanpa menimbulkan celah akses.
4. **Keamanan & Integritas Sesi Terjamin**: Memastikan data sensitif terlindungi dari celah keamanan umum (XSS, Session Hijacking, Unauthorized Back-History Cache, dan brute-force).
5. **Pengalaman Pengguna (UI/UX) Berkualitas Tinggi**: Menghadirkan antarmuka minimalis bernuansa *maroon & dark mode*, transisi animasi yang mulus (*Framer Motion*), serta navigasi yang ergonomis di desktop maupun mobile.
6. **Arsitektur Enterprise & Scalable**: Membangun fondasi kode bersih (*Clean Code*) berbasis *Layered Architecture* (DTO, Action, Service Contract, Repository Contract).

---

## ✨ 3. Fitur-Fitur yang Tersedia

### 🛡️ Autentikasi, Registrasi & Keamanan (Security)
- **Role-Based Access Control (RBAC)**:
  - Pembatasan akses berbasis peran (`UserRole::ADMIN` dan `UserRole::USER`).
  - Middleware khusus: `IsAdmin` (`admin`) dan `IsUser` (`user`).
  - **Auto-Redirect Cerdas**: Pengguna role `User` yang sengaja membuka URL `/dashboard` akan otomatis dialihkan ke `/user/dashboard`. Sebaliknya, `Admin` yang membuka `/user/dashboard` dialihkan ke `/dashboard`.
- **Registrasi Akun User Terintegrasi**:
  - Formulir registrasi langsung di portal login dengan transisi animasi mulus (*framer-motion*).
  - Kolom input: **Nama Lengkap**, **Nama Panggilan**, **Email**, dan **Kata Sandi**.
  - **Validasi Unik Case-Insensitive**: Penolakan otomatis jika nama panggilan sudah dipakai (`krisna`, `Krisna`, `KRISNA` dianggap sama).
- **Sesi Expired Otomatis saat Logout**: Ketika tombol logout diklik, sesi langsung dihancurkan (`invalidate`), token CSRF diregenerasi, dan sesi lama tidak dapat digunakan kembali.
- **Pencegahan Riwayat Browser (Anti Back-History Cache)**: Penerapan header anti-cache (`Cache-Control: no-cache, no-store, must-revalidate`) serta pembersihan client router state (`window.location.replace`).
- **Halaman Login Interaktif**: Dilengkapi fitur *Show/Hide Password*, *Remember Me*, *Rate Limiting* / proteksi throttle, dan animasi *micro-interaction*.

### 📊 Dashboard Monitoring Admin
- **Statistik Akun Real-Time**: Ringkasan Total Pengguna User, Total Admin, dan Total Keseluruhan Akun yang tersinkronisasi langsung dengan database.
- **Tabel Daftar Pengguna (User List)**:
  - Menampilkan daftar akun `User` aktif dengan kolom: **Nama Lengkap** (beserta avatar inisial & nickname), **Email**, **Role**, dan **Waktu Pendaftaran**.
  - Dilengkapi *Empty State* responsif jika belum ada data pengguna.
- **Desain Modern Minimalis**: Tampilan *dark maroon* yang elegan dengan layout grid responsif dan efek *ambient glow*.

### 👤 Dashboard Role User
- **Area Dashboard Khusus Pengguna (`/user/dashboard`)**:
  - Halaman dashboard personal untuk role `User` dengan salam sambutan berdasarkan nama panggilan/nama lengkap.
  - Layout mandiri (`UserLayout`) dengan sidebar navigasi, avatar badge, dan tombol logout sesi.
  - Placeholder elegan (*clean empty state*) siap untuk penambahan modul belanja, katalog produk, dan riwayat pesanan.

### ⚙️ Pengaturan Toko & Lokalisasi
- **Pengaturan Metadata Toko**: Konfigurasi Nama Toko, Deskripsi, Kontak Email, dan Nomor Telepon.
- **Multi-Bahasa (i18n)**: Dukungan dinamis untuk multi-bahasa (Bahasa Indonesia, English, Español) dengan dialog konfirmasi pergantian bahasa.
- **Optimasi Caching Pengaturan**: Pengambilan pengaturan toko dioptimalkan dengan Laravel Cache (`Cache::rememberForever`) dan pembersihan otomatis saat data diperbarui.

---

## 🏛️ 4. Arsitektur yang Dipakai

Aplikasi ini mengadopsi pola **Layered Architecture** tingkat lanjut (Enterprise Pattern) yang mematuhi prinsip **SOLID** (terutama **SRP**, **DIP**, dan **SoC**):

```
[ Frontend: React + Inertia.js ]
            │  (HTTP / JSON State)
            ▼
[ Controller Layer ] (SettingsController, Admin\DashboardController, User\DashboardController, RegisteredUserController)
            │
            ├──────────────► [ FormRequest & Custom Rules (SRP Validation) ] & [ DTO Layer ]
            ▼
[ Action Layer ] (RegisterUserAction, UpdateSettingsAction)
            │
            ▼
[ Service Contract / DIP Interface ] (UserServiceInterface, SettingServiceInterface)
            │
            ▼
[ Service & Cache Layer ] (UserService, SettingService)
            │
            ▼
[ Repository Contract / DIP Interface ] (UserRepositoryInterface, SettingRepositoryInterface)
            │
            ▼
[ Repository Layer ] (UserRepository, SettingRepository -> BaseRepository)
            │
            ▼
[ Eloquent Models & Database ]
```

### Penjelasan Lapisan Arsitektur & Prinsip yang Diterapkan:

1. **Frontend Layer (Inertia.js + React + Tailwind CSS + Framer Motion)**:
   - Keuntungan SPA tanpa perlu membangun API RESTful manual.
   - Pemisahan layout terpusat: `AdminLayout` untuk panel admin, `UserLayout` untuk pengguna biasa, dan `AuthLayout` untuk portal autentikasi.

2. **Controller Layer (`app/Http/Controllers`)**:
   - Berperan ramping (*thin controller*) hanya untuk menerima HTTP request, mendelegasikan validasi ke FormRequest, dan memanggil Action/Service.

3. **Form Request & DTO Layer (`app/Http/Requests` & `app/DTOs`)**:
   - Mematuhi **Single Responsibility Principle (SRP)**: Validasi dan otorisasi diisolasi penuh di Form Request (`RegisterRequest`, `UpdateSettingsRequest`).
   - Custom Validation Rule: `UniqueNicknameIgnoreCase` menggunakan Dependency Injection `UserRepositoryInterface` untuk validasi keunikan case-insensitive.
   - Transportasi data menggunakan DTO bertipe (`RegisterUserDTO`, `UpdateSettingsDTO`).

4. **Action Layer (`app/Actions`)**:
   - Satu class Action merepresentasikan satu alur bisnis spesifik (`RegisterUserAction`, `UpdateSettingsAction`).

5. **Dependency Inversion Principle (DIP)**:
   - Lapisan atas tidak bergantung pada kelas implementasi konkret, melainkan pada kontrak antarmuka (*Interface*):
     - `UserServiceInterface` diikat (*bound*) ke `UserService`.
     - `UserRepositoryInterface` diikat (*bound*) ke `UserRepository`.
     - `SettingServiceInterface` diikat (*bound*) ke `SettingService`.
     - `SettingRepositoryInterface` diikat (*bound*) ke `SettingRepository`.
   - Seluruh registrasi binding terpusat di `AppServiceProvider`.

6. **Eliminasi Hardcode (Clean Code)**:
   - Nilai peran menggunakan PHP Enum (`App\Enums\UserRole`).
   - Kode bahasa menggunakan PHP Enum (`App\Enums\AppLocale`).
   - Kunci pengaturan menggunakan constant class (`App\Constants\SettingKey`).
   - Seluruh pesan notifikasi, atribut, dan status menggunakan fungsi lokalisasi `__('...')`.

---

## 🧪 5. Pengujian Kualitas (Testing with EP & BVA)

Aplikasi dilengkapi test suite menyeluruh (Unit & Feature Testing) mencakup skenario:
- **Autentikasi & Registrasi**: Pendaftaran akun baru, redirect berbasis peran, penolakan registrasi dengan nickname kembar (case-insensitive), dan throttle lockout.
- **Otorisasi Role-Based**: Proteksi rute `/dashboard` dan `/user/dashboard` serta auto-redirect antar role.
- **Equivalence Partitioning (EP) & Boundary Value Analysis (BVA)**: Pengujian nilai batas panjang karakter, validitas email, dan isolasi atribut DTO.

### Menjalankan Testing
```bash
# Menjalankan seluruh pengujian unit
php artisan test tests/Unit

# Menjalankan pengujian fitur spesifik
php artisan test tests/Feature/User/UserDashboardTest.php
php artisan test tests/Feature/Auth/RegistrationTest.php
php artisan test tests/Feature/Admin/SettingsTest.php

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

# 5. Build Aset Frontend
npm run build

# 6. Jalankan Server Pengembangan
# Terminal 1:
php artisan serve

# Terminal 2:
npm run dev
```

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah lisensi [MIT](LICENSE).
