import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function HalamanProfil() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.nama}>Nama Mahasiswa</Text>
          <Text style={styles.nim}>NIM: 123456789</Text>
        </View>
      </View>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.inisial}>NM</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>10</Text>
          <Text style={styles.statLabel}>Mata Kuliah</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>120</Text>
          <Text style={styles.statLabel}>SKS</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>3.85</Text>
          <Text style={styles.statLabel}>IPK</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Program Studi:</Text>
          <Text style={styles.infoValue}>Teknik Informatika</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Semester:</Text>
          <Text style={styles.infoValue}>5</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>mahasiswa@example.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>No. HP:</Text>
          <Text style={styles.infoValue}>081234567890</Text>
        </View>
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#002C5E', // Biru gelap
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  nama: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nim: {
    fontSize: 16,
    color: '#D0E3F5',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -50, // Agar menimpa header
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2E75B6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 4, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inisial: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F4E79',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    flex: 2,
    textAlign: 'right',
  },
});
