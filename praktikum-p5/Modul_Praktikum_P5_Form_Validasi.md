**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

| MODUL PRAKTIKUM  PEMROGRAMAN MOBILE  Pertemuan 5  Form & Validasi Input  Controlled form, validasi, keyboard handling & multi-step form |
| :---: |

| Mata Kuliah  Pemrograman Mobile | Pertemuan / Topik  5 — Form & Validasi Input |
| :---- | :---- |
| Prasyarat  **Pertemuan 1–4 — Komponen, Layout,  Navigasi, FlatList** | Estimasi Waktu |

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5  
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

**Identitas Mahasiswa** 

| Nama Lengkap  | : |  |
| ----- | :---: | :---- |
| **NIM**  | : |  |
| **Kelas / Kelompok**  | : |  |
| **Tanggal Praktikum**  | : |  |
| **Nama Asisten / Dosen**  | : |  |
| **Nilai**  | : |  |

**Tujuan Praktikum** 

Setelah menyelesaikan praktikum ini, mahasiswa diharapkan mampu: 1\. Membangun form berbasis controlled component menggunakan useState 2\. Mengimplementasikan validasi input secara real-time dan saat submit 3\. Menangani berbagai tipe input: teks, email, password, angka, multi-line 4\. Menggunakan KeyboardAvoidingView agar form tidak tertutup keyboard 5\. Mengelola fokus antar input menggunakan useRef 

6\. Membangun form multi-step (wizard) dengan state management 

7\. Menampilkan pesan error yang informatif dan ramah pengguna 

8\. Menghubungkan form dengan navigasi untuk alur registrasi/login yang lengkap 

**Alat dan Bahan** 

• Project Expo aktif dengan navigasi dari pertemuan sebelumnya 

• Emulator Android Studio AVD sudah menyala 

• VS Code dengan project terbuka 

• Tidak ada library tambahan yang perlu diinstal untuk materi inti 

• Opsional: npm install @react-native-picker/picker (untuk komponen Picker/dropdown)

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

**Materi Praktikum** 

| BAGIAN 01  Controlled Form & TextInput Lanjutan  Mengelola state form dan berbagai jenis input |
| :---: |

**Bagian 1: Controlled Form & TextInput** 

**1.1 Konsep Controlled Component** 

Controlled component adalah pola di mana nilai input selalu dikontrol oleh state React. Setiap  perubahan input memperbarui state, dan state menentukan apa yang ditampilkan di input. Ini  adalah pola standar untuk form di React Native. 

| Aspek  | Uncontrolled (Tidak   Disarankan) | Controlled (Disarankan) |
| ----- | ----- | ----- |
| **Nilai input**  | Dikelola DOM/native secara  mandiri | Selalu dari state React |
| **Akses nilai**  | Menggunakan ref.current.value  | Langsung dari variabel state |
| **Validasi real-time**  | Sulit diimplementasikan  | Mudah — cek state kapanpun |
| **Reset form**  | Perlu ref per input  | Cukup reset state ke nilai awal |
| **Sinkronisasi antar  input** | Rumit  | Mudah — semua dari satu objek  state |
| **Cocok untuk**  | Form statis sederhana  | Semua form dengan validasi |

**1.2 Form Dasar dengan Berbagai Tipe Input** 

import { useState } from 'react';   
import {   
 View, Text, TextInput, TouchableOpacity,   
 ScrollView, StyleSheet, Switch   
} from 'react-native'; 

export default function FormProfil() {   
 // Satu objek state untuk semua field   
 const \[form, setForm\] \= useState({   
 nama: '',   
 email: '',   
 password: '',   
 noHp: '',   
 alamat: '',   
 aktif: false,   
 }); 

 // Helper: update satu field tanpa mengubah yang lain   
 const updateForm \= (field, value) \=\> {   
 setForm(prev \=\> ({ ...prev, \[field\]: value }));   
 }; 

 return (   
 \<ScrollView style={styles.container}\> 

 {/\* Input Teks Biasa \*/}

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

 \<Text style={styles.label}\>Nama Lengkap\</Text\>  \<TextInput 

 style={styles.input}   
 value={form.nama}   
 onChangeText={(val) \=\> updateForm('nama', val)}  placeholder='Masukkan nama lengkap' 

 autoCapitalize='words'   
 /\> 

 {/\* Input Email \*/}   
 \<Text style={styles.label}\>Email\</Text\>  \<TextInput 

 style={styles.input}   
 value={form.email}   
 onChangeText={(val) \=\> updateForm('email', val)}  placeholder='nama@email.com' 

 keyboardType='email-address'   
 autoCapitalize='none'   
 autoCorrect={false}   
 /\> 

 {/\* Input Password \*/}   
 \<Text style={styles.label}\>Password\</Text\>  \<TextInput 

 style={styles.input}   
 value={form.password}   
 onChangeText={(val) \=\> updateForm('password', val)}  placeholder='Minimal 8 karakter' 

 secureTextEntry={true}   
 /\> 

 {/\* Input Nomor HP \*/}   
 \<Text style={styles.label}\>Nomor HP\</Text\>  \<TextInput 

 style={styles.input}   
 value={form.noHp}   
 onChangeText={(val) \=\> updateForm('noHp', val)}  placeholder='08xx-xxxx-xxxx' 

 keyboardType='phone-pad'   
 /\> 

 {/\* Input Multi-line \*/}   
 \<Text style={styles.label}\>Alamat\</Text\>  \<TextInput 

 style={\[styles.input, styles.inputMultiline\]}  value={form.alamat} 

 onChangeText={(val) \=\> updateForm('alamat', val)}  placeholder='Masukkan alamat lengkap'  multiline={true} 

 numberOfLines={4}   
 textAlignVertical='top'   
 /\> 

 {/\* Toggle Switch \*/}   
 \<View style={styles.barisSwich}\>   
 \<Text style={styles.label}\>Status Aktif\</Text\>  \<Switch 

 value={form.aktif}   
 onValueChange={(val) \=\> updateForm('aktif', val)}  trackColor={{ false: '\#CCC', true: '\#2E75B6' }}  thumbColor={form.aktif ? '\#1F4E79' : '\#FFF'}  /\> 

 \</View\> 

 \</ScrollView\>   
 );   
}

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

const styles \= StyleSheet.create({   
 container: { flex: 1, padding: 20, backgroundColor: '\#F5F5F5' },  label: { fontSize: 14, fontWeight: '600', color: '\#333',  marginBottom: 6, marginTop: 12 }, 

 input: { backgroundColor: '\#FFF', borderWidth: 1, borderColor:  '\#DDD', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11, fontSize:  15 }, 

 inputMultiline: { height: 100, paddingTop: 11 },   
 barisSwich: { flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', marginTop: 12 }, 

});

| Pattern updateForm dengan Spread Operator  Menggunakan satu objek state untuk semua field jauh lebih bersih dari  membuat useState terpisah per field:  // Kurang baik — terlalu banyak useState:  const \[nama, setNama\] \= useState('');  const \[email, setEmail\] \= useState('');  const \[password, setPassword\] \= useState('');  // Lebih baik — satu state objek:  const \[form, setForm\] \= useState({ nama: '', email: '', password: '' });  const updateForm \= (field, value) \=\> setForm(prev \=\> ({ ...prev, \[field\]: value })); |
| :---- |

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

| BAGIAN 02  Validasi Form  Teknik validasi input sebelum data dikirim |
| :---: |

**Bagian 2: Validasi Form** 

**2.1 Strategi Validasi** 

Ada dua pendekatan validasi yang umum digunakan: validasi saat submit (lebih sederhana) dan  validasi real-time saat user mengetik (lebih responsif). Keduanya sering dikombinasikan. 

| Strategi  | Kapan Dijalankan  | Kelebihan  | Kekurangan |
| ----- | ----- | ----- | ----- |
| **Saat Submit**  | Tombol submit   ditekan | Sederhana, tidak   mengganggu | Feedback terlambat |
| **Real-time   (onChange)** | Setiap karakter   berubah | Feedback instan  | Bisa mengganggu saat  baru mulai mengetik |
| **Saat Blur   (onBlur)** | Saat input kehilangan  fokus | Keseimbangan terbaik  | Perlu handle state   touched per field |
| **Kombinasi**  | onBlur \+ submit  | UX terbaik  | Kode lebih kompleks |

**2.2 Validasi Lengkap dengan Error Messages** 

import { useState } from 'react';   
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert  } from 'react-native'; 

export default function FormRegistrasi() {   
 const \[form, setForm\] \= useState({ nama: '', email: '', password: '',  konfirmasi: '', noHp: '' }); 

 const \[errors, setErrors\] \= useState({});   
 const \[touched, setTouched\] \= useState({}); 

 const updateForm \= (field, value) \=\> {   
 setForm(prev \=\> ({ ...prev, \[field\]: value }));   
 // Hapus error saat user mulai mengetik ulang   
 if (errors\[field\]) setErrors(prev \=\> ({ ...prev, \[field\]: '' }));  }; 

 // Tandai field sudah disentuh saat onBlur   
 const handleBlur \= (field) \=\> {   
 setTouched(prev \=\> ({ ...prev, \[field\]: true }));   
 validateField(field, form\[field\]);   
 }; 

 // Validasi satu field   
 const validateField \= (field, value) \=\> {   
 let pesan \= '';   
 switch (field) {   
 case 'nama':   
 if (\!value.trim()) pesan \= 'Nama tidak boleh kosong';   
 else if (value.trim().length \< 3\) pesan \= 'Nama minimal 3 karakter';  break; 

 case 'email':   
 if (\!value) pesan \= 'Email tidak boleh kosong';   
 else if (\!/^\[^\\s@\]+@\[^\\s@\]+\\.\[^\\s@\]+$/.test(value)) pesan \= 'Format  email tidak valid';

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

 break;   
 case 'password':   
 if (\!value) pesan \= 'Password tidak boleh kosong';   
 else if (value.length \< 8\) pesan \= 'Password minimal 8 karakter';  else if (\!/\[A-Z\]/.test(value)) pesan \= 'Password harus mengandung huruf  kapital'; 

 else if (\!/\[0-9\]/.test(value)) pesan \= 'Password harus mengandung  angka'; 

 break;   
 case 'konfirmasi':   
 if (\!value) pesan \= 'Konfirmasi password tidak boleh kosong';  else if (value \!== form.password) pesan \= 'Password tidak cocok';  break; 

 case 'noHp':   
 if (\!value) pesan \= 'Nomor HP tidak boleh kosong';   
 else if (\!/^08\[0-9\]{8,11}$/.test(value)) pesan \= 'Format: 08xxxxxxxxxx  (10-13 digit)'; 

 break;   
 }   
 setErrors(prev \=\> ({ ...prev, \[field\]: pesan }));   
 return pesan \=== '';   
 }; 

 // Validasi semua field saat submit   
 const validateAll \= () \=\> {   
 const fields \= \['nama', 'email', 'password', 'konfirmasi', 'noHp'\];  let valid \= true; 

 fields.forEach(field \=\> {   
 if (\!validateField(field, form\[field\])) valid \= false;   
 });   
 return valid;   
 }; 

 const handleSubmit \= () \=\> {   
 if (\!validateAll()) return;   
 Alert.alert('Berhasil', \`Registrasi berhasil\!\\nSelamat datang,  ${form.nama}\!\`); 

 }; 

 // Komponen input dengan error display   
 const InputField \= ({ label, field, ...props }) \=\> (   
 \<View style={styles.fieldWrapper}\>   
 \<Text style={styles.label}\>{label}\</Text\>   
 \<TextInput   
 style={\[styles.input, errors\[field\] && touched\[field\] &&  styles.inputError\]} 

 value={form\[field\]}   
 onChangeText={(val) \=\> updateForm(field, val)}   
 onBlur={() \=\> handleBlur(field)}   
 {...props}   
 /\>   
 {errors\[field\] && touched\[field\] && (   
 \<Text style={styles.errorTeks}\>{errors\[field\]}\</Text\>  )} 

 \</View\>   
 ); 

 return (   
 \<ScrollView style={styles.container}\>   
 \<Text style={styles.judul}\>Buat Akun Baru\</Text\>   
 \<InputField label='Nama Lengkap' field='nama' placeholder='Nama lengkap  Anda' autoCapitalize='words' /\> 

 \<InputField label='Email' field='email' placeholder='nama@email.com'  keyboardType='email-address' autoCapitalize='none' /\> 

 \<InputField label='Password' field='password' placeholder='Min. 8  karakter, ada kapital & angka' secureTextEntry /\>

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

 \<InputField label='Konfirmasi Password' field='konfirmasi'  placeholder='Ulangi password' secureTextEntry /\> 

 \<InputField label='Nomor HP' field='noHp' placeholder='08xxxxxxxxxx'  keyboardType='phone-pad' /\> 

 \<TouchableOpacity style={styles.tombol} onPress={handleSubmit}\>  \<Text style={styles.tombolTeks}\>Daftar Sekarang\</Text\>  \</TouchableOpacity\> 

 \</ScrollView\>   
 );   
} 

const styles \= StyleSheet.create({   
 container: { flex: 1, padding: 20, backgroundColor: '\#F5F5F5' },  judul: { fontSize: 24, fontWeight: 'bold', color: '\#1F4E79',  marginBottom: 24 }, 

 fieldWrapper:{ marginBottom: 4 },   
 label: { fontSize: 14, fontWeight: '600', color: '\#333', marginBottom:  6 }, 

 input: { backgroundColor: '\#FFF', borderWidth: 1, borderColor: '\#DDD',  borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11, fontSize: 15 },  inputError: { borderColor: '\#D32F2F', borderWidth: 2 }, 

 errorTeks: { color: '\#D32F2F', fontSize: 12, marginTop: 4 },  tombol: { backgroundColor: '\#1F4E79', borderRadius: 10, padding: 16,  alignItems: 'center', marginTop: 24, marginBottom: 40 }, 

 tombolTeks: { color: '\#FFF', fontSize: 16, fontWeight: 'bold' }, });

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

| BAGIAN 03  Keyboard Handling & useRef  Mengelola keyboard dan fokus antar input |
| :---: |

**Bagian 3: Keyboard Handling & useRef** 

**3.1 KeyboardAvoidingView** 

Masalah umum di form mobile: keyboard yang muncul menutupi input yang sedang aktif.  KeyboardAvoidingView secara otomatis menggeser konten ke atas saat keyboard muncul. 

import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'; 

export default function FormDenganKeyboard() {   
 return (   
 // behavior berbeda per platform   
 \<KeyboardAvoidingView   
 style={{ flex: 1 }}   
 behavior={Platform.OS \=== 'ios' ? 'padding' : 'height'}   
 \>   
 {/\* ScrollView di dalam agar konten bisa di-scroll \*/}   
 \<ScrollView   
 keyboardShouldPersistTaps='handled'   
 contentContainerStyle={{ padding: 20 }}   
 \>   
 {/\* Semua field form di sini \*/}   
 \</ScrollView\>   
 \</KeyboardAvoidingView\>   
 );   
} 

| keyboardShouldPersistTaps='handled'  Prop ini penting pada ScrollView yang berisi form. Tanpa ini, menekan tombol Submit pertama kali hanya menutup keyboard tanpa menjalankan onPress.  Nilai 'handled' memastikan tap pada elemen interaktif tetap diproses  meski keyboard sedang terbuka. |
| :---- |

**3.2 Fokus Antar Input dengan useRef** 

Pada form dengan banyak input, pengguna biasanya ingin menekan 'Next' di keyboard untuk  berpindah ke input berikutnya tanpa harus tap manual. useRef digunakan untuk mengontrol fokus  input secara programatik. 

import { useRef } from 'react';   
import { View, TextInput, StyleSheet } from 'react-native'; 

export default function FormFokus() {   
 // Buat ref untuk setiap input   
 const refEmail \= useRef(null);   
 const refPassword \= useRef(null);   
 const refNoHp \= useRef(null); 

 return (   
 \<View style={styles.container}\>

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

 {/\* Input 1: Nama — saat tekan Next, fokus ke Email \*/}   
 \<TextInput   
 style={styles.input}   
 placeholder='Nama Lengkap'   
 returnKeyType='next'   
 onSubmitEditing={() \=\> refEmail.current.focus()}   
 blurOnSubmit={false}   
 /\> 

 {/\* Input 2: Email — saat tekan Next, fokus ke Password \*/}  \<TextInput 

 ref={refEmail}   
 style={styles.input}   
 placeholder='Email'   
 keyboardType='email-address'   
 autoCapitalize='none'   
 returnKeyType='next'   
 onSubmitEditing={() \=\> refPassword.current.focus()}   
 blurOnSubmit={false}   
 /\> 

 {/\* Input 3: Password — saat tekan Next, fokus ke NoHp \*/}  \<TextInput 

 ref={refPassword}   
 style={styles.input}   
 placeholder='Password'   
 secureTextEntry   
 returnKeyType='next'   
 onSubmitEditing={() \=\> refNoHp.current.focus()}   
 blurOnSubmit={false}   
 /\> 

 {/\* Input terakhir: returnKeyType='done' — tutup keyboard \*/}  \<TextInput 

 ref={refNoHp}   
 style={styles.input}   
 placeholder='Nomor HP'   
 keyboardType='phone-pad'   
 returnKeyType='done'   
 /\> 

 \</View\>   
 );   
} 

const styles \= StyleSheet.create({   
 container: { flex: 1, padding: 20 },   
 input: { borderWidth: 1, borderColor: '\#DDD', borderRadius: 8, padding:  12, marginBottom: 12, fontSize: 15 }, 

});

| returnKeyType  | Tampilan Tombol  | Kapan Digunakan |
| ----- | ----- | ----- |
| **'next'**  | Next / Lanjut  | Ada input berikutnya yang harus diisi |
| **'done'**  | Done / Selesai  | Input terakhir, menutup keyboard |
| **'search'**  | Search / Cari  | Input pencarian |
| **'go'**  | Go / Pergi  | Input URL atau aksi langsung |
| **'send'**  | Send / Kirim  | Input pesan/chat |

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

| BAGIAN 04  Form Multi-Step (Wizard)  Memecah form panjang menjadi beberapa langkah |
| :---: |

**Bagian 4: Form Multi-Step** 

**4.1 Konsep Form Multi-Step** 

Form multi-step (wizard) memecah form panjang menjadi beberapa langkah yang lebih mudah  dicerna. Setiap langkah divalidasi sebelum melanjutkan ke langkah berikutnya. 

| Kapan Menggunakan Form Multi-Step?  Form registrasi akun dengan banyak field (\> 6 field)  Proses checkout belanja online (alamat, pembayaran, konfirmasi)  Pengisian profil yang bertahap (data diri, pendidikan, pengalaman)  Survei atau kuesioner panjang  Onboarding pengguna baru |
| :---- |

**4.2 Implementasi Form Multi-Step** 

import { useState } from 'react';   
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from  'react-native'; 

const TOTAL\_LANGKAH \= 3; 

export default function FormRegistrasiWizard() {   
 const \[langkah, setLangkah\] \= useState(1);   
 const \[form, setForm\] \= useState({   
 // Langkah 1: Data Diri   
 nama: '', tglLahir: '', jenisKelamin: '',   
 // Langkah 2: Akun   
 email: '', password: '', konfirmasi: '',   
 // Langkah 3: Kontak   
 noHp: '', alamat: '', kota: '',   
 });   
 const \[errors, setErrors\] \= useState({}); 

 const updateForm \= (field, value) \=\> {   
 setForm(prev \=\> ({ ...prev, \[field\]: value }));   
 if (errors\[field\]) setErrors(prev \=\> ({ ...prev, \[field\]: '' }));  }; 

 // Validasi per langkah   
 const validasiLangkah \= (step) \=\> {   
 const err \= {};   
 if (step \=== 1\) {   
 if (\!form.nama.trim()) err.nama \= 'Nama tidak boleh kosong';  if (\!form.tglLahir) err.tglLahir \= 'Tanggal lahir wajib diisi';  } 

 if (step \=== 2\) {   
 if (\!form.email) err.email \= 'Email tidak boleh kosong';  else if (\!/^\[^\\s@\]+@\[^\\s@\]+\\.\[^\\s@\]+$/.test(form.email)) err.email \=  'Format email tidak valid'; 

 if (form.password.length \< 8\) err.password \= 'Password minimal 8  karakter';

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

 if (form.password \!== form.konfirmasi) err.konfirmasi \= 'Password tidak  cocok'; 

 }   
 if (step \=== 3\) {   
 if (\!form.noHp) err.noHp \= 'Nomor HP tidak boleh kosong';  if (\!form.alamat) err.alamat \= 'Alamat tidak boleh kosong';  } 

 setErrors(err);   
 return Object.keys(err).length \=== 0;   
 }; 

 const handleLanjut \= () \=\> {   
 if (validasiLangkah(langkah)) setLangkah(prev \=\> prev \+ 1);  }; 

 const handleKembali \= () \=\> setLangkah(prev \=\> prev \- 1); 

 const handleSubmit \= () \=\> {   
 if (validasiLangkah(3)) {   
 console.log('Data form:', form);   
 // Kirim ke API di pertemuan berikutnya   
 }   
 }; 

 // Komponen progress bar   
 const ProgressBar \= () \=\> (   
 \<View style={styles.progressContainer}\>   
 {Array.from({ length: TOTAL\_LANGKAH }, (\_, i) \=\> i \+ 1).map(i \=\> (  \<View key={i} style={styles.progressWrapper}\> 

 \<View style={\[styles.progressLingkaran, i \<= langkah &&  styles.progressAktif\]}\> 

 \<Text style={\[styles.progressAngka, i \<= langkah &&  styles.progressAngkaAktif\]}\> 

 {i}   
 \</Text\>   
 \</View\>   
 {i \< TOTAL\_LANGKAH && (   
 \<View style={\[styles.progressGaris, i \< langkah &&  styles.progressGarisAktif\]} /\> 

 )}   
 \</View\>   
 ))}   
 \</View\>   
 ); 

 // Komponen input helper   
 const Input \= ({ label, field, ...props }) \=\> (   
 \<View style={{ marginBottom: 4 }}\>   
 \<Text style={styles.label}\>{label}\</Text\>   
 \<TextInput   
 style={\[styles.input, errors\[field\] && styles.inputError\]}  value={form\[field\]} 

 onChangeText={val \=\> updateForm(field, val)}   
 {...props}   
 /\>   
 {errors\[field\] && \<Text style={styles.errorTeks}\>{errors\[field\]}\</Text\>}  \</View\> 

 ); 

 return (   
 \<ScrollView style={styles.container} keyboardShouldPersistTaps='handled'\>  \<Text style={styles.judul}\>Registrasi Akun\</Text\> 

 \<ProgressBar /\>   
 \<Text style={styles.subjudul}\>   
 Langkah {langkah} dari {TOTAL\_LANGKAH}:   
 {langkah \=== 1 ? ' Data Diri' : langkah \=== 2 ? ' Akun' : ' Kontak'}  \</Text\>

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

 {/\* Langkah 1 \*/}   
 {langkah \=== 1 && (   
 \<View\>   
 \<Input label='Nama Lengkap' field='nama' placeholder='Nama sesuai  KTP' autoCapitalize='words' /\> 

 \<Input label='Tanggal Lahir' field='tglLahir'    
placeholder='DD/MM/YYYY' keyboardType='numeric' /\>   
 \<Input label='Jenis Kelamin' field='jenisKelamin' placeholder='Laki laki / Perempuan' /\> 

 \</View\>   
 )} 

 {/\* Langkah 2 \*/}   
 {langkah \=== 2 && (   
 \<View\>   
 \<Input label='Email' field='email' placeholder='nama@email.com'  keyboardType='email-address' autoCapitalize='none' /\> 

 \<Input label='Password' field='password' placeholder='Min. 8  karakter' secureTextEntry /\> 

 \<Input label='Konfirmasi Password' field='konfirmasi'  placeholder='Ulangi password' secureTextEntry /\> 

 \</View\>   
 )} 

 {/\* Langkah 3 \*/}   
 {langkah \=== 3 && (   
 \<View\>   
 \<Input label='Nomor HP' field='noHp' placeholder='08xxxxxxxxxx'  keyboardType='phone-pad' /\> 

 \<Input label='Alamat' field='alamat' placeholder='Jalan, nomor,  RT/RW' /\> 

 \<Input label='Kota' field='kota' placeholder='Nama kota' /\>  \</View\> 

 )} 

 {/\* Tombol Navigasi Antar Langkah \*/}   
 \<View style={styles.tombolWrapper}\>   
 {langkah \> 1 && (   
 \<TouchableOpacity style={styles.tombolKembali}    
onPress={handleKembali}\>   
 \<Text style={styles.tombolKembaliTeks}\>Kembali\</Text\>  \</TouchableOpacity\> 

 )}   
 {langkah \< TOTAL\_LANGKAH ? (   
 \<TouchableOpacity style={styles.tombolLanjut} onPress={handleLanjut}\>  \<Text style={styles.tombolLanjutTeks}\>Lanjut\</Text\>  \</TouchableOpacity\> 

 ) : (   
 \<TouchableOpacity style={styles.tombolSubmit} onPress={handleSubmit}\>  \<Text style={styles.tombolSubmitTeks}\>Daftar Sekarang\</Text\>  \</TouchableOpacity\> 

 )}   
 \</View\>   
 \</ScrollView\>   
 );   
} 

const styles \= StyleSheet.create({   
 container: { flex: 1, padding: 20, backgroundColor: '\#F5F5F5' },  judul: { fontSize: 24, fontWeight: 'bold', color: '\#1F4E79',  marginBottom: 16 }, 

 subjudul: { fontSize: 15, color: '\#666', marginBottom: 20 },  progressContainer: { flexDirection: 'row', alignItems: 'center',  marginBottom: 20 }, 

 progressWrapper: { flexDirection: 'row', alignItems: 'center', flex: 1 },

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

 progressLingkaran: { width: 32, height: 32, borderRadius: 16, borderWidth: 2,  borderColor: '\#CCC', justifyContent: 'center', alignItems: 'center',  backgroundColor: '\#FFF' }, 

 progressAktif: { borderColor: '\#1F4E79', backgroundColor: '\#1F4E79' },  progressAngka: { fontWeight: 'bold', color: '\#CCC' }, 

 progressAngkaAktif:{ color: '\#FFF' },   
 progressGaris: { flex: 1, height: 2, backgroundColor: '\#CCC' },  progressGarisAktif:{ backgroundColor: '\#1F4E79' }, 

 label: { fontSize: 14, fontWeight: '600', color: '\#333',  marginBottom: 6, marginTop: 12 }, 

 input: { backgroundColor: '\#FFF', borderWidth: 1, borderColor:  '\#DDD', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11, fontSize:  15 }, 

 inputError: { borderColor: '\#D32F2F', borderWidth: 2 },  errorTeks: { color: '\#D32F2F', fontSize: 12, marginTop: 4 },  tombolWrapper: { flexDirection: 'row', justifyContent: 'space-between',  marginTop: 32, marginBottom: 40, gap: 12 }, 

 tombolKembali: { flex: 1, borderWidth: 2, borderColor: '\#2E75B6',  borderRadius: 10, padding: 14, alignItems: 'center' }, 

 tombolKembaliTeks: { color: '\#2E75B6', fontWeight: 'bold', fontSize: 15 },  tombolLanjut: { flex: 1, backgroundColor: '\#2E75B6', borderRadius: 10,  padding: 14, alignItems: 'center' }, 

 tombolLanjutTeks: { color: '\#FFF', fontWeight: 'bold', fontSize: 15 },  tombolSubmit: { flex: 1, backgroundColor: '\#1F4E79', borderRadius: 10,  padding: 14, alignItems: 'center' }, 

 tombolSubmitTeks: { color: '\#FFF', fontWeight: 'bold', fontSize: 15 }, });

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

**Langkah-Langkah Praktikum** 

**Praktikum A — Form Registrasi dengan Validasi**

| Target & Waktu  Membuat form registrasi lengkap dengan validasi onBlur, pesan error per field, dan  keyboard handling yang baik.  Perkiraan waktu: 35 menit |
| :---- |

| 1  | Buat project atau siapkan screen baru  Gunakan project dari pertemuan sebelumnya. Buat file screens/FormRegistrasi.js dan  tambahkan ke navigasi.  Catatan  Letakkan screen ini sebagai item di Drawer Navigator atau sebagai screen terpisah di Stack  Navigator. |
| :---: | ----- |
| **2**  | **Implementasi form dengan validasi lengkap**  Salin kode FormRegistrasi dari materi 2.2. Pastikan semua 5 field berfungsi: nama, email,  password, konfirmasi password, dan nomor HP. |
| **3**  | **Tambahkan KeyboardAvoidingView**  Bungkus seluruh form dengan KeyboardAvoidingView agar input tidak tertutup keyboard: import { KeyboardAvoidingView, Platform } from 'react-native';  return (   \<KeyboardAvoidingView   style={{ flex: 1 }}   behavior={Platform.OS \=== 'ios' ? 'padding' : 'height'}   \>   \<ScrollView keyboardShouldPersistTaps='handled'\>   {/\* form di sini \*/}   \</ScrollView\>   \</KeyboardAvoidingView\>  ); |
| **4**  | **Implementasi navigasi fokus dengan useRef**  Tambahkan useRef pada setiap input dan hubungkan dengan returnKeyType='next' dan  onSubmitEditing agar pengguna bisa pindah input menggunakan tombol keyboard.  **Catatan**  Input terakhir (noHp) gunakan returnKeyType='done' agar keyboard menutup saat selesai. |
| **5**  | **Tambahkan indikator kekuatan password**  Di bawah input password, tambahkan indikator visual kekuatan password:  const hitungKekuatan \= (pass) \=\> {   let skor \= 0;   if (pass.length \>= 8\) skor++;   if (/\[A-Z\]/.test(pass)) skor++;   if (/\[0-9\]/.test(pass)) skor++;   if (/\[^A-Za-z0-9\]/.test(pass)) skor++;   return skor; // 0-4  }; |

| Catatan  Letakkan screen ini sebagai item di Drawer Navigator atau sebagai screen terpisah di Stack  Navigator. |  |
| :---- | :---- |

| Catatan  Input terakhir (noHp) gunakan returnKeyType='done' agar keyboard menutup saat selesai. |  |
| :---- | :---- |

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

|  | const kekuatan \= hitungKekuatan(form.password);  const labelKekuatan \= \['', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'\]\[kekuatan\]; const warnaKekuatan \= \['', '\#D32F2F', '\#F57C00', '\#388E3C',   '\#1B5E20'\]\[kekuatan\];  // Tampilkan di bawah input password:  {form.password.length \> 0 && (   \<View style={{ flexDirection: 'row', gap: 4, marginTop: 6 }}\>  {\[1,2,3,4\].map(i \=\> (   \<View key={i} style={{   flex: 1, height: 4, borderRadius: 2,   backgroundColor: i \<= kekuatan ? warnaKekuatan : '\#DDD'  }} /\>   ))}   \</View\>  )}  {form.password.length \> 0 && (   \<Text style={{ color: warnaKekuatan, fontSize: 12, marginTop: 4 }}\>  {labelKekuatan}   \</Text\>  )} |
| :---- | :---- |

**Praktikum B — Form Login Terintegrasi Navigasi**

| Target & Waktu  Membuat form login yang terintegrasi dengan navigasi — berhasil login akan navigasi ke  halaman utama, gagal menampilkan error.  Perkiraan waktu: 25 menit |
| :---- |

| 1  | Buat screens/FormLogin.js  Buat halaman login dengan dua input: email dan password, serta dua tombol: Login dan  Daftar (navigasi ke FormRegistrasi). |
| :---: | :---- |
| **2**  | **Implementasi logika login simulasi**  Buat fungsi handleLogin dengan akun dummy untuk simulasi sebelum integrasi API:  const AKUN\_DUMMY \= \[   { email: 'admin@test.com', password: 'Admin123' },   { email: 'user@test.com', password: 'User1234' },  \];  const handleLogin \= () \=\> {   if (\!validateAll()) return;   const akun \= AKUN\_DUMMY.find(   a \=\> a.email \=== form.email && a.password \=== form.password  );   if (akun) {   // Berhasil login — navigasi ke halaman utama   navigation.replace('MainApp', { email: form.email });   } else {   setErrors({ submit: 'Email atau password salah' });   }  }; |

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

|  | Catatan  navigation.replace() digunakan agar user tidak bisa kembali ke halaman login dengan  tombol back. |
| ----- | :---- |
| **3**  | **Tambahkan fitur show/hide password**  Tambahkan tombol ikon mata di sebelah kanan input password untuk toggle visibilitas: const \[showPassword, setShowPassword\] \= useState(false);  \<View style={styles.inputWrapper}\>   \<TextInput   style={styles.inputDalamWrapper}   value={form.password}   onChangeText={(val) \=\> updateForm('password', val)}   secureTextEntry={\!showPassword}   placeholder='Password'   /\>   \<TouchableOpacity   style={styles.ikonMata}   onPress={() \=\> setShowPassword(\!showPassword)}   \>   \<Text\>{showPassword ? 'HIDE' : 'SHOW'}\</Text\>   \</TouchableOpacity\>  \</View\> |
| **4**  | **Tambahkan loading state saat submit**  Simulasikan delay network dengan loading indicator:  const \[isLoading, setLoading\] \= useState(false);  const handleLogin \= async () \=\> {   if (\!validateAll()) return;   setLoading(true);   // Simulasi delay 1.5 detik   await new Promise(resolve \=\> setTimeout(resolve, 1500));   setLoading(false);   // ... cek akun dan navigasi  };  // Tombol dengan loading:  \<TouchableOpacity   style={\[styles.tombol, isLoading && styles.tombolDisabled\]}   onPress={handleLogin}   disabled={isLoading}  \>   {isLoading   ? \<ActivityIndicator color='\#FFF' /\>   : \<Text style={styles.tombolTeks}\>Masuk\</Text\>   }  \</TouchableOpacity\> |

| Catatan  navigation.replace() digunakan agar user tidak bisa kembali ke halaman login dengan  tombol back. |  |
| :---- | :---- |

**Praktikum C — Form Multi-Step**

| Target & Waktu  Mengimplementasikan form registrasi wizard 3 langkah dengan progress bar dan validasi  per langkah.  Perkiraan waktu: 30 menit |
| :---- |

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

| 1  | Buat screens/FormRegistrasiWizard.js  Salin kode FormRegistrasiWizard dari materi 4.2. Pastikan progress bar, navigasi antar  langkah, dan validasi per langkah berfungsi. |
| :---: | :---- |
| **2**  | **Tambahkan animasi transisi antar langkah**  Gunakan state opacity sederhana untuk efek fade saat ganti langkah:  // Simpan key untuk force re-render dengan fade effect  // Saat ganti langkah, tambahkan key={langkah} pada View konten: \<View key={langkah} style={{ opacity: 1 }}\>   {/\* konten langkah \*/}  \</View\>  **Catatan**  Untuk animasi yang lebih halus, gunakan Animated API di pertemuan mendatang. |
| **3**  | **Tambahkan halaman ringkasan sebelum submit**  Tambahkan langkah ke-4 (TOTAL\_LANGKAH \= 4\) yang menampilkan semua data yang  sudah diisi sebelum submit final:  {langkah \=== 4 && (   \<View style={styles.ringkasan}\>   \<Text style={styles.ringkasanJudul}\>Konfirmasi Data\</Text\>   {Object.entries({   'Nama': form.nama,   'Email': form.email,   'No. HP': form.noHp,   'Kota': form.kota,   }).map((\[key, val\]) \=\> (   \<View key={key} style={styles.ringkasanBaris}\>   \<Text style={styles.ringkasanLabel}\>{key}\</Text\>   \<Text style={styles.ringkasanNilai}\>{val}\</Text\>   \</View\>   ))}   \</View\>  )} |

| Catatan  Untuk animasi yang lebih halus, gunakan Animated API di pertemuan mendatang. |  |
| :---- | :---- |

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5  
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

**Latihan Mandiri** 

Kerjakan minimal satu latihan berikut. Latihan 2 lebih menantang dan bernilai lebih tinggi. 

**Latihan 1 — Form Data Diri Mahasiswa** 

Buat form pengisian data diri mahasiswa yang lengkap dengan validasi dan integrasi ke FlatList  dari P4. 

**Spesifikasi wajib:** 

9\. Form input: Nama, NIM, Program Studi (pilihan), Semester, Email, No. HP, Alamat  (multiline) 

10\. Validasi semua field sebelum submit dengan pesan error yang spesifik per field 11\. Setelah submit berhasil: tambahkan data mahasiswa baru ke FlatList daftar mahasiswa 12\. NIM harus unik — validasi jika NIM sudah ada di daftar 

13\. Tombol reset form yang meminta konfirmasi lewat Alert dua tombol 

14\. KeyboardAvoidingView dan navigasi fokus antar input dengan useRef 

**Latihan 2 — Aplikasi Survei Mobile** 

Buat aplikasi survei kepuasan mahasiswa dengan form multi-step yang interaktif. 

**Spesifikasi wajib:** 

15\. Langkah 1 — Identitas: Nama, NIM, Program Studi, Semester 

16\. Langkah 2 — Penilaian Akademik: Rating bintang (1-5) untuk 4 aspek menggunakan  TouchableOpacity bintang, ditambah field komentar 

17\. Langkah 3 — Penilaian Fasilitas: Rating 4 aspek \+ komentar 

18\. Langkah 4 — Saran & Harapan: TextInput multiline untuk saran bebas 19\. Langkah 5 — Konfirmasi: Tampilkan ringkasan semua jawaban sebelum submit 20\. Progress bar visual yang menampilkan persentase pengisian 

21\. Validasi setiap langkah — tidak bisa lanjut jika ada field wajib yang kosong

| Tantangan Bonus  Buat komponen RatingBintang yang reusable: menerima props value dan onChangeValue Simpan progress survei sehingga jika user menutup app dan kembali, data tetap ada  (gunakan AsyncStorage — materi P6)  Tambahkan bar chart sederhana di halaman hasil untuk visualisasi rata-rata rating |
| :---- |

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

**Lembar Kerja dan Dokumentasi** 

**Pertanyaan Analitis** 

Jawab pertanyaan berikut berdasarkan hasil praktikum: 

1\. Jelaskan perbedaan validasi 'saat blur' (onBlur) dengan 'saat submit'\! Mengapa pendekatan  kombinasi keduanya memberikan pengalaman pengguna (UX) yang lebih baik? 

2\. Mengapa pola satu objek state untuk semua field form lebih direkomendasikan daripada  membuat useState terpisah per field? Jelaskan keuntungannya\! 

3\. Apa fungsi KeyboardAvoidingView dan mengapa nilainya berbeda antara iOS ('padding') dan  Android ('height')? Apa yang terjadi jika tidak menggunakan komponen ini? 

4\. Pada form multi-step, mengapa validasi dilakukan per langkah dan bukan sekaligus di akhir  saat submit? Apa dampaknya terhadap pengalaman pengguna? 

**Dokumentasi Screenshot** 

Tempelkan screenshot dari emulator Android untuk setiap hasil praktikum: 

**Screenshot 1: Praktikum A — Form registrasi: tampilkan kondisi error aktif (border merah  \+ pesan error) \+ indikator kekuatan password**

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

| \[ Tempelkan screenshot emulator Android di sini \] |
| :---: |

**Screenshot 2: Praktikum B — Form login: tampilkan loading indicator saat proses login \+  halaman setelah berhasil login** 

| \[ Tempelkan screenshot emulator Android di sini \] |
| :---: |

**Screenshot 3: Praktikum C — Form multi-step: tampilkan 3 state berbeda (langkah 1,  langkah 2, dan halaman ringkasan)** 

| \[ Tempelkan screenshot emulator Android di sini \] |
| :---: |

**Screenshot 4: Latihan Mandiri — Hasil latihan yang dikerjakan**

| \[ Tempelkan screenshot emulator Android di sini \] |
| :---: |

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5   
**MODUL PRAKTIKUM — PEMROGRAMAN MOBILE** Pertemuan 5 — Form & Validasi 

**Rubrik Penilaian** 

| Komponen  | Bobot  | Kriteria |
| :---- | :---: | :---- |
| Praktikum A — Form Registrasi &  Validasi | **25%**  | Validasi onBlur, pesan error spesifik,  indikator kekuatan password |
| Praktikum B — Form Login &   Navigasi | **25%**  | Login simulasi berhasil/gagal, show/hide  password, loading state |
| Praktikum C — Form Multi-Step  | **20%**  | Progress bar, validasi per langkah, halaman  ringkasan berfungsi |
| Latihan Mandiri  | **20%**  | Minimal 1 latihan selesai dengan form yang  berfungsi lengkap |
| Pertanyaan Analitis  | **10%**  | Jawaban menunjukkan pemahaman validasi  dan UX form mobile |

**Catatan Asisten / Dosen** 

|  |
| :---- |

**Nilai Akhir Praktikum: Tanda Tangan Asisten / Dosen**

Mata Kuliah Pemrograman Mobile | React Native dengan Expo Pertemuan 5 