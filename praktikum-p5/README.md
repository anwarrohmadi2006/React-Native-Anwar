# Praktikum P5: Form & Validasi (Expo SDK 55)

Proyek ini adalah implementasi lengkap dari **Modul Praktikum P5 — Form & Validasi** untuk mata kuliah Pemrograman Mobile. Aplikasi ini mencakup berbagai teknik pengelolaan form, validasi data, manajemen keyboard, dan persistensi data menggunakan React Native dan Expo.

## 🌟 Fitur Utama

### 👨‍💻 Praktikum Utama
*   **Praktikum A: Form Registrasi**: 
    *   Validasi `onBlur` untuk Nama, Email, Password, dan No HP.
    *   Manajemen focus menggunakan `useRef` (Keyboard Handling).
    *   **Password Strength Indicator** visual dengan feedback warna (Lemah - Sangat Kuat).
*   **Praktikum B: Form Login**:
    *   Simulasi login autentikasi dengan delay 1.5 detik.
    *   Fitur **Show/Hide Password**.
    *   Dummy accounts: `admin@test.com` & `user@test.com`.
*   **Praktikum C: Registrasi Berjenjang (Wizard)**:
    *   Alur form 4 langkah (Data Diri, Akun, Kontak, Ringkasan).
    *   Progress bar dinamis dan navigasi antar langkah bergaya Wizard.

### 🏆 Latihan Mandiri (Lengkap)
*   **Latihan 1: Data Diri Mahasiswa**: Form komprehensif (Nama, NIM, Prodi, Semester, dll) dengan fitur **Reset Form Confirmation**.
*   **Latihan 2: Aplikasi Survei Mobile**: Form 5 langkah interaktif dengan **Rating Bintang**.
*   **Latihan 3: Persistence (Bonus)**: Integrasi `@react-native-async-storage/async-storage` pada Aplikasi Survei untuk menyimpan data secara otomatis (Auto-save).

## 🛠️ Detail Teknis
*   **Framework**: Expo SDK 55 (Disesuaikan dengan runtime terbaru).
*   **Navigation**: Nested Navigation (Drawer Navigator + Native Stack).
*   **UI Components**: Custom reusable Input components dengan feedback error yang dinamis.
*   **Persistence**: AsyncStorage untuk manajemen data luring.

## 🚀 Cara Menjalankan

1.  **Clone repositori ini**:
    ```bash
    git clone https://github.com/anwarrohmadi2006/React-Native-Anwar.git
    cd React-Native-Anwar/praktikum-p5
    ```

2.  **Instal Dependensi**:
    ```bash
    npm install
    ```

3.  **Jalankan Aplikasi**:
    ```bash
    npx expo start --android --clear
    ```

4.  **Akses Fitur**: Gunakan menu **Drawer (Sidebar)** untuk berpindah antar praktikum dan latihan mandiri.

## 👤 Identitas Mahasiswa
*   **Nama**: Anwar Rohmadi
*   **Mata Kuliah**: Pemrograman Mobile
*   **Platform**: Android (SDK 55)

---
*Dibuat untuk memenuhi Tugas Praktikum P5 Pemrograman Mobile.*
