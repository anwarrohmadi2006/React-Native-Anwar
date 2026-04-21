import { useState, useRef } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  ScrollView, StyleSheet, Alert, 
  KeyboardAvoidingView, Platform 
} from 'react-native';

export default function FormLatihan1() {
  const [form, setForm] = useState({
    nama: '', nim: '', prodi: '', 
    semester: '', email: '', noHp: '', alamat: ''
  });

  // Refs for focus management
  const refNim = useRef(null);
  const refProdi = useRef(null);
  const refSemester = useRef(null);
  const refEmail = useRef(null);
  const refNoHp = useRef(null);
  const refAlamat = useRef(null);

  const resetForm = () => {
    Alert.alert(
      'Konfirmasi Reset',
      'Apakah Anda yakin ingin menghapus semua data?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Ya, Hapus', 
          onPress: () => setForm({
            nama: '', nim: '', prodi: '', 
            semester: '', email: '', noHp: '', alamat: ''
          }) 
        }
      ]
    );
  };

  const handleSimpan = () => {
    if (!form.nama || !form.nim || !form.prodi) {
      Alert.alert('Eror', 'Nama, NIM, dan Prodi wajib diisi!');
      return;
    }

    Alert.alert(
      'Konfirmasi Simpan',
      `Simpan data mahasiswa ${form.nama}?`,
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Simpan', 
          onPress: () => Alert.alert('Berhasil', 'Data mahasiswa berhasil disimpan!') 
        }
      ]
    );
  };

  const InputField = ({ label, value, field, inputRef, nextRef, ...props }) => (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={(val) => setForm(prev => ({ ...prev, [field]: val }))}
        onSubmitEditing={() => nextRef?.current?.focus()}
        blurOnSubmit={!nextRef}
        {...props}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
        <Text style={styles.judul}>Data Diri Mahasiswa</Text>
        <Text style={styles.subjudul}>Latihan Mandiri 1 — Pertemuan 5</Text>

        <InputField 
          label='Nama Lengkap' 
          field='nama' 
          value={form.nama}
          placeholder='Nama Lengkap' 
          returnKeyType='next'
          nextRef={refNim}
        />

        <InputField 
          inputRef={refNim}
          label='NIM' 
          field='nim' 
          value={form.nim}
          placeholder='NIM Mahasiswa' 
          keyboardType='numeric'
          returnKeyType='next'
          nextRef={refProdi}
        />

        <InputField 
          inputRef={refProdi}
          label='Program Studi' 
          field='prodi' 
          value={form.prodi}
          placeholder='Teknik Informatika / Sistem Informasi' 
          returnKeyType='next'
          nextRef={refSemester}
        />

        <InputField 
          inputRef={refSemester}
          label='Semester' 
          field='semester' 
          value={form.semester}
          placeholder='Contoh: 4' 
          keyboardType='numeric'
          returnKeyType='next'
          nextRef={refEmail}
        />

        <InputField 
          inputRef={refEmail}
          label='Email' 
          field='email' 
          value={form.email}
          placeholder='nama@mhs.ac.id' 
          keyboardType='email-address'
          autoCapitalize='none'
          returnKeyType='next'
          nextRef={refNoHp}
        />

        <InputField 
          inputRef={refNoHp}
          label='Nomor HP' 
          field='noHp' 
          value={form.noHp}
          placeholder='08xxxxxxxxxx' 
          keyboardType='phone-pad'
          returnKeyType='next'
          nextRef={refAlamat}
        />

        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>Alamat Lengkap</Text>
          <TextInput
            ref={refAlamat}
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            value={form.alamat}
            onChangeText={(val) => setForm(prev => ({ ...prev, alamat: val }))}
            placeholder='Alamat tempat tinggal'
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.tombolGrup}>
          <TouchableOpacity style={styles.tombolReset} onPress={resetForm}>
            <Text style={styles.tombolResetTeks}>Reset Form</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tombolSimpan} onPress={handleSimpan}>
            <Text style={styles.tombolSimpanTeks}>Simpan Data</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  judul: { fontSize: 24, fontWeight: 'bold', color: '#1F4E79' },
  subjudul: { fontSize: 13, color: '#666', marginBottom: 24 },
  fieldWrapper: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: '700', color: '#444', marginBottom: 6 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  tombolGrup: { flexDirection: 'row', gap: 10, marginTop: 20, marginBottom: 50 },
  tombolReset: { flex: 1, borderWidth: 1, borderColor: '#D32F2F', borderRadius: 10, padding: 15, alignItems: 'center' },
  tombolResetTeks: { color: '#D32F2F', fontWeight: 'bold' },
  tombolSimpan: { flex: 1, backgroundColor: '#1F4E79', borderRadius: 10, padding: 15, alignItems: 'center' },
  tombolSimpanTeks: { color: '#FFF', fontWeight: 'bold' },
});
