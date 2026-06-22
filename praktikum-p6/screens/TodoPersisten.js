import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PreferencesContext } from '../context/PreferencesContext';

const STORAGE_KEY = '@todos_list';

export default function TodoPersisten() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setLoading] = useState(true);
  const { getTheme, getFontSize } = useContext(PreferencesContext);

  const theme = getTheme();
  const titleFontSize = getFontSize(22);
  const textFontSize = getFontSize(15);
  const smallFontSize = getFontSize(13);

  // LOAD: Muat data saat pertama kali buka
  useEffect(() => {
    const muatData = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw !== null) setTodos(JSON.parse(raw));
      } catch (e) {
        Alert.alert('Error', 'Gagal memuat data tersimpan');
      } finally {
        setLoading(false);
      }
    };
    muatData();
  }, []); // [] = hanya jalankan sekali saat mount

  // SAVE: Simpan otomatis setiap todos berubah
  useEffect(() => {
    if (isLoading) return; // Jangan simpan saat masih loading
    const simpanData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (e) {
        Alert.alert('Error', 'Gagal menyimpan data');
      }
    };
    simpanData();
  }, [todos, isLoading]); // Jalankan setiap todos berubah

  const tambah = () => {
    if (!input.trim()) return;
    const baru = { id: Date.now().toString(), teks: input.trim(), selesai: false };
    setTodos((prev) => [...prev, baru]);
    setInput('');
  };

  const toggle = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t))
    );
  };

  const hapus = (id) => {
    if (Platform.OS === 'web') {
      const isConfirm = window.confirm('Yakin hapus tugas ini?');
      if (isConfirm) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      }
    } else {
      Alert.alert('Hapus', 'Yakin hapus tugas ini?', [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => setTodos((prev) => prev.filter((t) => t.id !== id)),
        },
      ]);
    }
  };

  if (isLoading)
    return (
      <View style={[styles.tengah, { backgroundColor: theme.containerBg }]}>
        <Text style={{ color: theme.text }}>Memuat...</Text>
      </View>
    );

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBg }]}>
      <Text style={[styles.judul, { color: theme.textPrimary, fontSize: titleFontSize }]}>
        Tugas Saya ({todos.filter((t) => !t.selesai).length} tersisa)
      </Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.borderColor, color: theme.text, fontSize: textFontSize }]}
          value={input}
          onChangeText={setInput}
          placeholder="Tambah tugas baru..."
          placeholderTextColor={theme.text + '80'}
          onSubmitEditing={tambah}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.tombolTambah} onPress={tambah}>
          <Text style={styles.tombolTeks}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: theme.cardBg, borderColor: theme.borderColor }, item.selesai && styles.itemSelesai]}>
            <TouchableOpacity onPress={() => toggle(item.id)} style={{ flex: 1 }}>
              <Text style={[styles.itemTeks, { color: theme.text, fontSize: textFontSize }, item.selesai && styles.itemTeksSelesai]}>
                {item.selesai ? '[OK] ' : '[ ] '}
                {item.teks}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => hapus(item.id)}>
              <Text style={[styles.tombolHapus, { fontSize: smallFontSize }]}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.kosong, { color: theme.text + '90' }]}>Belum ada tugas. Tambahkan di atas!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 50 },
  tengah: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  judul: { fontWeight: 'bold', marginBottom: 16 },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tombolTambah: {
    backgroundColor: '#2E75B6',
    borderRadius: 8,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tombolTeks: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
  },
  itemSelesai: { backgroundColor: '#E8F5E9', opacity: 0.8 },
  itemTeks: {},
  itemTeksSelesai: { textDecorationLine: 'line-through', color: '#AAA' },
  tombolHapus: { color: '#D32F2F', fontWeight: '600' },
  kosong: { textAlign: 'center', marginTop: 40, fontStyle: 'italic' },
});
