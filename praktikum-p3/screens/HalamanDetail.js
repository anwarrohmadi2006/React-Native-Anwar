import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HalamanDetail = ({ route, navigation }) => {
  const { mahasiswa } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
        <Text style={styles.avatarBig}>👤</Text>
        <Text style={styles.namaText}>{mahasiswa.nama}</Text>
        <Text style={styles.prodiBadge}>{mahasiswa.prodi}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Informasi Mahasiswa</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nama Lengkap</Text>
          <Text style={styles.infoValue}>{mahasiswa.nama}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>NIM</Text>
          <Text style={styles.infoValue}>{mahasiswa.nim}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Program Studi</Text>
          <Text style={styles.infoValue}>{mahasiswa.prodi}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Kembali ke Daftar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HalamanDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#1F4E79',
    width: '100%',
    borderRadius: 16,
    alignItems: 'center',
    padding: 30,
    marginBottom: 20,
    elevation: 4,
  },
  avatarBig: {
    fontSize: 64,
    marginBottom: 12,
  },
  namaText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  prodiBadge: {
    backgroundColor: '#2E86AB',
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4E79',
    marginBottom: 16,
  },
  infoRow: {
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
  },
  backButton: {
    backgroundColor: '#1F4E79',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
