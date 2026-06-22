import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native';
import { postService } from '../services/postService';

export default function FormEditPost({ route, navigation }) {
  const { post } = route.params; // Data post yang akan diedit
  const [form, setForm] = useState({
    title: post.title,
    body: post.body,
  });
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

  const handleUpdate = async () => {
    if (!validate()) return;
    setSubmit(true);
    try {
      const updated = await postService.update(post.id, form);
      if (Platform.OS === 'web') window.alert('Post berhasil diupdate!');
      else Alert.alert('Berhasil', 'Post berhasil diupdate!');
      navigation.goBack();
    } catch (e) {
      if (Platform.OS === 'web') window.alert('Tidak bisa mengupdate post');
      else Alert.alert('Gagal', 'Tidak bisa mengupdate post');
    } finally {
      setSubmit(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>Edit Post</Text>
      
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
        onPress={handleUpdate} 
        disabled={isSubmitting}
      >
        {isSubmitting
          ? <ActivityIndicator color='#FFF' />
          : <Text style={styles.tombolTeks}>Update Post</Text>
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
  tombol: { backgroundColor: '#4CAF50', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 24 },
  tombolDisabled: { opacity: 0.6 },
  tombolTeks: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
