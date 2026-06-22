import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HalamanEksplorasi = () => {
  const items = [
    { emoji: '🏔️', label: 'Alam & Petualangan' },
    { emoji: '🎨', label: 'Seni & Budaya' },
    { emoji: '🔬', label: 'Sains & Teknologi' },
    { emoji: '🎵', label: 'Musik & Hiburan' },
    { emoji: '📚', label: 'Literasi & Edukasi' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.heroBox}>
        <Text style={styles.heroEmoji}>🧭</Text>
        <Text style={styles.heroTitle}>Halaman Eksplorasi</Text>
        <Text style={styles.heroSub}>Temukan hal-hal menarik baru</Text>
      </View>

      <View style={styles.grid}>
        {items.map((item, index) => (
          <View key={index} style={styles.gridItem}>
            <Text style={styles.gridEmoji}>{item.emoji}</Text>
            <Text style={styles.gridLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default HalamanEksplorasi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  heroBox: {
    backgroundColor: '#1F4E79',
    padding: 30,
    alignItems: 'center',
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
  heroSub: {
    fontSize: 14,
    color: '#BDD7EE',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  gridItem: {
    backgroundColor: '#FFFFFF',
    width: '47%',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  gridEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F4E79',
    textAlign: 'center',
  },
});
