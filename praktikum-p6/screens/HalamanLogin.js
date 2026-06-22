import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { PreferencesContext } from '../context/PreferencesContext';

export default function HalamanLogin({ onLoginBerhasil }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { getTheme, getFontSize } = useContext(PreferencesContext);

  const theme = getTheme();
  const titleFontSize = getFontSize(28);
  const inputFontSize = getFontSize(16);
  const btnFontSize = getFontSize(18);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username dan Password tidak boleh kosong');
      return;
    }
    
    // Simulasi login sukses
    const userData = { id: '1', username: username, role: 'student' };
    onLoginBerhasil(userData);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.containerBg }]}>
      <Text style={[styles.judul, { color: theme.textPrimary, fontSize: titleFontSize }]}>Login E-Kampus</Text>
      
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.borderColor, color: theme.text, fontSize: inputFontSize }]}
        placeholder="Username"
        placeholderTextColor={theme.text + '80'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.borderColor, color: theme.text, fontSize: inputFontSize }]}
        placeholder="Password"
        placeholderTextColor={theme.text + '80'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.tombol} onPress={handleLogin}>
        <Text style={[styles.tombolTeks, { fontSize: btnFontSize }]}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  judul: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  tombol: {
    backgroundColor: '#2E75B6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  tombolTeks: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
