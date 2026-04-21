import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HalamanProfil = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <Text style={styles.avatarEmoji}>👨‍💻</Text>
        <Text style={styles.namaText}>Anwar Rohmadi</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Mahasiswa Aktif</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>📌 Data Diri</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>🪪</Text>
          <View>
            <Text style={styles.infoLabel}>NIM</Text>
            <Text style={styles.infoValue}>247411027</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>🎓</Text>
          <View>
            <Text style={styles.infoLabel}>Program Studi</Text>
            <Text style={styles.infoValue}>Data Science</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>🏫</Text>
          <View>
            <Text style={styles.infoLabel}>Perguruan Tinggi</Text>
            <Text style={styles.infoValue}>Politeknik Caltex Riau</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📅</Text>
          <View>
            <Text style={styles.infoLabel}>Tahun Masuk</Text>
            <Text style={styles.infoValue}>2024</Text>
          </View>
        </View>
      </View>

      <View style={styles.skillCard}>
        <Text style={styles.sectionTitle}>⚡ Keahlian</Text>
        <View style={styles.skillsWrap}>
          {['React Native', 'Python', 'Machine Learning', 'SQL', 'Data Analysis'].map((skill, i) => (
            <View key={i} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HalamanProfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  content: {
    padding: 20,
  },
  profileHeader: {
    backgroundColor: '#1F4E79',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  avatarEmoji: {
    fontSize: 70,
    marginBottom: 10,
  },
  namaText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#2E86AB',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F4E79',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  infoIcon: {
    fontSize: 22,
    marginRight: 14,
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  skillCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#EAF2FB',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#BDD7EE',
  },
  skillText: {
    color: '#1F4E79',
    fontWeight: '600',
    fontSize: 13,
  },
});
