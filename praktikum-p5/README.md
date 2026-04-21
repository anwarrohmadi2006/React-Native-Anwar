# Praktikum P5 - Form & Validasi (React Native Expo)

Proyek ini adalah bagian dari mata kuliah Pemrograman Mobile Pertemuan 5 yang berfokus pada implementasi form, validasi input, keyboard handling, dan multi-step form menggunakan Expo SDK 54.

## Fitur Utama

### 1. Form Registrasi dengan Validasi (Praktikum A)
- **Controlled Components**: Semua field dikelola menggunakan satu objek state.
- **Validasi Real-time & onBlur**: Pesan error muncul saat input kehilangan fokus atau saat disubmit.
- **Keyboard Handling**: Menggunakan `KeyboardAvoidingView` dan fokus otomatis antar input menggunakan `useRef`.
- **Indikator Kekuatan Password**: Penilaian visual berdasarkan panjang, huruf kapital, angka, dan karakter spesial.

### 2. Form Login & Navigasi (Praktikum B)
- **Simulasi Login**: Menggunakan akun dummy dengan delay loading 1.5 detik.
- **Show/Hide Password**: Fitur toggle visibilitas password.
- **Navigation Routing**: Berpindah ke halaman utama menggunakan `navigation.replace` setelah login berhasil.

### 3. Form Multi-Step Wizard (Praktikum C)
- **Progress Bar**: Indikator langkah pendaftaran yang interaktif.
- **Validasi Per Langkah**: Mencegah pengguna lanjut ke tahap berikutnya jika data belum valid.
- **Halaman Ringkasan**: Langkah ke-4 menampilkan konfirmasi seluruh data sebelum submit final.

## Cara Menjalankan Proyek

1. **Pastikan Node.js dan Expo CLI terinstal.**
2. **Clone atau salin proyek ini.**
3. **Instal dependensi:**
   ```bash
   npm install
   ```
4. **Jalankan aplikasi:**
   ```bash
   npx expo start
   ```
5. **Scan QR Code menggunakan aplikasi Expo Go di Android/iOS.**

## Struktur Folder
- `screens/`: Berisi semua halaman (FormRegistrasi, FormLogin, FormWizard, Home).
- `navigation/`: Konfigurasi AppNavigator menggunakan Drawer dan Stack Navigator.
- `assets/`: File gambar dan ikon.

## Detail Implementasi
- **Expo SDK**: 54
- **React Navigation**: Drawer & Native Stack
- **Library Tambahan**: `react-native-gesture-handler`, `react-native-reanimated`.

---
**Dikerjakan oleh:** [Nama Anda]
**NIM:** [NIM Anda]
