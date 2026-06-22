import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { supabase } from '../lib/supabase';

export default function HalamanDaftar({ navigation }) {
  const [form, setForm] = useState({
    namaLengkap: '',
    nim: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const validate = () => {
    if (!form.namaLengkap || !form.nim || !form.email || !form.password || !form.confirmPassword) {
      showAlert('Error', 'Semua field wajib diisi');
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      showAlert('Error', 'Format email tidak valid');
      return false;
    }
    if (form.password.length < 6) {
      showAlert('Error', 'Password minimal 6 karakter');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      showAlert('Error', 'Password dan Konfirmasi Password tidak cocok');
      return false;
    }
    return true;
  };

  const handleDaftar = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            nama_lengkap: form.namaLengkap,
            nim: form.nim,
          }
        }
      });
      if (error) throw error;
      if (data.user) {
        showAlert('Berhasil!', `Akun berhasil dibuat untuk ${data.user.email}`);
        // Jika auto-login tidak terjadi (karena email konfirmasi on), arahkan ke login.
        // Supabase secara default akan login otomatis jika email confirmation off.
        navigation.navigate('Login');
      }
    } catch (error) {
      let pesan = 'Terjadi kesalahan yang tidak diketahui. Silakan coba beberapa saat lagi.';
      
      if (error.message.includes('User already registered') || error.message.toLowerCase().includes('already exists')) {
        pesan = 'Email ini sudah terdaftar di sistem kami.\n\nJika sebelumnya Anda pernah masuk menggunakan akun Google, silakan kembali ke halaman Login dan gunakan tombol "Masuk dengan Google".';
      } else if (error.message.includes('Password')) {
        pesan = 'Kata sandi terlalu lemah. Harap gunakan kata sandi yang lebih kuat (minimal 6 karakter).';
      } else {
        pesan = error.message; // Tampilkan pesan asli dari Supabase untuk error lain
      }
      
      showAlert('Pendaftaran Gagal', pesan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Akun Baru</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Nama Lengkap" 
        value={form.namaLengkap} 
        onChangeText={(text) => setForm({ ...form, namaLengkap: text })} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="NIM" 
        value={form.nim} 
        onChangeText={(text) => setForm({ ...form, nim: text })} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address" 
        autoCapitalize="none" 
        value={form.email} 
        onChangeText={(text) => setForm({ ...form, email: text })} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={form.password} 
        onChangeText={(text) => setForm({ ...form, password: text })} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Konfirmasi Password" 
        secureTextEntry 
        value={form.confirmPassword} 
        onChangeText={(text) => setForm({ ...form, confirmPassword: text })} 
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleDaftar} 
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Daftar</Text>}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
        <Text style={styles.linkText}>Sudah punya akun? Login di sini</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#2E75B6', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonDisabled: { backgroundColor: '#a0c4e4' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#2E75B6', fontSize: 14 }
});
