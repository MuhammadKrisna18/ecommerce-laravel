# 🛍️ Tokped E-Commerce Enterprise Platform

Platform E-Commerce modern berbasis **Laravel 12**, **Inertia.js**, dan **React** yang dirancang dengan standar arsitektur kelas enterprise, fokus pada performa tinggi, pengalaman pengguna (UI/UX) yang intuitif, pemisahan peran yang tegas (**Admin & User**), serta sistem keamanan autentikasi yang ketat.

---

## 📖 1. Deskripsi Aplikasi

**Tokped E-Commerce** adalah sistem pengelolaan platform belanja daring (*e-commerce*) dengan panel administrasi modern dan area pengguna (*User*). Aplikasi ini memadukan keandalan arsitektur backend Laravel dengan kelincahan antarmuka SPA (*Single Page Application*) dari React via Inertia.js.

Sistem mendukung alur multi-role secara komprehensif:
- **Admin**: Mengelola pengaturan toko, memantau statistik pengguna, serta mengawasi dan mengelola akun pengguna (tindakan pembekuan akun kustom dan penghapusan akun permanen dari database dengan verifikasi kode keamanan).
- **User (Pelanggan)**: Melakukan registrasi mandiri dari portal login atau Google Firebase Auth, masuk ke dashboard pengguna khusus, mengelola profil dan avatar, serta terproteksi oleh sistem pembekuan akun terintegrasi.

---

## 🎯 2. Tujuan Aplikasi

1. **Efisiensi Manajemen Toko & Pengguna**: Menyediakan pusat kendali (*command center*) bagi administrator untuk memantau daftar pengguna, mengonfigurasi toko, serta menindak akun pelanggar secara real-time.
2. **Kontrol Akun yang Aman (Anti-Human-Error)**: Menyediakan mekanisme pembekuan akun dengan pilihan durasi fleksibel (*Jam, Hari, Minggu, Bulan, Tahun*) serta proteksi konfirmasi 4-digit kode verifikasi acak sebelum tindakan pembekuan atau penghapusan permanen dieksekusi.
3. **Penegakan Akun Dibekukan (Frozen Account Guard)**: Mengalihkan pengguna yang sedang dibekukan ke portal pemberitahuan khusus (`/account/frozen`) dan mencegah transaksi maupun akses dashboard hingga masa berlaku pembekuan berakhir.
4. **Autentikasi Ganda (Manual & Firebase Social Login)**: Mendukung autentikasi email & kata sandi konvensional serta integrasi *Firebase Google Authentication*.
5. **Pemisahan Peran Tegas (Multi-Role RBAC)**: Memastikan rute Admin dan rute User terproteksi secara terpisah oleh middleware dengan pengalihan cerdas (*auto-redirect*) tanpa menimbulkan celah akses.
6. **Keamanan & Integritas Sesi Terjamin**: Memastikan data sensitif terlindungi dari celah keamanan umum (XSS, CSRF, Session Hijacking, Unauthorized Back-History Cache).
7. **Arsitektur Enterprise & Scalable**: Membangun fondasi kode bersih (*Clean Code*) berbasis *SOLID* & *Layered Architecture* (DTO, Action, Service Contract, Repository Contract).

---

## ✨ 3. Fitur-Fitur yang Tersedia

### 🛡️ Autentikasi, Registrasi & Keamanan (Security)
- **Role-Based Access Control (RBAC)**:
  - Pembatasan akses berbasis peran (`UserRole::ADMIN` dan `UserRole::USER`).
  - Middleware: `IsAdmin` (`admin`), `IsUser` (`user`), dan `EnsureAccountNotFrozen`.
  - **Auto-Redirect Cerdas**: Pengguna role `User` yang sengaja membuka URL `/dashboard` akan otomatis dialihkan ke `/user/dashboard`. Sebaliknya, `Admin` yang membuka `/user/dashboard` dialihkan ke `/dashboard`.
- **Registrasi Akun User Terintegrasi**:
  - Formulir registrasi langsung di portal login dengan transisi animasi mulus (*framer-motion*).
  - Kolom input: **Nama Lengkap**, **Nama Panggilan**, **Email**, dan **Kata Sandi**.
  - **Validasi Unik Case-Insensitive**: Penolakan otomatis jika nama panggilan sudah dipakai (`krisna`, `Krisna`, `KRISNA` dianggap sama).
- **Integrasi Firebase Authentication (Google Auth)**:
  - Mendukung login cepat dengan akun Google melalui Firebase Auth.
  - Sinkronisasi otomatis ke database lokal dengan pembuatan *unique nickname* otomatis.
- **Sesi Expired Otomatis saat Logout**: Ketika tombol logout diklik, sesi langsung dihancurkan (`invalidate`), token CSRF diregenerasi, dan sesi lama tidak dapat digunakan kembali.
- **Pencegahan Riwayat Browser (Anti Back-History Cache)**: Penerapan header anti-cache (`Cache-Control: no-cache, no-store, must-revalidate`) serta pembersihan client router state (`window.location.replace`).

### ⚙️ Panel Pengaturan Toko & Manajemen Pengguna (`/admin/settings`)
- **Daftar Akun Pengguna Non-Admin**:
  - Menampilkan daftar pelanggan dengan detail Nama Lengkap, Inisial Avatar, Email, Status Akun (`Aktif` atau `Dibekukan`), dan Tanggal Terdaftar.
  - Fitur pencarian instan (*instant search*) berdasarkan nama atau email.
  - Akun Administrator otomatis dikecualikan dari daftar tindakan untuk mencegah *self-lockout*.
- **Aksi Pembekuan Akun (Freeze Account) dengan Durasi Fleksibel**:
  - Admin dapat menentukan batas waktu pembekuan dengan satuan: **Jam**, **Hari**, **Minggu**, **Bulan**, atau **Tahun**.
  - Kolom opsional alasan pembekuan akun.
  - Tombol **Buka Beku (Unfreeze)** langsung untuk memulihkan akun seketika.
- **Aksi Hapus Akun Permanen (Delete User)**:
  - Menghapus akun pengguna beserta berkas avatar dari penyimpanan dan database secara permanen.
- **Proteksi 4-Digit Kode Keamanan Acak**:
  - Mencegah kesalahan klik (*accidental execution*). Admin diwajibkan mengetik ulang 4 karakter acak yang muncul di pop-up card sebelum tindakan pembekuan atau penghapusan dieksekusi.
  - Validasi ganda diterapkan di sisi klien (React) dan sisi server (Laravel FormRequest).

### 🧊 Halaman Khusus Akun Dibekukan (`/account/frozen`)
- Pengguna yang status akunnya dibekukan otomatis dialihkan ke halaman pemberitahuan khusus ini saat login atau saat menjelajahi platform.
- Menampilkan informasi batas waktu pembekuan (`frozen_until`), sisa durasi pembekuan dalam format waktu relatif (`diffForHumans`), alasan pembekuan dari admin, serta tombol logout dan tautan bantuan.

### 👤 Modul Profil Pengguna (`/user/profile`)
- Pengguna dapat memperbarui nama lengkap, nama panggilan, tanggal lahir, tempat lahir, alamat, serta mengunggah atau menghapus foto profil (avatar).

### 📊 Dashboard Monitoring Admin (`/admin/dashboard`)
- Statistik Akun Real-Time: Total Pengguna, Total Admin, dan Total Keseluruhan Akun.
- Daftar pendaftar pengguna terbaru (*recent users*).

---

## 🏛️ 4. Arsitektur yang Dipakai

Aplikasi ini mengadopsi pola **Layered Architecture** tingkat lanjut (Enterprise Pattern) yang mematuhi prinsip **SOLID** (terutama **SRP**, **DIP**, dan **SoC**):

```
[ Frontend: React + Inertia.js ]
            │  (HTTP Request / Form Submit)
            ▼
[ Controller Layer ] (UserManagementController, SettingsController, FrozenNoticeController, FirebaseAuthController)
            │
            ├──────────────► [ FormRequest Layer (SRP Validation) ] & [ DTO Layer (Type Safety) ]
            ▼
[ Action Layer ] (FreezeUserAction, UnfreezeUserAction, DeleteUserAction, RegisterUserAction, UpdateSettingsAction)
            │
            ▼
[ Service Contract / DIP Interface ] (UserServiceInterface, SettingServiceInterface)
            │
            ▼
[ Service Layer ] (UserService, SettingService)
            │
            ▼
[ Repository Contract / DIP Interface ] (UserRepositoryInterface, SettingRepositoryInterface)
            │
            ▼
[ Repository Layer ] (UserRepository, SettingRepository -> BaseRepository)
            │
            ▼
[ Eloquent Models & Database Migration ]
```

### Penjelasan Lapisan Arsitektur & Prinsip yang Diterapkan:

1. **Frontend Layer (Inertia.js + React + Tailwind CSS + Framer Motion)**:
   - Keuntungan SPA tanpa perlu membangun API RESTful manual.
   - Komponen terisolasi dan modular: `UserManagementList`, `CleanModal`, `SettingsForm`, dsb.

2. **Controller Layer (`app/Http/Controllers`)**:
   - Berperan ramping (*thin controller*). Hanya menerima request, memanggil FormRequest untuk validasi, membungkus data ke DTO, dan mengeksekusi Action / Service. Bebas dari query SQL langsung.

3. **Form Request & DTO Layer (`app/Http/Requests` & `app/DTOs`)**:
   - Mematuhi **Single Responsibility Principle (SRP)**:
     - `FreezeUserRequest`: Validasi durasi dan pencocokan 4-digit kode konfirmasi.
     - `DeleteUserRequest`: Otorisasi admin dan validasi 4-digit kode konfirmasi.
   - **Data Transfer Objects (DTO)** menjamin *type safety*: `FreezeUserDTO`, `FirebaseAuthDTO`, `RegisterUserDTO`, `UpdateSettingsDTO`, `UpdateProfileDTO`.

4. **Action Layer (`app/Actions`)**:
   - Mengisolasi tiap kasus penggunaan bisnis ke dalam satu *single-action class*:
     - `App\Actions\Admin\FreezeUserAction`
     - `App\Actions\Admin\UnfreezeUserAction`
     - `App\Actions\Admin\DeleteUserAction`
     - `App\Actions\Auth\RegisterUserAction`
     - `App\Actions\Settings\UpdateSettingsAction`
     - `App\Actions\Profile\UpdateProfileAction`

5. **Dependency Inversion Principle (DIP) & Dependency Injection (DI)**:
   - Controller dan Action hanya bergantung pada abstraksi antarmuka (*Interface*), bukan kelas konkret:
     - `UserServiceInterface` ➔ di-bind ke `UserService`
     - `UserRepositoryInterface` ➔ di-bind ke `UserRepository`
     - `SettingServiceInterface` ➔ di-bind ke `SettingService`
     - `SettingRepositoryInterface` ➔ di-bind ke `SettingRepository`
   - Terdaftar rapi di `AppServiceProvider`.

6. **Eliminasi Hardcode (Clean Code)**:
   - Peran akun menggunakan PHP Enum `UserRole` (`admin`, `user`).
   - Bahasa sistem menggunakan PHP Enum `AppLocale` (`id`, `en`, `es`).
   - Kunci pengaturan toko menggunakan konstanta `SettingKey`.
   - String tampilan dan error menggunakan fungsi penerjemah `__('...')` dan helper `useTranslation`.

---

## 🧪 5. Pengujian Kualitas (Testing with EP & BVA)

Aplikasi dilengkapi test suite komprehensif menggunakan PHPUnit / Pest:
- **User Management & Security Testing** (`tests/Feature/Admin/UserManagementTest.php`):
  - `test_admin_can_freeze_user_with_valid_verification_code`
  - `test_admin_cannot_freeze_user_with_invalid_verification_code`
  - `test_admin_can_unfreeze_user`
  - `test_admin_can_delete_user_with_valid_verification_code`
  - `test_frozen_user_is_redirected_to_frozen_notice`
- **Settings & Dashboard Testing** (`tests/Feature/Admin/SettingsTest.php`)
- **Autentikasi & Registrasi**: Pendaftaran akun baru, redirect berbasis peran, penolakan registrasi dengan nickname kembar (case-insensitive), dan throttle lockout.

### Menjalankan Testing
```bash
# Menjalankan pengujian fitur User Management
php artisan test tests/Feature/Admin/UserManagementTest.php

# Menjalankan pengujian panel pengaturan toko
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
- MySQL / MariaDB / PostgreSQL

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

# Konfigurasikan koneksi basis data (DB_DATABASE, DB_USERNAME, DB_PASSWORD) pada file .env

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
