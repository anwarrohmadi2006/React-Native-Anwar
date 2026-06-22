<div align="center">
  <img src="https://reactnative.dev/img/header_logo.svg" alt="React Native Logo" width="150"/>
  <h1>📱 React-Native-Anwar Workspace</h1>
  <p>
    <strong>Kumpulan Proyek, Praktikum, dan Eksperimen React Native & Mobile App Development</strong>
  </p>
  <p>
    <a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" /></a>
    <a href="https://expo.dev/"><img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS" /></a>
    <a href="https://www.rust-lang.org/"><img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white" alt="Rust" /></a>
    <a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" /></a>
  </p>
</div>

---

## 📑 Daftar Isi
- [Tentang Repositori Ini](#-tentang-repositori-ini)
- [Peta Pembelajaran (Roadmap)](#-peta-pembelajaran-roadmap-praktikum)
- [Aplikasi Mandiri (Mini Apps)](#-aplikasi-mandiri-mini-apps)
- [Persyaratan Sistem](#-persyaratan-sistem-prerequisites)
- [Cara Instalasi & Menjalankan](#-cara-instalasi--menjalankan-aplikasi)
- [Troubleshooting (Masalah Umum)](#-troubleshooting-masalah-umum)
- [Penulis](#-penulis)

---

## 📖 Tentang Repositori Ini

Selamat datang di ruang kerja (*workspace*) utama **React Native** milik Anwar Rohmadi. Repositori ini berfungsi sebagai *monorepo* yang menyimpan seluruh progres pembelajaran, tugas praktikum pemrograman mobile, hingga aplikasi mini (*mini-apps*) mandiri yang dibangun selama masa studi sains data dan pengembangan perangkat lunak.

---

## 🗺️ Peta Pembelajaran (Roadmap Praktikum)

Bagian ini berisi *source code* dari setiap modul pertemuan mata kuliah pemrograman mobile, terstruktur dari dasar hingga mahir:

| Modul | Topik Utama | Keterangan |
| :---: | :--- | :--- |
| **P1** | `praktikum-rn-1` | Pengenalan React Native, Komponen Dasar (View, Text, Image), Props, dan State. Pembuatan Counter App. |
| **P2** | `praktikum-p2` | Layouting tingkat lanjut menggunakan **Flexbox** & Event Handling dasar. |
| **P3** | `praktikum-p3` | Desain antarmuka (UI) responsif dan penggunaan komponen list. |
| **P4** | `praktikum-p4` | Konsep Navigasi Dasar menggunakan *React Navigation*. |
| **P5** | `praktikum-p5` | Integrasi *Tab Navigation* dan pengiriman parameter antar layar. |
| **P6** | `praktikum-p6` | Pengelolaan Global State dan *Lifecycle Methods*. |
| **P7** | `praktikum-p7` | Integrasi API: Fetch Data, Asynchronous UI, Polling, dan Debouncing. |
| **P8** | `praktikum-p8` | Implementasi Database Lokal & Persistensi Data (AsyncStorage / SQLite). |
| **P9** | `praktikum-p9` | Autentikasi OAuth & Integrasi *Backend as a Service* (**Supabase** / Firebase). |

---

## 🚀 Aplikasi Mandiri (Mini Apps)

Selain praktikum dasar, repositori ini memuat aplikasi berskala menengah yang mengimplementasikan studi kasus nyata:

- 🛒 **`Market mini`** & **`pos-kasir`** — Aplikasi *Point of Sale* (Kasir) sederhana untuk toko/minimarket dengan kalkulasi keranjang otomatis.
- 🏫 **`e-kampus-mini-app`** — Purwarupa sistem informasi akademik kampus versi mobile (UI/UX fokus pada akses informasi mahasiswa).
- 🧾 **`invoice scanner`** — Aplikasi pemindai faktur terintegrasi dengan pengolahan gambar / OCR dasar.
- 📊 **`analisis data jasa`** — Repositori skrip untuk analisis data spesifik yang berhubungan dengan data jasa & sains data.
- 🦀 **`rust-waweb`** — Proyek *backend* performa tinggi menggunakan **Rust** yang dirancang berintegrasi dengan WhatsApp Web (WA Web).
- 🧬 **`nanotabpfn-plus`** — Eksperimen model komputasi pembelajaran mesin (Machine Learning) tabuler untuk sains data.

---

## ⚙️ Persyaratan Sistem (*Prerequisites*)

Pastikan komputer Anda telah dilengkapi perangkat lunak berikut sebelum melakukan *clone*:

1. **[Node.js](https://nodejs.org/)** (Rekomendasi versi v18.x LTS ke atas)
2. **[Git](https://git-scm.com/)**
3. **[Expo CLI](https://docs.expo.dev/get-started/installation/)** (Instal global: `npm install -g expo-cli`)
4. **Perangkat Uji:** Aplikasi **Expo Go** (untuk HP fisik) ATAU **Android Studio / Xcode** (untuk emulator).

---

## 💻 Cara Instalasi & Menjalankan Aplikasi

Repositori ini adalah sebuah **Monorepo**. Artinya, Anda **TIDAK BISA** langsung menjalankan perintah `npm install` di luar (root direktori). Anda harus masuk ke dalam sub-folder aplikasi yang diinginkan terlebih dahulu.

**Langkah-langkah:**

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/anwarrohmadi2006/React-Native-Anwar.git
   cd React-Native-Anwar
   ```
2. **Masuk ke Direktori Proyek Spesifik:**
   Pilih salah satu folder proyek (misalnya `e-kampus-mini-app`):
   ```bash
   cd e-kampus-mini-app
   ```
3. **Install Dependensi:**
   ```bash
   npm install
   ```
4. **Jalankan Development Server:**
   ```bash
   npx expo start
   ```
5. **Testing di Perangkat:**
   - Tekan `a` untuk membuka di Emulator Android.
   - Atau pindai **QR Code** menggunakan **Expo Go** di smartphone Anda (pastikan PC dan HP terhubung ke WiFi yang sama).

---

## 🛠️ Troubleshooting (Masalah Umum)

Beberapa masalah umum yang sering terjadi saat menjalankan proyek React Native/Expo:

- ❌ **Error: ENOSPC / File Watcher Limit** (Linux/WSL)
  *Solusi:* Naikkan limit *file watcher* OS Anda: `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
- ❌ **Error: Port 8081 already in use**
  *Solusi:* Tutup terminal/Node yang sedang berjalan sebelumnya, atau jalankan expo di port lain: `npx expo start --port 19000`
- ❌ **Aplikasi Expo Go tidak bisa memuat *bundle***
  *Solusi:* Pastikan Firewall Windows tidak memblokir Node.js, dan gunakan opsi `Tunnel` (tekan `shift + t`) jika jaringan lokal tidak mendukung LAN/WiFi transfer.

---

## 🔐 Catatan Keamanan

Repositori ini secara sengaja mengabaikan file `.env` dan *service account/client secret* JSON (misalnya kredensial Google OAuth di `praktikum-p9`) melalui `.gitignore`. 
Jika Anda mengkloning proyek ini untuk pengujian, pastikan Anda membuat file `.env` dan proyek Supabase/Firebase milik Anda sendiri secara lokal.

---

## 👨‍💻 Penulis

Dikembangkan dan dikelola oleh:
**Anwar Rohmadi**  
Mahasiswa Sains Data / Pengembang Perangkat Lunak  
📍 [Kunjungi Profil GitHub](https://github.com/anwarrohmadi2006)

---
<div align="center">
  <i>"Consistency is the key to mastering code."</i>
</div>
