import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { postService } from '../services/postService';

export default function TestAPI() {
  useEffect(() => {
    const testAll = async () => {
      try {
        // Uji GET semua
        const posts = await postService.getAll(1, 5);
        console.log('GET All:', posts.length, 'posts');

        // Uji GET by ID
        const post = await postService.getById(1);
        console.log('GET ById:', post.title);

        // Uji POST
        const baru = await postService.create({ 
          title: 'Test', 
          body: 'Isi test', 
          userId: 1 
        });
        console.log('POST Create - ID baru:', baru.id);

        // Uji DELETE
        const berhasil = await postService.delete(1);
        console.log('DELETE:', berhasil ? 'sukses' : 'gagal');
      } catch (error) {
        console.error('Error in TestAPI:', error);
      }
    };

    testAll();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Test API sedang berjalan...</Text>
      <Text>Silakan periksa terminal (console) Expo Anda.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
