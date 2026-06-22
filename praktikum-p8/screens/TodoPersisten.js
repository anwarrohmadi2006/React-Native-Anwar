import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Platform } from 'react-native';
import { useLocalData } from '../hooks/useLocalData';

export default function TodoPersisten() {
  const { data: todos, isLoading, updateData: setTodos } = useLocalData('@todos_list', []);
  const [input, setInput] = useState('');

  const tambah = () => {
    if (!input.trim()) return;
    const baru = { id: Date.now().toString(), teks: input.trim(), selesai: false };
    setTodos([...todos, baru]);
    setInput('');
  };

  const toggle = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)));
  };

  const hapus = (id) => {
    if (Platform.OS === 'web') {
      const isConfirm = window.confirm('Yakin hapus tugas ini?');
      if (isConfirm) {
        setTodos(todos.filter((t) => t.id !== id));
      }
    } else {
      Alert.alert('Hapus', 'Yakin hapus tugas ini?', [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => setTodos(todos.filter((t) => t.id !== id)),
        },
      ]);
    }
  };

  if (isLoading)
    return (
      <View style={styles.tengah}>
        <Text>Memuat...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>
        Tugas Saya ({todos.filter((t) => !t.selesai).length} tersisa)
      </Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Tambah tugas baru..."
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
          <View style={[styles.item, item.selesai && styles.itemSelesai]}>
            <TouchableOpacity onPress={() => toggle(item.id)} style={{ flex: 1 }}>
              <Text style={[styles.itemTeks, item.selesai && styles.itemTeksSelesai]}>
                {item.selesai ? '[OK] ' : '[ ] '}
                {item.teks}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => hapus(item.id)}>
              <Text style={styles.tombolHapus}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.kosong}>Belum ada tugas. Tambahkan di atas!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  tengah: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  judul: { fontWeight: 'bold', fontSize: 22, color: '#1F4E79', marginBottom: 16 },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15
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
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
  },
  itemSelesai: { backgroundColor: '#E8F5E9', opacity: 0.8 },
  itemTeks: { fontSize: 15, color: '#333' },
  itemTeksSelesai: { textDecorationLine: 'line-through', color: '#AAA' },
  tombolHapus: { color: '#D32F2F', fontWeight: '600', fontSize: 13 },
  kosong: { textAlign: 'center', marginTop: 40, fontStyle: 'italic', color: '#888' },
});
