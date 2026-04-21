import { useState } from 'react';   
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'; 

const TOTAL_LANGKAH = 4; // Ditambah jadi 4 untuk halaman ringkasan (Step 3 Praktikum C)

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

  // Validasi per langkah   
  const validasiLangkah = (step) => {   
    const err = {};   
    if (step === 1) {   
      if (!form.nama.trim()) err.nama = 'Nama tidak boleh kosong';  
      if (!form.tglLahir) err.tglLahir = 'Tanggal lahir wajib diisi';  
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
    } 

    setErrors(err);   
    return Object.keys(err).length === 0;   
  }; 

  const handleLanjut = () => {   
    if (validasiLangkah(langkah)) setLangkah(prev => prev + 1);  
  }; 

  const handleKembali = () => setLangkah(prev => prev - 1); 

  const handleSubmit = () => {   
    if (validasiLangkah(3)) {   
      console.log('Data form:', form);   
      Alert.alert('Berhasil', 'Registrasi Wizard Selesai!');
    }   
  }; 

  // Komponen progress bar   
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

  // Komponen input helper   
  const Input = ({ label, field, ...props }) => (   
    <View style={{ marginBottom: 4 }}>   
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
      <Text style={styles.judul}>Registrasi Akun</Text> 

      <ProgressBar />   
      <Text style={styles.subjudul}>   
        Langkah {langkah} dari {TOTAL_LANGKAH}:   
        {langkah === 1 ? ' Data Diri' : langkah === 2 ? ' Akun' : langkah === 3 ? ' Kontak' : ' Ringkasan'}  
      </Text>

      {/* View dengan key untuk fade effect (Praktikum C Step 2) */}
      <View key={langkah} style={{ opacity: 1 }}> 
        {/* Langkah 1 */}   
        {langkah === 1 && (   
          <View>   
            <Input label='Nama Lengkap' field='nama' placeholder='Nama sesuai KTP' autoCapitalize='words' /> 
            <Input label='Tanggal Lahir' field='tglLahir' placeholder='DD/MM/YYYY' keyboardType='numeric' />   
            <Input label='Jenis Kelamin' field='jenisKelamin' placeholder='Laki laki / Perempuan' /> 
          </View>   
        )} 

        {/* Langkah 2 */}   
        {langkah === 2 && (   
          <View>   
            <Input label='Email' field='email' placeholder='nama@email.com' keyboardType='email-address' autoCapitalize='none' /> 
            <Input label='Password' field='password' placeholder='Min. 8 karakter' secureTextEntry /> 
            <Input label='Konfirmasi Password' field='konfirmasi' placeholder='Ulangi password' secureTextEntry /> 
          </View>   
        )} 

        {/* Langkah 3 */}   
        {langkah === 3 && (   
          <View>   
            <Input label='Nomor HP' field='noHp' placeholder='08xxxxxxxxxx' keyboardType='phone-pad' /> 
            <Input label='Alamat' field='alamat' placeholder='Jalan, nomor, RT/RW' /> 
            <Input label='Kota' field='kota' placeholder='Nama kota' />  
          </View> 
        )}

        {/* Langkah 4 (Ringkasan - Praktikum C Step 3) */}
        {langkah === 4 && ( 
          <View style={styles.ringkasan}> 
            <Text style={styles.ringkasanJudul}>Konfirmasi Data</Text> 
            {Object.entries({ 
              'Nama': form.nama, 
              'Email': form.email, 
              'No. HP': form.noHp, 
              'Kota': form.kota, 
            }).map(([key, val]) => ( 
              <View key={key} style={styles.ringkasanBaris}> 
                <Text style={styles.ringkasanLabel}>{key}</Text> 
                <Text style={styles.ringkasanNilai}>{val}</Text> 
              </View> 
            ))} 
          </View> 
        )} 
      </View>

      {/* Tombol Navigasi Antar Langkah */}   
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
            <Text style={styles.tombolSubmitTeks}>Daftar Sekarang</Text>  
          </TouchableOpacity> 
        )}   
      </View>   
    </ScrollView>   
  );   
} 

const styles = StyleSheet.create({   
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },  
  judul: { fontSize: 24, fontWeight: 'bold', color: '#1F4E79',  marginBottom: 16 }, 
  subjudul: { fontSize: 15, color: '#666', marginBottom: 20 },  
  progressContainer: { flexDirection: 'row', alignItems: 'center',  marginBottom: 20 }, 
  progressWrapper: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  progressLingkaran: { width: 32, height: 32, borderRadius: 16, borderWidth: 2,  borderColor: '#CCC', justifyContent: 'center', alignItems: 'center',  backgroundColor: '#FFF' }, 
  progressAktif: { borderColor: '#1F4E79', backgroundColor: '#1F4E79' },  
  progressAngka: { fontWeight: 'bold', color: '#CCC' }, 
  progressAngkaAktif:{ color: '#FFF' },   
  progressGaris: { flex: 1, height: 2, backgroundColor: '#CCC' },  
  progressGarisAktif:{ backgroundColor: '#1F4E79' }, 
  label: { fontSize: 14, fontWeight: '600', color: '#333',  marginBottom: 6, marginTop: 12 }, 
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11, fontSize: 15 }, 
  inputError: { borderColor: '#D32F2F', borderWidth: 2 },  
  errorTeks: { color: '#D32F2F', fontSize: 12, marginTop: 4 },  
  tombolWrapper: { flexDirection: 'row', justifyContent: 'space-between',  marginTop: 32, marginBottom: 40, gap: 12 }, 
  tombolKembali: { flex: 1, borderWidth: 2, borderColor: '#2E75B6',  borderRadius: 10, padding: 14, alignItems: 'center' }, 
  tombolKembaliTeks: { color: '#2E75B6', fontWeight: 'bold', fontSize: 15 },  
  tombolLanjut: { flex: 1, backgroundColor: '#2E75B6', borderRadius: 10,  padding: 14, alignItems: 'center' }, 
  tombolLanjutTeks: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },  
  tombolSubmit: { flex: 1, backgroundColor: '#1F4E79', borderRadius: 10,  padding: 14, alignItems: 'center' }, 
  tombolSubmitTeks: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  ringkasan: { marginTop: 10, padding: 15, backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#DDD' },
  ringkasanJudul: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#1F4E79' },
  ringkasanBaris: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  ringkasanLabel: { fontWeight: '600', color: '#666' },
  ringkasanNilai: { color: '#333' },
});
