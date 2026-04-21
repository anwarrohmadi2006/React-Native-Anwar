import { useState, useRef } from 'react';   
import { 
  View, Text, TextInput, TouchableOpacity, 
  ScrollView, StyleSheet, Alert, 
  KeyboardAvoidingView, Platform 
} from 'react-native'; 

export default function FormRegistrasi() {   
  const [form, setForm] = useState({ 
    nama: '', email: '', password: '',  
    konfirmasi: '', noHp: '' 
  }); 

  const [errors, setErrors] = useState({});   
  const [touched, setTouched] = useState({}); 

  // useRef hooks from Step 4
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refKonfirmasi = useRef(null);
  const refNoHp = useRef(null);

  const updateForm = (field, value) => {   
    setForm(prev => ({ ...prev, [field]: value }));   
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));  
  }; 

  const handleBlur = (field) => {   
    setTouched(prev => ({ ...prev, [field]: true }));   
    validateField(field, form[field]);   
  }; 

  const validateField = (field, value) => {   
    let pesan = '';   
    switch (field) {   
      case 'nama':   
        if (!value.trim()) pesan = 'Nama tidak boleh kosong';   
        else if (value.trim().length < 3) pesan = 'Nama minimal 3 karakter';  
        break; 

      case 'email':   
        if (!value) pesan = 'Email tidak boleh kosong';   
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) pesan = 'Format email tidak valid';
        break;

      case 'password':   
        if (!value) pesan = 'Password tidak boleh kosong';   
        else if (value.length < 8) pesan = 'Password minimal 8 karakter';  
        else if (!/[A-Z]/.test(value)) pesan = 'Password harus mengandung huruf kapital'; 
        else if (!/[0-9]/.test(value)) pesan = 'Password harus mengandung angka'; 
        break;

      case 'konfirmasi':   
        if (!value) pesan = 'Konfirmasi password tidak boleh kosong';  
        else if (value !== form.password) pesan = 'Password tidak cocok';  
        break; 

      case 'noHp':   
        if (!value) pesan = 'Nomor HP tidak boleh kosong';   
        else if (!/^08[0-9]{8,11}$/.test(value)) pesan = 'Format: 08xxxxxxxxxx (10-13 digit)'; 
        break;   
    }   
    setErrors(prev => ({ ...prev, [field]: pesan }));   
    return pesan === '';   
  }; 

  const validateAll = () => {   
    const fields = ['nama', 'email', 'password', 'konfirmasi', 'noHp'];  
    let valid = true; 

    fields.forEach(field => {   
      if (!validateField(field, form[field])) valid = false;   
    });   
    return valid;   
  }; 

  const handleSubmit = () => {   
    if (!validateAll()) return;   
    Alert.alert('Berhasil', `Registrasi berhasil!\nSelamat datang, ${form.nama}!`); 
  }; 

  // Indikator Kekuatan Password dari Step 5
  const hitungKekuatan = (pass) => { 
    let skor = 0; 
    if (pass.length >= 8) skor++; 
    if (/[A-Z]/.test(pass)) skor++; 
    if (/[0-9]/.test(pass)) skor++; 
    if (/[^A-Za-z0-9]/.test(pass)) skor++; 
    return skor; // 0-4 
  };

  const kekuatan = hitungKekuatan(form.password); 
  const labelKekuatan = ['', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'][kekuatan]; 
  const warnaKekuatan = ['', '#D32F2F', '#F57C00', '#388E3C', '#1B5E20'][kekuatan];

  const InputField = ({ label, field, inputRef, nextRef, ...props }) => (   
    <View style={styles.fieldWrapper}>   
      <Text style={styles.label}>{label}</Text>   
      <TextInput   
        ref={inputRef}
        style={[styles.input, errors[field] && touched[field] && styles.inputError]} 
        value={form[field]}   
        onChangeText={(val) => updateForm(field, val)}   
        onBlur={() => handleBlur(field)}   
        onSubmitEditing={() => nextRef?.current?.focus()}
        blurOnSubmit={!nextRef}
        {...props}   
      />   
      {errors[field] && touched[field] && (   
        <Text style={styles.errorTeks}>{errors[field]}</Text>  
      )} 
    </View>   
  ); 

  return (   
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    > 
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>   
        <Text style={styles.judul}>Buat Akun Baru</Text>   
        
        <InputField 
          label='Nama Lengkap' 
          field='nama' 
          placeholder='Nama lengkap Anda' 
          autoCapitalize='words' 
          returnKeyType='next'
          onSubmitEditing={() => refEmail.current.focus()}
        /> 

        <InputField 
          inputRef={refEmail}
          label='Email' 
          field='email' 
          placeholder='nama@email.com'  
          keyboardType='email-address' 
          autoCapitalize='none' 
          returnKeyType='next'
          onSubmitEditing={() => refPassword.current.focus()}
        /> 

        <InputField 
          inputRef={refPassword}
          label='Password' 
          field='password' 
          placeholder='Min. 8 karakter, ada kapital & angka' 
          secureTextEntry 
          returnKeyType='next'
          onSubmitEditing={() => refKonfirmasi.current.focus()}
        />

        {/* Tampilan Kekuatan Password Step 5 */}
        {form.password.length > 0 && ( 
          <View style={{ flexDirection: 'row', gap: 4, marginTop: 6, marginBottom: 12 }}>  
            {[1,2,3,4].map(i => ( 
              <View key={i} style={{ 
                flex: 1, height: 4, borderRadius: 2, 
                backgroundColor: i <= kekuatan ? warnaKekuatan : '#DDD'  }} /> 
            ))} 
          </View> 
        )} 
        {form.password.length > 0 && ( 
          <Text style={{ color: warnaKekuatan, fontSize: 12, marginTop: -8, marginBottom: 12 }}>  
            {labelKekuatan} 
          </Text> 
        )}

        <InputField 
          inputRef={refKonfirmasi}
          label='Konfirmasi Password' 
          field='konfirmasi'  
          placeholder='Ulangi password' 
          secureTextEntry 
          returnKeyType='next'
          onSubmitEditing={() => refNoHp.current.focus()}
        /> 

        <InputField 
          inputRef={refNoHp}
          label='Nomor HP' 
          field='noHp' 
          placeholder='08xxxxxxxxxx'  
          keyboardType='phone-pad' 
          returnKeyType='done'
        /> 

        <TouchableOpacity style={styles.tombol} onPress={handleSubmit}>  
          <Text style={styles.tombolTeks}>Daftar Sekarang</Text>  
        </TouchableOpacity> 

      </ScrollView>   
    </KeyboardAvoidingView>
  );   
} 

const styles = StyleSheet.create({   
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },  
  judul: { fontSize: 24, fontWeight: 'bold', color: '#1F4E79',  marginBottom: 24 }, 
  fieldWrapper:{ marginBottom: 12 },   
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 }, 
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD',  borderRadius: 8, paddingHorizontal: 14, paddingVertical: 11, fontSize: 15 },  
  inputError: { borderColor: '#D32F2F', borderWidth: 2 }, 
  errorTeks: { color: '#D32F2F', fontSize: 12, marginTop: 4 },  
  tombol: { backgroundColor: '#1F4E79', borderRadius: 10, padding: 16,  alignItems: 'center', marginTop: 24, marginBottom: 40 }, 
  tombolTeks: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }, 
});
