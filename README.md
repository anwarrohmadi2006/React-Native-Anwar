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
  </p>
</div>

---

## 📖 Tentang Repositori Ini

Selamat datang di ruang kerja (workspace) utama **React Native** milik Anwar Rohmadi. Repositori ini berfungsi sebagai monorepo (satu repositori untuk banyak proyek) yang menyimpan seluruh progres pembelajaran, tugas praktikum kampus, hingga aplikasi mini (mini-apps) mandiri yang dibangun selama masa studi.

Tujuan utama repositori ini adalah:
1. Mendokumentasikan perjalanan belajar dari komponen dasar hingga aplikasi kompleks.
2. Menjadi referensi kode (*code snippet*) yang bisa digunakan ulang untuk proyek masa depan.
3. Menyimpan *source code* secara aman dengan pengelolaan versi Git yang baik.

---

## 📂 Daftar Proyek & Struktur Direktori

Repositori ini terdiri dari puluhan sub-proyek independen. Berikut adalah pemetaannya:

### 🎓 1. Tugas Praktikum (Semester Berjalan)
Berisi *source code* dari setiap modul pertemuan mata kuliah pemrograman mobile:
- 📁 **`praktikum-rn-1`** — Pertemuan 1: Pengenalan React Native, Komponen Dasar (View, Text, Image), Props, dan State.
- 📁 **`praktikum-p2`** — Pertemuan 2: Layouting tingkat lanjut menggunakan Flexbox & Event Handling.
- 📁 **`praktikum-p3` s/d `praktikum-p9`** — Lanjutan materi mingguan mencakup Navigasi (React Navigation), Pengelolaan State Global, Pengambilan Data API (Fetch/Axios), Integrasi Database (Supabase/Firebase), Polling, Lifecycle, dan Debouncing.

### 🚀 2. Aplikasi Mandiri (Mini Apps & Proyek Spesifik)
Selain praktikum dasar, terdapat beberapa aplikasi berskala kecil hingga menengah yang mengimplementasikan studi kasus nyata:
- 🛒 **`Market mini`** & **`pos-kasir`** — Aplikasi sistem Point of Sale (Kasir) sederhana untuk toko/minimarket.
- 🏫 **`e-kampus-mini-app`** — Purwarupa (prototype) sistem informasi akademik kampus versi mobile.
- 🧾 **`invoice scanner`** — Aplikasi pemindai struk/faktur (mungkin memanfaatkan fitur kamera dan OCR).
- 📊 **`analisis data jasa`** — Proyek analisis data spesifik yang berhubungan dengan data jasa.
- 🦀 **`rust-waweb`** — Proyek eksperimental backend menggunakan bahasa pemrograman **Rust** yang terintegrasi dengan WhatsApp Web (WA Web).
- 🧬 **`nanotabpfn-plus`** — Eksperimen model komputasi/tabuler (berkaitan dengan studi sains data).

---

## ⚙️ Persyaratan Sistem (*Prerequisites*)

Untuk dapat menjalankan berbagai proyek di repositori ini, pastikan komputer Anda telah dilengkapi perangkat lunak berikut:

1. **[Node.js](https://nodejs.org/)** (Rekomendasi versi v18.x LTS ke atas)
2. **[Git](https://git-scm.com/)**
3. **[Expo CLI](https://docs.expo.dev/get-started/installation/)** (Jika ingin menjalankan lewat Expo Go)
4. **Android Studio** atau **Xcode** (Opsional, jika ingin menjalankan emulator bawaan alih-alih perangkat fisik)

---

## 💻 Cara Instalasi & Menjalankan Aplikasi

Karena ini adalah *monorepo*, Anda **TIDAK BISA** langsung menjalankan `npm install` di luar (root direktori). Anda harus masuk ke dalam folder spesifik terlebih dahulu.

**Langkah-langkah:**

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/anwarrohmadi2006/React-Native-Anwar.git
   cd React-Native-Anwar
   ```

2. **Masuk ke Direktori Proyek yang Diinginkan:**
   Pilih salah satu folder. Contoh, kita akan menjalankan Praktikum 9:
   ```bash
   cd praktikum-p9
   ```

3. **Install Dependensi:**
   Wajib dilakukan setiap pertama kali masuk ke folder baru (karena folder `node_modules` tidak ikut diunggah ke GitHub).
   ```bash
   npm install
   ```
   *Atau jika menggunakan yarn:* `yarn install`

4. **Mulai Server Pengembangan (Expo):**
   ```bash
   npx expo start
   ```

5. **Jalankan di Perangkat Anda:**
   - **📱 HP Asli:** Unduh aplikasi **Expo Go** di Android (Play Store) atau iOS (App Store), lalu pindai kode QR yang muncul di terminal Anda.
   - **💻 Emulator:** Tekan tombol `a` di terminal untuk membuka di Android Emulator, atau `i` untuk iOS Simulator.

---

## 🔐 Catatan Keamanan
Repositori ini mengabaikan file `.env` dan file kunci JSON OAuth (seperti kredensial Google Sign-In atau Supabase) melalui `.gitignore`. 
Jika Anda mengkloning proyek ini dan ingin menjalankannya, Anda harus membuat file `.env` Anda sendiri dan memasukkan kunci API (API Key) Anda sendiri.

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
