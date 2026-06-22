import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ email, onLogout }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Praktikum P5: Form & Validasi</Text>
        <Text style={styles.subHeader}>Pemrograman Perangkat Bergerak</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Identitas Mahasiswa</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nama</Text>
          <Text style={styles.value}>Anwar Rohmadi</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>NIM</Text>
          <Text style={styles.value}>20210801xxx</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Program Studi</Text>
          <Text style={styles.value}>Teknik Informatika</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Login Sebagai</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Aplikasi ini telah diimplementasikan dengan fitur validasi real-time, 
          multi-step navigation, dan manajemen keyboard yang optimal sesuai dengan Modul Praktikum P5.
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={onLogout}
      >
        <Text style={styles.buttonText}>Keluar / Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>© 2026 Mobile Programming Project</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F8F9FA', alignItems: 'center' },
  header: { marginBottom: 30, alignItems: 'center' },
  welcome: { fontSize: 26, fontWeight: 'bold', color: '#1F4E79', textAlign: 'center' },
  subHeader: { fontSize: 16, color: '#666', marginTop: 5 },
  card: { backgroundColor: '#FFF', width: '100%', borderRadius: 15, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F4E79', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { fontSize: 14, color: '#888', fontWeight: '500' },
  value: { fontSize: 14, color: '#333', fontWeight: 'bold' },
  infoBox: { padding: 15, backgroundColor: '#E3F2FD', borderRadius: 10, marginBottom: 30 },
  infoText: { fontSize: 14, color: '#1F4E79', lineHeight: 20, textAlign: 'center' },
  button: { backgroundColor: '#D32F2F', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 40, elevation: 2 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  footer: { marginTop: 40, fontSize: 12, color: '#BBB' }
});
