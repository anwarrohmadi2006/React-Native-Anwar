import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const dataMahasiswa = [
  { id: '1', nama: 'Anwar Rohmadi', nim: '247411027', prodi: 'Data Science' },
  { id: '2', nama: 'Budi Santoso', nim: '247411028', prodi: 'Teknik Informatika' },
  { id: '3', nama: 'Citra Dewi', nim: '247411029', prodi: 'Sistem Informasi' },
  { id: '4', nama: 'Dani Pratama', nim: '247411030', prodi: 'Data Science' },
  { id: '5', nama: 'Eka Wulandari', nim: '247411031', prodi: 'Teknik Komputer' },
];

const HalamanHome = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { mahasiswa: item })}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.avatar}>👤</Text>
        <View style={styles.cardBody}>
          <Text style={styles.nama}>{item.nama}</Text>
          <Text style={styles.nim}>NIM: {item.nim}</Text>
          <Text style={styles.prodi}>{item.prodi}</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>📋 Daftar Mahasiswa</Text>
        <Text style={styles.headerSubtitle}>Tap kartu untuk melihat detail</Text>
      </View>
      <FlatList
        data={dataMahasiswa}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HalamanHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  headerBox: {
    backgroundColor: '#1F4E79',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#BDD7EE',
    marginTop: 4,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 6,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 36,
    marginRight: 14,
  },
  cardBody: {
    flex: 1,
  },
  nama: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4E79',
    marginBottom: 4,
  },
  nim: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  prodi: {
    fontSize: 13,
    color: '#2E86AB',
    fontStyle: 'italic',
  },
  arrow: {
    fontSize: 28,
    color: '#1F4E79',
    fontWeight: 'bold',
  },
});
