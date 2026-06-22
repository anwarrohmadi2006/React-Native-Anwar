import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native';
import { postService } from '../services/postService';

export default function FormBuatPost({ navigation }) {
  const [form, setForm] = useState({ title: '', body: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmit] = useState(false);

  const updateForm = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = 'Judul tidak boleh kosong';
    if (!form.body.trim()) err.body = 'Isi tidak boleh kosong';
    else if (form.body.trim().length < 10) err.body = 'Isi minimal 10 karakter';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmit(true);
    try {
      const hasilBaru = await postService.create({
        title: form.title,
        body: form.body,
        userId: 1,
      });
      if (Platform.OS === 'web') window.alert(`Berhasil! Post '${hasilBaru.title}' berhasil dibuat dengan ID: ${hasilBaru.id}`);
      else Alert.alert('Berhasil!', `Post '${hasilBaru.title}' berhasil dibuat dengan ID: ${hasilBaru.id}`);
      navigation.goBack(); // Kembali ke DaftarPost
    } catch (e) {
      if (Platform.OS === 'web') window.alert(e.response?.data?.message || 'Tidak bisa membuat post. Coba lagi.');
      else Alert.alert('Gagal', e.response?.data?.message || 'Tidak bisa membuat post. Coba lagi.');
    } finally {
      setSubmit(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>Buat Post Baru</Text>
      
      <Text style={styles.label}>Judul</Text>
      <TextInput 
        style={[styles.input, errors.title && styles.inputError]}
        value={form.title} 
        onChangeText={v => updateForm('title', v)}
        placeholder='Judul post...' 
      />
      {errors.title && <Text style={styles.errorTeks}>{errors.title}</Text>}
      
      <Text style={styles.label}>Isi</Text>
      <TextInput 
        style={[styles.input, styles.inputMulti, errors.body && styles.inputError]}
        value={form.body} 
        onChangeText={v => updateForm('body', v)}
        placeholder='Isi post...' 
        multiline 
        numberOfLines={5}
        textAlignVertical='top' 
      />
      {errors.body && <Text style={styles.errorTeks}>{errors.body}</Text>}
      
      <TouchableOpacity 
        style={[styles.tombol, isSubmitting && styles.tombolDisabled]}
        onPress={handleSubmit} 
        disabled={isSubmitting}
      >
        {isSubmitting
          ? <ActivityIndicator color='#FFF' />
          : <Text style={styles.tombolTeks}>Kirim Post</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  judul: { fontSize: 22, fontWeight: 'bold', color: '#1F4E79', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: 15 },
  inputMulti: { height: 120, paddingTop: 12 },
  inputError: { borderColor: '#D32F2F', borderWidth: 2 },
  errorTeks: { color: '#D32F2F', fontSize: 12, marginTop: 4 },
  tombol: { backgroundColor: '#1F4E79', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 24 },
  tombolDisabled: { opacity: 0.6 },
  tombolTeks: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
