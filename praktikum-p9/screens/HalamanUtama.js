import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

export default function HalamanUtama() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Selamat datang,</Text>
      <Text style={styles.name}>{user?.user_metadata?.nama_lengkap || 'User'}</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Email: {user?.email}</Text>
        <Text style={styles.infoText}>ID: {user?.id}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => supabase.auth.signOut()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  welcome: { fontSize: 18, color: '#666' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  infoBox: { backgroundColor: '#fff', padding: 20, borderRadius: 8, width: '100%', marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  infoText: { fontSize: 14, color: '#555', marginBottom: 5 },
  button: { backgroundColor: '#e74c3c', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
