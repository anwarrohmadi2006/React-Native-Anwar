import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ route, navigation }) {
  const { email } = route.params || { email: 'User' };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Selamat Datang!</Text>
      <Text style={styles.user}>{email}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' },
  welcome: { fontSize: 24, fontWeight: 'bold', color: '#1F4E79' },
  user: { fontSize: 18, color: '#666', marginVertical: 10 },
  button: { backgroundColor: '#D32F2F', padding: 12, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});
