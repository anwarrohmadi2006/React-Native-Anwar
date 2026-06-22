import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';

const HalamanPengaturan = () => {
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dataSync, setDataSync] = useState(true);

  const settings = [
    {
      label: 'Notifikasi',
      desc: 'Aktifkan pemberitahuan push',
      emoji: '🔔',
      value: notifEnabled,
      onToggle: () => setNotifEnabled(!notifEnabled),
    },
    {
      label: 'Mode Gelap',
      desc: 'Tampilan layar gelap',
      emoji: '🌙',
      value: darkMode,
      onToggle: () => setDarkMode(!darkMode),
    },
    {
      label: 'Sinkronisasi Data',
      desc: 'Sinkron data otomatis',
      emoji: '☁️',
      value: dataSync,
      onToggle: () => setDataSync(!dataSync),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroSection}>
        <Text style={styles.heroEmoji}>⚙️</Text>
        <Text style={styles.heroTitle}>Pengaturan Aplikasi</Text>
        <Text style={styles.heroSub}>Sesuaikan aplikasi dengan preferensimu</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎛️ Preferensi</Text>
        {settings.map((item, index) => (
          <View key={index} style={[styles.settingRow, index < settings.length - 1 && styles.settingBorder]}>
            <Text style={styles.settingEmoji}>{item.emoji}</Text>
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Text style={styles.settingDesc}>{item.desc}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#DDD', true: '#2E86AB' }}
              thumbColor={item.value ? '#1F4E79' : '#AAA'}
            />
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🗂️ Akun</Text>
        {['Edit Profil', 'Ubah Kata Sandi', 'Bahasa'].map((menu, i) => (
          <TouchableOpacity key={i} style={[styles.menuRow, i < 2 && styles.settingBorder]}>
            <Text style={styles.menuText}>{menu}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>🚪  Keluar dari Akun</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HalamanPengaturan;

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
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  heroSub: {
    fontSize: 13,
    color: '#BDD7EE',
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
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingEmoji: {
    fontSize: 22,
    marginRight: 14,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 12,
    color: '#888',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  menuText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 20,
    color: '#1F4E79',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#C0392B',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
