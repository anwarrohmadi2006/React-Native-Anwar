import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  ActivityIndicator, Alert, StyleSheet, RefreshControl, TextInput, Platform
} from 'react-native';
import { postService } from '../services/postService';
import { useDebounce } from '../hooks/useDebounce'; // Pastikan file hook ini sudah ada dari P7

export default function DaftarPost({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const [halamanSaatIni, setHalaman] = useState(1);
  const [loadingLebih, setLoadingLebih] = useState(false);
  const [query, setQuery] = useState('');
  
  const debouncedQuery = useDebounce(query, 400);

  const fetchPosts = useCallback(async (halaman = 1, append = false) => {
    try {
      if (halaman === 1) setLoading(true);
      else setLoadingLebih(true);
      setError(null);
      
      const data = await postService.getAll(halaman, 10);
      setPosts(prev => append ? [...prev, ...data] : data);
      setHalaman(halaman);
    } catch (e) {
      if (!e.response) {
        setError('Tidak ada koneksi internet. Periksa jaringan Anda.');
      } else if (e.code === 'ECONNABORTED') {
        setError('Koneksi timeout. Server tidak merespons.');
      } else {
        setError(`Error ${e.response.status}: ${e.response.data?.message || 'Terjadi kesalahan'}`);
      }
    } finally {
      setLoading(false);
      setRefresh(false);
      setLoadingLebih(false);
    }
  }, []);

  useEffect(() => { 
    fetchPosts(1); 
  }, [fetchPosts]);

  const handleRefresh = () => {
    setRefresh(true);
    fetchPosts(1);
  };

  const handleEndReached = () => {
    // Jangan load lebih jika sedang search filter agar pagination API tak bingung
    if (!loadingLebih && debouncedQuery === '') {
      fetchPosts(halamanSaatIni + 1, true);
    }
  };

  const handleHapus = (id) => {
    const prosesHapus = async () => {
      try {
        await postService.delete(id);
        setPosts(prev => prev.filter(p => p.id !== id));
        if (Platform.OS === 'web') window.alert('Post berhasil dihapus');
        else Alert.alert('Berhasil', 'Post berhasil dihapus');
      } catch {
        if (Platform.OS === 'web') window.alert('Tidak bisa menghapus post');
        else Alert.alert('Gagal', 'Tidak bisa menghapus post');
      }
    };

    if (Platform.OS === 'web') {
      const yakin = window.confirm('Yakin ingin menghapus post ini?');
      if (yakin) prosesHapus();
    } else {
      Alert.alert('Hapus Post', 'Yakin ingin menghapus post ini?', [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: prosesHapus },
      ]);
    }
  };

  const postsTampil = posts.filter(p =>
    p.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  if (isLoading && halamanSaatIni === 1) return (
    <View style={styles.tengah}>
      <ActivityIndicator size='large' color='#2E75B6' />
      <Text style={styles.loadingTeks}>Memuat post...</Text>
    </View>
  );

  if (error && posts.length === 0) return (
    <View style={styles.tengah}>
      <Text style={styles.errorTeks}>{error}</Text>
      <TouchableOpacity style={styles.tombolRetry} onPress={() => fetchPosts(1)}>
        <Text style={styles.tombolRetryTeks}>Coba Lagi</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari judul post..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={postsTampil}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.kartu} 
            onPress={() => navigation.navigate('DetailPost', { postId: item.id })}
          >
            <Text style={styles.kartuJudul} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.kartuIsi} numberOfLines={2}>{item.body}</Text>
            <TouchableOpacity onPress={() => handleHapus(item.id)}>
              <Text style={styles.hapusTeks}>Hapus</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={['#2E75B6']} />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={loadingLebih ? <ActivityIndicator color='#2E75B6' style={{ padding: 16 }} /> : null}
        contentContainerStyle={{ padding: 12 }}
      />
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('FormBuatPost')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  tengah: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingTeks: { color: '#888' },
  errorTeks: { color: '#D32F2F', textAlign: 'center', marginHorizontal: 24 },
  searchInput: {
    backgroundColor: '#FFF',
    margin: 12,
    marginBottom: 0,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  kartu: { backgroundColor: '#FFF', borderRadius: 10, padding: 14, marginBottom: 10, elevation: 2 },
  kartuJudul: { fontSize: 15, fontWeight: 'bold', color: '#1F4E79', marginBottom: 6 },
  kartuIsi: { fontSize: 13, color: '#555', marginBottom: 8 },
  hapusTeks: { color: '#D32F2F', fontSize: 13, fontWeight: '600', textAlign: 'right' },
  tombolRetry: { backgroundColor: '#2E75B6', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 10 },
  tombolRetryTeks: { color: '#FFF', fontWeight: 'bold' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2E75B6',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
