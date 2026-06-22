import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { supabase } from '../lib/supabase';
import { TombolGoogleLogin } from '../components/TombolGoogleLogin';

export default function HalamanLogin({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
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
    if (!form.email || !form.password) {
      showAlert('Error', 'Email dan Password wajib diisi');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;
      console.log('Login berhasil:', data.user.email);
    } catch (error) {
      let pesan = 'Terjadi kesalahan. Silakan coba lagi.';
      if (error.message === 'Invalid login credentials') {
        pesan = 'Email atau kata sandi salah.\n\nJika email ini terhubung dengan akun Google Anda, silakan gunakan tombol "Masuk dengan Google" di bawah.';
      } else if (error.message.includes('Email not confirmed')) {
        pesan = 'Email belum dikonfirmasi. Silakan cek kotak masuk email Anda.';
      } else {
        pesan = error.message;
      }
      showAlert('Login Gagal', pesan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Silakan Login</Text>
      
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
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin} 
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
      
      <View style={styles.divider}>
        <View style={styles.dividerGaris} />
        <Text style={styles.dividerTeks}>atau</Text>
        <View style={styles.dividerGaris} />
      </View>
      
      <TombolGoogleLogin />
      
      <TouchableOpacity onPress={() => navigation.navigate('Daftar')} style={styles.link}>
        <Text style={styles.linkText}>Belum punya akun? Daftar di sini</Text>
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
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerGaris: { flex: 1, height: 1, backgroundColor: '#ccc' },
  dividerTeks: { marginHorizontal: 10, color: '#888' },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#2E75B6', fontSize: 14 }
});
