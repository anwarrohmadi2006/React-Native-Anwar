# Praktikum 1: Pengenalan React Native

Ini adalah proyek untuk pertemuan pertama mata kuliah Pemrograman Mobile menggunakan React Native dan Expo.

## Detail Praktikum

Praktikum ini dibagi menjadi 3 bagian utama:

### Praktikum A: Pembuatan Proyek Baru dan Komponen Dasar
- Membuat proyek React Native baru menggunakan Expo (`npx create-expo-app`).
- Memahami struktur dasar seperti `View`, `Text`, dan `StyleSheet`.
- Menjalankan proyek di emulator Android atau perangkat fisik.

### Praktikum B: Props dan Komponen Reusable
- Pembuatan folder `components/` untuk memisahkan logika UI.
- Membuat komponen `KartuProfil` yang dapat digunakan ulang (reusable).
- Mengirimkan data dinamis ke dalam komponen menggunakan **Props** (`nama`, `nim`, `prodi`, `angkatan`).
- Menerapkan `ScrollView` untuk menampilkan daftar kartu yang melebihi ukuran layar.
- Modifikasi styling menggunakan border, shadow (elevation), dan garis pemisah.

### Praktikum C: Aplikasi Counter Interaktif
- Pembuatan file `Counter.js` di dalam folder `components/`.
- Menerapkan Hook `useState` untuk mengelola state angka counter.
- Menambahkan fungsi standar dengan tombol (Tambah, Kurang, Reset).
- **Fitur Validasi Tambahan Mandiri:**
  - Mengelompokkan status nilai (*Rendah* `0-5`, *Sedang* `6-10`, *Tinggi* `>10`).
  - Warna font dinamis: Berubah menjadi merah saat jumlah di atas `10`.
  - Menggunakan dialog `Alert` Native sebagai peringatan batas bawah (tidak boleh negatif / $<0$).
  - Menggunakan dialog `Alert` peringatan jika nilai mencoba melewati batas akhir `20`.

## Cara Menjalankan

1. Buka folder ini di terminal.
2. Instal dependensi (jika belum):
   ```bash
   npm install
   ```
3. Jalankan server Metro Bundler Expo:
   ```bash
   npx expo start
   ```
4. Tekan `a` untuk membuka di Emulator Android, atau scan QR code menggunakan aplikasi Expo Go di HP Anda.
