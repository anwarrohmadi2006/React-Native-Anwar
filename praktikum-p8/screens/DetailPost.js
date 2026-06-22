import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { postService } from '../services/postService';

export default function DetailPost({ route, navigation }) {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [komentar, setKomentar] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const muat = async () => {
      try {
        // Fetch post dan komentar secara bersamaan
        const [dataPost, dataKomentar] = await Promise.all([
          postService.getById(postId),
          postService.getComments(postId),
        ]);
        setPost(dataPost);
        setKomentar(dataKomentar);
      } catch (error) {
        Alert.alert('Error', 'Gagal memuat detail post.');
      } finally {
        setLoading(false);
      }
    };
    muat();
  }, [postId]);

  const handleHapus = () => {
    const prosesHapus = async () => {
      try {
        await postService.delete(postId);
        if (Platform.OS === 'web') window.alert('Post berhasil dihapus');
        else Alert.alert('Berhasil', 'Post berhasil dihapus');
        navigation.goBack();
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

  if (isLoading) {
    return (
      <View style={styles.tengah}>
        <ActivityIndicator size="large" color="#2E75B6" />
        <Text>Memuat detail...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.tengah}>
        <Text>Post tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.judul}>{post.title}</Text>
        <Text style={styles.isi}>{post.body}</Text>
        
        <View style={styles.aksiContainer}>
          <TouchableOpacity 
            style={styles.tombolEdit} 
            onPress={() => navigation.navigate('FormEditPost', { post })}
          >
            <Text style={styles.tombolTeks}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tombolHapus} onPress={handleHapus}>
            <Text style={styles.tombolTeks}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.komentarJudul}>Komentar ({komentar.length})</Text>
      <FlatList
        data={komentar}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.komentarItem}>
            <Text style={styles.komentarEmail}>{item.email}</Text>
            <Text style={styles.komentarNama}>{item.name}</Text>
            <Text style={styles.komentarIsi}>{item.body}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 16 },
  tengah: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  postContainer: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, marginBottom: 20, elevation: 2 },
  judul: { fontSize: 20, fontWeight: 'bold', color: '#1F4E79', marginBottom: 10 },
  isi: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 16 },
  aksiContainer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  tombolEdit: { backgroundColor: '#4CAF50', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  tombolHapus: { backgroundColor: '#F44336', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  tombolTeks: { color: '#FFF', fontWeight: 'bold' },
  komentarJudul: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  komentarItem: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginBottom: 10 },
  komentarEmail: { fontSize: 12, color: '#888', marginBottom: 4 },
  komentarNama: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  komentarIsi: { fontSize: 14, color: '#555' },
});
