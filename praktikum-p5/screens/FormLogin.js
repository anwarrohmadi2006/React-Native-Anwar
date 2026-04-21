import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ActivityIndicator, Alert 
} from 'react-native';

const AKUN_DUMMY = [
  { email: 'admin@test.com', password: 'Admin123' },
  { email: 'user@test.com', password: 'User1234' },
];

export default function FormLogin({ navigation }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field] || errors.submit) {
      setErrors(prev => ({ ...prev, [field]: '', submit: '' }));
    }
  };

  const validateAll = () => {
    let err = {};
    if (!form.email) err.email = 'Email wajib diisi';
    if (!form.password) err.password = 'Password wajib diisi';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleLogin = async () => {
    if (!validateAll()) return;

    setLoading(true);
    // Simulasi delay 1.5 detik
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    const akun = AKUN_DUMMY.find(
      a => a.email === form.email && a.password === form.password
    );

    if (akun) {
      // Berhasil login — navigasi ke halaman utama
      navigation.replace('MainApp', { email: form.email });
    } else {
      setErrors({ submit: 'Email atau password salah' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>Login</Text>
      
      {errors.submit && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerTeks}>{errors.submit}</Text>
        </View>
      )}

      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          value={form.email}
          onChangeText={(val) => updateForm('email', val)}
          placeholder="nama@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorTeks}>{errors.email}</Text>}
      </View>

      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Password</Text>
        <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
          <TextInput
            style={styles.inputDalamWrapper}
            value={form.password}
            onChangeText={(val) => updateForm('password', val)}
            secureTextEntry={!showPassword}
            placeholder="Password"
          />
          <TouchableOpacity 
            style={styles.ikonMata}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.ikonMataTeks}>{showPassword ? 'HIDE' : 'SHOW'}</Text>
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorTeks}>{errors.password}</Text>}
      </View>

      <TouchableOpacity 
        style={[styles.tombol, isLoading && styles.tombolDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading 
          ? <ActivityIndicator color='#FFF' /> 
          : <Text style={styles.tombolTeks}>Masuk</Text>
        }
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Belum punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Registrasi')}>
          <Text style={styles.link}>Daftar di sini</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#FFF' },
  judul: { fontSize: 32, fontWeight: 'bold', color: '#1F4E79', marginBottom: 40, textAlign: 'center' },
  errorBanner: { backgroundColor: '#FFEBEE', padding: 12, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#FFCDD2' },
  errorBannerTeks: { color: '#D32F2F', textAlign: 'center', fontWeight: '600' },
  fieldWrapper: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 14, fontSize: 16 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#DDD', borderRadius: 10 },
  inputDalamWrapper: { flex: 1, padding: 14, fontSize: 16 },
  inputError: { borderColor: '#D32F2F' },
  errorTeks: { color: '#D32F2F', fontSize: 12, marginTop: 4 },
  ikonMata: { padding: 10, marginRight: 5 },
  ikonMataTeks: { color: '#1F4E79', fontWeight: 'bold', fontSize: 12 },
  tombol: { backgroundColor: '#1F4E79', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 10 },
  tombolDisabled: { opacity: 0.7 },
  tombolTeks: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  link: { color: '#1F4E79', fontWeight: 'bold' }
});
