import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useFetch } from '../hooks/useFetch';

// Simulasi data dari API
const simulasiFetchMahasiswa = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', nama: 'Andi Wijaya', nim: '20230001', ipk: 3.85 },
        { id: '2', nama: 'Sari Indah', nim: '20230002', ipk: 3.72 },
        { id: '3', nama: 'Budi Santoso', nim: '20230003', ipk: 3.60 },
        { id: '4', nama: 'Dewi Rahayu', nim: '20230004', ipk: 3.91 },
        { id: '5', nama: 'Eko Prasetyo', nim: '20230005', ipk: 3.45 },
        { id: '6', nama: 'John Doe', nim: '20230006', ipk: 3.80 },
        { id: '7', nama: 'Mei Ling', nim: '20230007', ipk: 3.95 },
        { id: '8', nama: 'Ahmed Hassan', nim: '20230008', ipk: 3.55 },
      ]);
    }, 1500); // Simulasi delay jaringan
  });
};

export default function DaftarMahasiswaAsync() {
  const { data, isLoading, error, refresh } = useFetch(simulasiFetchMahasiswa);

  if (isLoading) return (
    <View style={styles.tengah}>
      <ActivityIndicator size="large" color="#2E75B6" />
      <Text style={styles.loadingTeks}>Memuat data mahasiswa...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.tengah}>
      <Text style={styles.errorTeks}>{error}</Text>
      <TouchableOpacity style={styles.tombol} onPress={refresh}>
        <Text style={styles.tombolTeks}>Coba Lagi</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.judul}>Daftar Mahasiswa</Text>
        <TouchableOpacity onPress={refresh}>
          <Text style={styles.refresh}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nama}>{item.nama}</Text>
            <Text style={styles.nim}>{item.nim}</Text>
            <Text style={styles.ipk}>IPK: {item.ipk}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingBottom: 20 },
  tengah: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  judul: { fontSize: 22, fontWeight: 'bold', color: '#1F4E79' },
  refresh: { color: '#2E75B6', fontWeight: '600' },
  loadingTeks: { color: '#888', marginTop: 8 },
  errorTeks: { color: '#D32F2F', fontSize: 15, marginBottom: 12 },
  item: { backgroundColor: '#FFF', padding: 14, marginHorizontal: 16, marginBottom: 8, borderRadius: 10, elevation: 1 },
  nama: { fontSize: 15, fontWeight: 'bold', color: '#1F4E79' },
  nim: { fontSize: 12, color: '#888', marginTop: 2 },
  ipk: { fontSize: 13, color: '#2E75B6', marginTop: 4, fontWeight: '600' },
  tombol: { backgroundColor: '#2E75B6', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 10 },
  tombolTeks: { color: '#FFF', fontWeight: 'bold' },
});
