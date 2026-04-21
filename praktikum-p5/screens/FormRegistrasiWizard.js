import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ScrollView, Alert 
} from 'react-native';

const TOTAL_LANGKAH = 4; // 3 langkah input + 1 langkah ringkasan

export default function FormRegistrasiWizard() {
  const [langkah, setLangkah] = useState(1);
  const [form, setForm] = useState({
    // Langkah 1: Data Diri
    nama: '', tglLahir: '', jenisKelamin: '',
    // Langkah 2: Akun
    email: '', password: '', konfirmasi: '',
    // Langkah 3: Kontak
    noHp: '', alamat: '', kota: '',
  });
  const [errors, setErrors] = useState({});

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validasiLangkah = (step) => {
    const err = {};
    if (step === 1) {
      if (!form.nama.trim()) err.nama = 'Nama tidak boleh kosong';
      if (!form.tglLahir) err.tglLahir = 'Tanggal lahir wajib diisi';
      if (!form.jenisKelamin) err.jenisKelamin = 'Jenis kelamin wajib diisi';
    }
    if (step === 2) {
      if (!form.email) err.email = 'Email tidak boleh kosong';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Format email tidak valid';
      if (form.password.length < 8) err.password = 'Password minimal 8 karakter';
      if (form.password !== form.konfirmasi) err.konfirmasi = 'Password tidak cocok';
    }
    if (step === 3) {
      if (!form.noHp) err.noHp = 'Nomor HP tidak boleh kosong';
      if (!form.alamat) err.alamat = 'Alamat tidak boleh kosong';
      if (!form.kota) err.kota = 'Kota tidak boleh kosong';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleLanjut = () => {
    if (validasiLangkah(langkah)) setLangkah(prev => prev + 1);
  };

  const handleKembali = () => setLangkah(prev => prev - 1);

  const handleSubmit = () => {
    Alert.alert('Berhasil', 'Pendaftaran Anda telah kami terima!');
    // Logika pengiriman data ke server
  };

  const ProgressBar = () => (
    <View style={styles.progressContainer}>
      {Array.from({ length: TOTAL_LANGKAH }, (_, i) => i + 1).map(i => (
        <View key={i} style={styles.progressWrapper}>
          <View style={[styles.progressLingkaran, i <= langkah && styles.progressAktif]}>
            <Text style={[styles.progressAngka, i <= langkah && styles.progressAngkaAktif]}>
              {i}
            </Text>
          </View>
          {i < TOTAL_LANGKAH && (
            <View style={[styles.progressGaris, i < langkah && styles.progressGarisAktif]} />
          )}
        </View>
      ))}
    </View>
  );

  const Input = ({ label, field, ...props }) => (
    <View style={styles.inputField}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        value={form[field]}
        onChangeText={val => updateForm(field, val)}
        {...props}
      />
      {errors[field] && <Text style={styles.errorTeks}>{errors[field]}</Text>}
    </View>
  );

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <Text style={styles.judul}>Registrasi Berjenjang</Text>
      
      <ProgressBar />
      
      <Text style={styles.subjudul}>
        Langkah {langkah} dari {TOTAL_LANGKAH}: 
        {langkah === 1 ? ' Data Diri' : langkah === 2 ? ' Akun' : langkah === 3 ? ' Kontak' : ' Konfirmasi'}
      </Text>

      {/* Gunakan key={langkah} untuk force re-render dan bisa ditambah animasi nantinya */}
      <View key={langkah} style={{ opacity: 1 }}>
        {langkah === 1 && (
          <View>
            <Input label="Nama Lengkap" field="nama" placeholder="Sesuai KTP" autoCapitalize="words" />
            <Input label="Tanggal Lahir" field="tglLahir" placeholder="DD/MM/YYYY" keyboardType="numeric" />
            <Input label="Jenis Kelamin" field="jenisKelamin" placeholder="Laki-laki / Perempuan" />
          </View>
        )}

        {langkah === 2 && (
          <View>
            <Input label="Email" field="email" placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" />
            <Input label="Password" field="password" placeholder="Minimal 8 karakter" secureTextEntry />
            <Input label="Konfirmasi Password" field="konfirmasi" placeholder="Ulangi password" secureTextEntry />
          </View>
        )}

        {langkah === 3 && (
          <View>
            <Input label="Nomor HP" field="noHp" placeholder="08xxxxxxxxxx" keyboardType="phone-pad" />
            <Input label="Alamat" field="alamat" placeholder="Jalan, nomor, RT/RW" multiline numberOfLines={2} />
            <Input label="Kota" field="kota" placeholder="Nama kota" />
          </View>
        )}

        {langkah === 4 && (
          <View style={styles.ringkasan}>
            <Text style={styles.ringkasanJudul}>Konfirmasi Data</Text>
            {[
              { label: 'Nama', value: form.nama },
              { label: 'Email', value: form.email },
              { label: 'No. HP', value: form.noHp },
              { label: 'Alamat', value: `${form.alamat}, ${form.kota}` },
            ].map((item, idx) => (
              <View key={idx} style={styles.ringkasanBaris}>
                <Text style={styles.ringkasanLabel}>{item.label}</Text>
                <Text style={styles.ringkasanNilai}>{item.value}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.tombolWrapper}>
        {langkah > 1 && (
          <TouchableOpacity style={styles.tombolKembali} onPress={handleKembali}>
            <Text style={styles.tombolKembaliTeks}>Kembali</Text>
          </TouchableOpacity>
        )}
        
        {langkah < TOTAL_LANGKAH ? (
          <TouchableOpacity style={styles.tombolLanjut} onPress={handleLanjut}>
            <Text style={styles.tombolLanjutTeks}>Lanjut</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.tombolSubmit} onPress={handleSubmit}>
            <Text style={styles.tombolSubmitTeks}>Selesaikan Pendaftaran</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  judul: { fontSize: 24, fontWeight: 'bold', color: '#1F4E79', marginBottom: 16 },
  subjudul: { fontSize: 16, color: '#666', marginBottom: 20, fontWeight: '500' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  progressWrapper: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  progressLingkaran: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: '#CCC', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  progressAktif: { borderColor: '#1F4E79', backgroundColor: '#1F4E79' },
  progressAngka: { fontWeight: 'bold', color: '#CCC' },
  progressAngkaAktif: { color: '#FFF' },
  progressGaris: { flex: 1, height: 3, backgroundColor: '#CCC' },
  progressGarisAktif: { backgroundColor: '#1F4E79' },
  inputField: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: 15 },
  inputError: { borderColor: '#D32F2F', borderWidth: 2 },
  errorTeks: { color: '#D32F2F', fontSize: 12, marginTop: 4 },
  tombolWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, paddingBottom: 50, gap: 12 },
  tombolKembali: { flex: 1, borderWidth: 2, borderColor: '#1F4E79', borderRadius: 10, padding: 15, alignItems: 'center' },
  tombolKembaliTeks: { color: '#1F4E79', fontWeight: 'bold' },
  tombolLanjut: { flex: 1, backgroundColor: '#1F4E79', borderRadius: 10, padding: 15, alignItems: 'center' },
  tombolLanjutTeks: { color: '#FFF', fontWeight: 'bold' },
  tombolSubmit: { flex: 1, backgroundColor: '#1B5E20', borderRadius: 10, padding: 15, alignItems: 'center' },
  tombolSubmitTeks: { color: '#FFF', fontWeight: 'bold' },
  ringkasan: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#DDD' },
  ringkasanJudul: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#1F4E79', textAlign: 'center' },
  ringkasanBaris: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  ringkasanLabel: { color: '#666', fontWeight: '500' },
  ringkasanNilai: { color: '#333', fontWeight: 'bold', flex: 1, textAlign: 'right', marginLeft: 20 },
});
