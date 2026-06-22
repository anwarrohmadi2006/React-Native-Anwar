import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDebounce } from '../hooks/useDebounce';

// Simulasi pencarian ke API
const simulasiCari = (query) => {
  const semuaData = [
    'Pemrograman Mobile', 'Pemrograman Web', 'Basis Data',
    'Kecerdasan Buatan', 'Jaringan Komputer', 'Sistem Operasi',
    'Algoritma & Struktur Data', 'Rekayasa Perangkat Lunak',
    'Machine Learning', 'Deep Learning', 'Analisis Big Data',
    'Statistika Elementer', 'Matematika Diskrit', 'Data Mining',
    'Visualisasi Data', 'Natural Language Processing'
  ];
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(semuaData.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      ));
    }, 500);
  });
};

export default function SearchDebounce() {
  const [query, setQuery] = useState('');
  const [hasil, setHasil] = useState([]);
  const [isSearching, setSearch] = useState(false);

  // Menggunakan custom hook useDebounce
  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    // Jangan cari jika query kosong
    if (!debouncedQuery.trim()) {
      setHasil([]);
      setSearch(false);
      return;
    }

    let isMounted = true;
    setSearch(true);

    const fetchData = async () => {
      const data = await simulasiCari(debouncedQuery);
      if (isMounted) {
        setHasil(data);
        setSearch(false);
      }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [debouncedQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>Cari Mata Kuliah</Text>
      
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          if (text.trim()) setSearch(true); // Tampilkan loading saat mulai mengetik
        }}
        placeholder="Ketik nama mata kuliah..."
      />
      
      {isSearching && (
        <View style={styles.searching}>
          <ActivityIndicator size="small" color="#2E75B6" />
          <Text style={styles.searchingTeks}>Mencari...</Text>
        </View>
      )}
      
      <FlatList
        data={hasil}
        keyExtractor={(item, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTeks}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          !isSearching && query.trim() ? (
            <Text style={styles.kosong}>Tidak ada hasil untuk '{query}'</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  judul: { fontSize: 22, fontWeight: 'bold', color: '#1F4E79', marginBottom: 16 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 12, fontSize: 15, marginBottom: 12 },
  searching: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  searchingTeks: { color: '#888', fontSize: 13 },
  item: { backgroundColor: '#FFF', padding: 14, borderRadius: 8, marginBottom: 6, elevation: 1 },
  itemTeks: { fontSize: 15, color: '#1F4E79' },
  kosong: { textAlign: 'center', color: '#AAA', marginTop: 20, fontStyle: 'italic' },
});
