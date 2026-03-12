import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Switch } from 'react-native';

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pesanError, setPesanError] = useState('');
  
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  
  const [ingatSaya, setIngatSaya] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setPesanError('');
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      
      // Validation
      if (!email.includes('@') || !email.includes('.')) {
        setPesanError('Email tidak valid. Harus mengandung @ dan .');
        return;
      }
      
      if (password.length < 6) {
        setPesanError('Password minimal 6 karakter');
        return;
      }
      
      Alert.alert('Berhasil', 'Login sukses!');
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Login</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, isEmailFocused && styles.inputFocused]}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          placeholder="Masukkan email"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, isPasswordFocused && styles.inputFocused]}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          placeholder="Masukkan password"
        />
      </View>

      <View style={styles.switchContainer}>
        <Switch
          value={ingatSaya}
          onValueChange={(val) => setIngatSaya(val)}
          trackColor={{ false: '#CCCCCC', true: '#2E75B6' }}
          thumbColor={ingatSaya ? '#1F4E79' : '#FFFFFF'}
        />
        <Text style={styles.switchLabel}>Ingat Saya</Text>
      </View>
      
      {pesanError ? <Text style={styles.errorText}>{pesanError}</Text> : null}

      <Pressable 
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isLoading && styles.buttonDisabled
        ]}
        onPress={handleLogin}
        onLongPress={() => Alert.alert('Info', 'Versi 1.0.0')}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Login'}</Text>
      </Pressable>
      
      <Pressable onPress={() => Alert.alert('Info', 'Silakan hubungi admin untuk reset password.')}>
        <Text style={styles.forgotPassword}>Lupa Password?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#002C5E',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
  },
  inputFocused: {
    borderColor: '#2E75B6',
    borderWidth: 2,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333333',
  },
  button: {
    backgroundColor: '#2E75B6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonPressed: {
    backgroundColor: '#1F4E79', // Ubah warna saat ditekan
  },
  buttonDisabled: {
    backgroundColor: '#A0C4E3',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  forgotPassword: {
    color: '#2E75B6',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
  },
});
