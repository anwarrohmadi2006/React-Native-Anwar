import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PreferencesContext } from '../context/PreferencesContext';

export default function HalamanUtama({ session, onLogout }) {
  const navigation = useNavigation();
  const { getTheme, getFontSize } = useContext(PreferencesContext);

  const theme = getTheme();
  const welcomeFontSize = getFontSize(18);
  const userFontSize = getFontSize(28);
  const menuFontSize = getFontSize(18);

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBg }]}>
      <View style={styles.header}>
        <Text style={[styles.welcomeTeks, { color: theme.text, fontSize: welcomeFontSize }]}>Selamat Datang,</Text>
        <Text style={[styles.usernameTeks, { color: theme.textPrimary, fontSize: userFontSize }]}>{session?.username || 'User'}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.menuTombol, { backgroundColor: theme.cardBg, borderColor: theme.borderColor }]}
          onPress={() => navigation.navigate('TodoPersisten')}
        >
          <Text style={[styles.menuTeks, { color: theme.text, fontSize: menuFontSize }]}>Aplikasi Tugas (Todo List)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuTombol, { backgroundColor: theme.cardBg, borderColor: theme.borderColor }]}
          onPress={() => navigation.navigate('Pengaturan')}
        >
          <Text style={[styles.menuTeks, { color: theme.text, fontSize: menuFontSize }]}>Pengaturan Preferensi</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutTombol} onPress={onLogout}>
        <Text style={[styles.logoutTeks, { fontSize: getFontSize(16) }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  welcomeTeks: {},
  usernameTeks: {
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
  },
  menuTombol: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuTeks: {
    fontWeight: '600',
  },
  logoutTombol: {
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutTeks: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
