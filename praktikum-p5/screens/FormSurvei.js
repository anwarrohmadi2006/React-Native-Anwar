import { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ScrollView, Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOTAL_STEPS = 5;
const STORAGE_KEY = '@survei_data';

export default function FormSurvei() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nama: '', email: '', rating: 0, 
    feedback: '', rekomendasi: 'Ya'
  });

  // Load data saat komponen dimuat (Latihan 3)
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setForm(JSON.parse(jsonValue));
        Alert.alert('Info', 'Data survei sebelumnya berhasil dimuat dari penyimpanan.');
      }
    } catch (e) {
      console.error('Gagal memuat data', e);
    }
  };

  const saveData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Gagal menyimpan data', e);
    }
  };

  const nextStep = () => {
    if (step === 1 && !form.nama) return Alert.alert('Wajib Isi', 'Nama Anda belum diisi');
    if (step === 2 && !form.email) return Alert.alert('Wajib Isi', 'Email Anda belum diisi');
    if (step === 3 && form.rating === 0) return Alert.alert('Pilih Rating', 'Silakan pilih rating bintang');
    
    // Simpan data setiap langkah (Auto-save)
    saveData(form);
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    // Hapus data setelah berhasil kirim
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      Alert.alert('Terima Kasih', 'Survei Anda telah berhasil dikirim dan penyimpanan dibersihkan!');
      setStep(1);
      setForm({ nama: '', email: '', rating: 0, feedback: '', rekomendasi: 'Ya' });
    } catch (e) {
      console.error('Gagal membersihkan storage', e);
    }
  };

  const StarRating = () => (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <TouchableOpacity key={i} onPress={() => setForm({...form, rating: i})}>
          <Text style={[styles.star, { color: i <= form.rating ? '#FFD700' : '#DDD' }]}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.judul}>Aplikasi Survei</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(step / TOTAL_STEPS) * 100}%` }]} />
      </View>
      <Text style={styles.stepText}>Langkah {step} dari {TOTAL_STEPS}</Text>

      <View style={styles.card}>
        {step === 1 && (
          <View>
            <Text style={styles.question}>Siapa nama lengkap Anda?</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama"
              value={form.nama}
              onChangeText={(val) => setForm({...form, nama: val})}
            />
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.question}>Apa alamat email Anda?</Text>
            <TextInput
              style={styles.input}
              placeholder="nama@email.com"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(val) => setForm({...form, email: val})}
            />
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.question}>Seberapa puas Anda dengan layanan kami?</Text>
            <StarRating />
            <Text style={styles.ratingLabel}>
              {['', 'Sangat Tidak Puas', 'Tidak Puas', 'Biasa Saja', 'Puas', 'Sangat Puas'][form.rating]}
            </Text>
          </View>
        )}

        {step === 4 && (
          <View>
            <Text style={styles.question}>Ada masukan atau saran?</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Tulis pendapat Anda di sini..."
              multiline
              value={form.feedback}
              onChangeText={(val) => setForm({...form, feedback: val})}
            />
          </View>
        )}

        {step === 5 && (
          <View>
            <Text style={styles.question}>Konfirmasi Data Survei</Text>
            <Text style={styles.summaryText}>Nama: {form.nama}</Text>
            <Text style={styles.summaryText}>Email: {form.email}</Text>
            <Text style={styles.summaryText}>Rating: {form.rating} Bintang</Text>
            <Text style={styles.summaryText}>Feedback: {form.feedback || '-'}</Text>
          </View>
        )}
      </View>

      <View style={styles.navRow}>
        {step > 1 && (
          <TouchableOpacity style={styles.btnBack} onPress={prevStep}>
            <Text style={styles.btnBackText}>Kembali</Text>
          </TouchableOpacity>
        )}
        
        {step < TOTAL_STEPS ? (
          <TouchableOpacity style={styles.btnNext} onPress={nextStep}>
            <Text style={styles.btnNextText}>Lanjut</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
            <Text style={styles.btnSubmitText}>Kirim Survei</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F0F4F8' },
  judul: { fontSize: 24, fontWeight: 'bold', color: '#1F4E79', marginBottom: 20 },
  progressBar: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginBottom: 10 },
  progressFill: { height: '100%', backgroundColor: '#2E75B6', borderRadius: 4 },
  stepText: { fontSize: 13, color: '#666', marginBottom: 20 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, minHeight: 250, elevation: 4 },
  question: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 20 },
  input: { borderBottomWidth: 2, borderBottomColor: '#2E75B6', padding: 10, fontSize: 16 },
  starRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20 },
  star: { fontSize: 40, marginHorizontal: 5 },
  ratingLabel: { textAlign: 'center', fontSize: 16, color: '#2E75B6', fontWeight: 'bold' },
  summaryText: { fontSize: 15, color: '#444', marginBottom: 8 },
  navRow: { flexDirection: 'row', gap: 10, marginTop: 30 },
  btnBack: { flex: 1, padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#2E75B6', alignItems: 'center' },
  btnBackText: { color: '#2E75B6', fontWeight: 'bold' },
  btnNext: { flex: 2, padding: 15, borderRadius: 10, backgroundColor: '#2E75B6', alignItems: 'center' },
  btnNextText: { color: '#FFF', fontWeight: 'bold' },
  btnSubmit: { flex: 2, padding: 15, borderRadius: 10, backgroundColor: '#1F4E79', alignItems: 'center' },
  btnSubmitText: { color: '#FFF', fontWeight: 'bold' },
});
