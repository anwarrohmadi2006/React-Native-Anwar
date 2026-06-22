<div align="center">
  <img src="https://reactnative.dev/img/header_logo.svg" alt="React Native Logo" width="180"/>
  <h1>📱 React-Native-Anwar Workspace</h1>
  <p>
    <strong>🚀 Kumpulan Proyek, Praktikum, Eksperimen UI/UX, dan Integrasi Backend (React Native & Mobile App Development)</strong>
  </p>
  <p>
    <a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" /></a>
    <a href="https://expo.dev/"><img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS" /></a>
    <a href="https://www.rust-lang.org/"><img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white" alt="Rust" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
    <a href="https://github.com/anwarrohmadi2006/React-Native-Anwar/commits/main"><img src="https://img.shields.io/github/last-commit/anwarrohmadi2006/React-Native-Anwar?style=for-the-badge&color=blue" alt="Last Commit"></a>
  </p>
</div>

---

## 📑 Daftar Isi Interaktif
1. [🌟 Tentang Repositori Ini](#-tentang-repositori-ini)
2. [🏗️ Arsitektur & Teknologi](#️-arsitektur--teknologi)
3. [🗺️ Peta Pembelajaran (Roadmap Praktikum)](#-peta-pembelajaran-roadmap-praktikum)
4. [🚀 Daftar Aplikasi Mandiri (Mini Apps)](#-daftar-aplikasi-mandiri-mini-apps)
5. [🌳 Struktur Direktori (*Folder Tree*)](#-struktur-direktori-folder-tree)
6. [💻 Panduan Menjalankan Proyek](#-panduan-menjalankan-proyek)
7. [📸 Galeri & Cuplikan Layar (Screenshots)](#-galeri--cuplikan-layar-screenshots)
8. [🛠️ Pemecahan Masalah (*Troubleshooting*)](#️-pemecahan-masalah-troubleshooting)
9. [🤝 Berkontribusi (*Contributing*)](#-berkontribusi-contributing)
10. [👨‍💻 Profil Penulis & Kontak](#-profil-penulis--kontak)

---

## 🌟 Tentang Repositori Ini

Selamat datang di ruang kerja (*workspace*) utama **React Native** milik **Anwar Rohmadi**. 
Repositori ini bukan sekadar tempat penyimpanan kode, melainkan sebuah **Jurnal Pembelajaran dan Portofolio Hidup** yang berfungsi sebagai *monorepo* komprehensif. Mulai dari dasar-dasar komponen UI hingga aplikasi dengan integrasi *backend* yang kompleks, semuanya terdokumentasi dan diatur secara rapi di sini.

**Tujuan Repositori:**
- **Pusat Referensi:** Menyimpan *boilerplate* dan *code snippet* React Native yang telah teruji untuk digunakan ulang di masa depan.
- **Transparansi Belajar:** Menunjukkan progres kurva pembelajaran secara historis dari semester awal hingga mahir.
- **Eksplorasi Teknologi:** Menggabungkan teknologi mobile (React Native) dengan ekosistem lain seperti backend performa tinggi (Rust) dan platform modern (Supabase).

---

## 🏗️ Arsitektur & Teknologi

Pengembangan dalam repositori ini menitikberatkan pada alat dan teknologi berikut:

- **Frontend Mobile:** React Native (Framework utama lintas platform iOS & Android).
- **Environment & Build:** Expo CLI (Untuk *hot-reloading* instan, akses API native yang mudah, dan manajemen *build* OTA).
- **Navigasi:** React Navigation (Stack, Tab, & Drawer Navigation).
- **State Management:** React Hooks (useState, useEffect, useContext), AsyncStorage untuk persistensi lokal.
- **Backend & Database:** 
  - **Supabase** (PostgreSQL, Autentikasi OAuth Google, Realtime API).
  - **Rust** (Eksperimen backend microservice dengan arsitektur memori yang sangat efisien).
- **Tooling Tambahan:** ESLint, Prettier, Babel, Tailwind/Nativewind (untuk beberapa proyek eksperimen).

---

## 🗺️ Peta Pembelajaran (Roadmap Praktikum)

Setiap folder `praktikum-p{X}` mewakili tahapan logika kurikulum (*milestone*). Berikut adalah rinciannya:

| Modul | Folder Proyek | Pokok Bahasan & Capaian Pembelajaran | Tingkat Kesulitan |
| :---: | :--- | :--- | :---: |
| **P1** | `praktikum-rn-1` | **Fundamental Dasar:** Pengenalan struktur Expo, `View`, `Text`, `Image`, pengenalan `Props` dan `State`. *Output:* Counter App Dasar. | 🟢 Pemula |
| **P2** | `praktikum-p2` | **Layouting:** Penguasaan `Flexbox` (justifyContent, alignItems), Margin & Padding, serta *Event Handling* dasar pada komponen sentuh. | 🟢 Pemula |
| **P3** | `praktikum-p3` | **List & Scrolling:** Implementasi `ScrollView` dan `FlatList` untuk rendering data dalam jumlah besar secara efisien. | 🟢 Pemula |
| **P4** | `praktikum-p4` | **Navigasi Dasar:** Pengenalan `React Navigation`, transisi antar halaman (Stack Navigator), dan pengiriman parameter antar layar. | 🟡 Menengah |
| **P5** | `praktikum-p5` | **Navigasi Lanjutan:** Menggabungkan Stack Navigator dengan Tab Navigator, pembuatan antarmuka navigasi bawah (*Bottom Tabs*). | 🟡 Menengah |
| **P6** | `praktikum-p6` | **Global State & Lifecycle:** Pemahaman mendalam tentang *Component Lifecycle* dan pengelolaan state yang melintasi multi-komponen. | 🟡 Menengah |
| **P7** | `praktikum-p7` | **Integrasi API:** *Fetch Data*, *Asynchronous UI* (Loading & Error state), Polling data berkala, dan teknik optimasi pencarian (*Debouncing*). | 🟠 Mahir |
| **P8** | `praktikum-p8` | **Database Lokal:** Menyimpan preferensi pengguna dan cache aplikasi secara persisten menggunakan AsyncStorage / SQLite. | 🟠 Mahir |
| **P9** | `praktikum-p9` | **Autentikasi & BaaS:** Integrasi dengan Supabase, Google OAuth Login (*Single Sign-On*), dan pengelolaan sesi otentikasi aman. | 🔴 Sangat Mahir |

---

## 🚀 Daftar Aplikasi Mandiri (Mini Apps)

Berbagai proyek nyata yang mengekspansi materi praktikum dasar menjadi produk fungsional:

- 🛒 **`pos-kasir` & `Market mini`**  
  *Deskripsi:* Aplikasi *Point of Sale* dengan fitur perhitungan total harga, penambahan item keranjang otomatis, dan manajemen inventaris sederhana.
- 🏫 **`e-kampus-mini-app`**  
  *Deskripsi:* Purwarupa (*prototype*) Sistem Informasi Akademik yang menyajikan antarmuka jadwal kuliah, nilai mahasiswa, dan pengumuman kampus.
- 🧾 **`invoice scanner`**  
  *Deskripsi:* Konsep pemindai faktur menggunakan kamera ponsel yang dipadukan dengan teknik *Optical Character Recognition* (OCR).
- 📊 **`analisis data jasa`** & 🧬 **`nanotabpfn-plus`**  
  *Deskripsi:* Skrip dan modul eksperimen terkait pengolahan tabuler untuk *Machine Learning* dan analitik sains data.
- 🦀 **`rust-waweb`**  
  *Deskripsi:* *Backend service* yang ditulis menggunakan bahasa **Rust** untuk mendengarkan/merespon *webhook* dari antarmuka WhatsApp Web.

---

## 🌳 Struktur Direktori (*Folder Tree*)

Gambaran arsitektur level atas dari *workspace* ini:

```text
React-Native-Anwar/
├── 📁 Backup Data/                # File cadangan mentah dan dataset
├── 📁 Market mini/                # Proyek mini-app: Market
├── 📁 analisis data jasa/         # Repositori data analitik
├── 📁 e-kampus-mini-app/          # Proyek mini-app: Sistem Akademik
├── 📁 invoice scanner/            # Proyek mini-app: Pemindai Faktur
├── 📁 nanotabpfn-plus/            # Modul eksperimen Machine Learning
├── 📁 pos-kasir/                  # Proyek mini-app: Kasir
├── 📁 praktikum-rn-1/             # Modul Pertemuan 1
├── 📁 praktikum-p2/               # Modul Pertemuan 2
├── ... (praktikum berlanjut) ...
├── 📁 praktikum-p9/               # Modul Pertemuan 9
├── 📁 rust-waweb/                 # Backend Rust WhatsApp
├── 📄 .gitignore                  # Aturan pengecualian file sensitif
└── 📄 README.md                   # Dokumen komprehensif ini
```

---

## 💻 Panduan Menjalankan Proyek

Dikarenakan repositori ini dirancang sebagai **Monorepo**, setiap proyek berjalan secara terisolasi. 

**Persyaratan Sistem Awal:**
- Instal **Node.js** (v18.x LTS+)
- Instal **Expo CLI** secara global: `npm install -g expo-cli`
- Siapkan aplikasi **Expo Go** di HP Anda.

**Cara Memulai:**
1. **Clone Repositori:**
   ```bash
   git clone https://github.com/anwarrohmadi2006/React-Native-Anwar.git
   cd React-Native-Anwar
   ```
2. **Masuk ke Target Proyek (Misal: praktikum-p9):**
   ```bash
   cd praktikum-p9
   ```
3. **Konfigurasi Variabel Lingkungan (PENTING):**
   Jika proyek membutuhkan API (seperti Supabase/Google), salin file `.env.example` ke `.env` dan masukkan API Key Anda.
4. **Instalasi Paket Dependensi:**
   Wajib dilakukan untuk mengunduh ulang folder `node_modules`.
   ```bash
   npm install
   ```
5. **Jalankan Aplikasi:**
   ```bash
   npx expo start
   ```
6. **Testing:** Scan QR Code di terminal menggunakan Expo Go, atau tekan tombol `a` untuk membuka di Emulator Android.

---

## 📸 Galeri & Cuplikan Layar (Screenshots)

> 📌 *Sedang Dalam Pengerjaan:* Bagian ini akan segera diperbarui dengan cuplikan gambar (GIF/Screenshot) antarmuka dari aplikasi `e-kampus`, `pos-kasir`, dan hasil akhir dari setiap praktikum mingguan. 

---

## 🛠️ Pemecahan Masalah (*Troubleshooting*)

Kendala yang umum terjadi beserta solusinya:

| Gejala Error | Penyebab | Solusi Cepat |
| :--- | :--- | :--- |
| `ENOSPC: System limit for number of file watchers reached` | OS (biasanya Linux/WSL) kehabisan batas *file watcher*. | Jalankan: `echo fs.inotify.max_user_watches=524288 \| sudo tee -a /etc/sysctl.conf && sudo sysctl -p` |
| `Port 8081 already in use` | Ada Node.js/Metro Bundler lain yang nyangkut di latar belakang. | Tutup terminal sebelumnya atau paksa stop Node. Atau ubah port: `npx expo start --port 19000` |
| `Network response timed out` di Expo Go | HP dan Laptop tidak berada di jaringan WiFi/LAN yang sama, atau terhalang Firewall. | Pindah koneksi Expo ke mode **Tunnel**: Tekan tombol `shift + t` di terminal setelah Expo berjalan. |
| Layar Merah (*Red Screen of Death*) | Biasanya ada kesalahan di sintaks atau lupa `npm install`. | Baca pesan error di baris paling atas, perbaiki file yang ditunjuk, simpan (*save*), tekan `r` untuk *reload*. |

---

## 🤝 Berkontribusi (*Contributing*)

Meski ini adalah repositori pembelajaran pribadi, saran dan perbaikan selalu diterima!
1. Lakukan *Fork* pada repositori ini.
2. Buat *branch* fitur Anda (`git checkout -b fitur-keren-saya`).
3. Lakukan *Commit* perubahan Anda (`git commit -m 'Menambahkan fitur keren'`).
4. Lakukan *Push* ke *branch* tersebut (`git push origin fitur-keren-saya`).
5. Buka sebuah *Pull Request* baru.

---

## 👨‍💻 Profil Penulis & Kontak

**Anwar Rohmadi**  
Data Science Student | Frontend & Mobile App Enthusiast  

Terhubung bersama saya untuk kolaborasi atau diskusi seputar kode!
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anwarrohmadi2006)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:anwarrohmadi2006@gmail.com)

---
<div align="center">
  <i>"Menulis kode adalah cara kita berbicara dengan masa depan. Tetap konsisten!"</i><br>
  <b>Dikelola dengan ❤️ pada tahun 2026.</b>
</div>
