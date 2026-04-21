import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HalamanTentang = () => {
  const features = [
    { emoji: '📌', title: 'Stack Navigator', desc: 'Navigasi antar layar dengan passing parameter' },
    { emoji: '📑', title: 'Bottom Tab Navigator', desc: 'Perpindahan halaman via tab bawah' },
    { emoji: '☰', title: 'Drawer Navigator', desc: 'Menu samping untuk navigasi utama' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroSection}>
        <Text style={styles.heroEmoji}>ℹ️</Text>
        <Text style={styles.heroTitle}>Tentang Aplikasi</Text>
        <Text style={styles.heroVersion}>Versi 1.0.0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📱 Deskripsi</Text>
        <Text style={styles.cardText}>
          Aplikasi ini dibuat sebagai bagian dari Praktikum Pemrograman Mobile Pertemuan 3.
          Fokus utama materi adalah implementasi berbagai jenis Navigator pada React Native menggunakan
          React Navigation v6.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>✨ Fitur Navigasi</Text>
        {features.map((item, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureEmoji}>{item.emoji}</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>👨‍🎓 Pembuat</Text>
        <Text style={styles.cardText}>Anwar Rohmadi — NIM: 247411027</Text>
        <Text style={styles.cardText}>Program Studi Data Science</Text>
        <Text style={styles.cardText}>Politeknik Caltex Riau — 2024</Text>
      </View>
    </ScrollView>
  );
};

export default HalamanTentang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  content: {
    padding: 20,
  },
  heroSection: {
    backgroundColor: '#1F4E79',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  heroEmoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  heroVersion: {
    fontSize: 13,
    color: '#BDD7EE',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F4E79',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
    marginBottom: 4,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: 14,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    color: '#666',
  },
});
