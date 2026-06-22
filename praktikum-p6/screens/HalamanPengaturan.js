import React, { useContext } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { PreferencesContext } from '../context/PreferencesContext';

export default function HalamanPengaturan() {
  const { prefs, updatePrefs, getTheme, getFontSize, isLoading } = useContext(PreferencesContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const theme = getTheme();
  const baseFontSize = 16;
  const currentFontSize = getFontSize(baseFontSize);
  const titleFontSize = getFontSize(24);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.judul, { color: theme.text, fontSize: titleFontSize }]}>Pengaturan</Text>

      {/* Dark Mode */}
      <View style={[styles.baris, { borderBottomColor: theme.borderColor }]}>
        <Text style={[styles.label, { color: theme.text, fontSize: currentFontSize }]}>Mode Gelap</Text>
        <Switch
          value={prefs.temaDarkMode}
          onValueChange={(v) => updatePrefs('temaDarkMode', v)}
          trackColor={{ false: '#CCC', true: '#2E75B6' }}
        />
      </View>

      {/* Notifikasi */}
      <View style={[styles.baris, { borderBottomColor: theme.borderColor }]}>
        <Text style={[styles.label, { color: theme.text, fontSize: currentFontSize }]}>Notifikasi Push</Text>
        <Switch
          value={prefs.notifikasi}
          onValueChange={(v) => updatePrefs('notifikasi', v)}
          trackColor={{ false: '#CCC', true: '#2E75B6' }}
        />
      </View>

      {/* Pilihan Ukuran Font */}
      <Text style={[styles.label, { color: theme.text, fontSize: currentFontSize, marginTop: 16 }]}>Ukuran Font</Text>
      <View style={styles.chipRow}>
        {['kecil', 'sedang', 'besar'].map((uk) => (
          <TouchableOpacity
            key={uk}
            style={[styles.chip, { borderColor: theme.borderColor }, prefs.ukuranFont === uk && styles.chipAktif]}
            onPress={() => updatePrefs('ukuranFont', uk)}
          >
            <Text
              style={[
                prefs.ukuranFont === uk ? styles.chipTeksAktif : { color: theme.text },
                { fontSize: getFontSize(14) }
              ]}
            >
              {uk.charAt(0).toUpperCase() + uk.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  judul: { fontWeight: 'bold', marginBottom: 24 },
  baris: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  label: {},
  chipRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  chip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipAktif: { borderColor: '#1F4E79', backgroundColor: '#1F4E79' },
  chipTeksAktif: { color: '#FFF', fontWeight: 'bold' },
});
