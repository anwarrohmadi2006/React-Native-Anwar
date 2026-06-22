import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);

  // Fungsi untuk menambah nilai
  const handleTambah = () => {
    if (count >= 20) {
      Alert.alert('Peringatan!', 'Batas maksimum adalah 20!');
    } else {
      setCount(count + 1);
    }
  };

  // Fungsi untuk mengurangi nilai
  const handleKurang = () => {
    if (count <= 0) {
      Alert.alert('Peringatan!', 'Nilai tidak boleh di bawah 0!');
    } else {
      setCount(count - 1);
    }
  };

  // Fungsi untuk reset nilai
  const handleReset = () => {
    setCount(0);
  };

  // Logika Menentukan Status & Warna
  let statusText = '';
  let statusColor = '#4CAF50'; // Default Hijau untuk Rendah (0-5)

  if (count > 10) {
    statusText = 'Tinggi';
    statusColor = '#F44336'; // Merah
  } else if (count >= 6) {
    statusText = 'Sedang';
    statusColor = '#FF9800'; // Orange
  } else {
    statusText = 'Rendah';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplikasi Counter</Text>
      
      {/* Warna font angka berubah menjadi merah jika di atas 10 */}
      <Text style={[styles.counterValue, { color: count > 10 ? '#F44336' : '#2E7D32' }]}>
        {count}
      </Text>

      {/* Indikator Status Rendah/Sedang/Tinggi */}
      <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>Status: {statusText}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleKurang}>
          <Text style={styles.buttonText}>Kurang (-)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleTambah}>
          <Text style={styles.buttonText}>Tambah (+)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  counterValue: {
    fontSize: 60,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  statusBadge: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
