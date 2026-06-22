import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Komponen anak untuk demonstrasi unmount
function KomponenAnak({ nama }) {
  // MOUNT: Dijalankan sekali saat komponen muncul
  useEffect(() => {
    console.log(`[${nama}] MOUNT: Komponen muncul`);
    
    // UNMOUNT: Dijalankan saat komponen dihapus
    return () => {
      console.log(`[${nama}] UNMOUNT: Komponen dihapus`);
    };
  }, []);

  // UPDATE: Dijalankan setiap kali 'nama' berubah
  useEffect(() => {
    console.log(`[${nama}] UPDATE: nama berubah menjadi '${nama}'`);
  }, [nama]);

  return (
    <View style={styles.kotak}>
      <Text style={styles.teks}>Komponen: {nama}</Text>
    </View>
  );
}

export default function DemoLifecycle() {
  const [tampil, setTampil] = useState(true);
  const [nama, setNama] = useState('Alpha');

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>Demo Lifecycle</Text>
      
      {tampil && <KomponenAnak nama={nama} />}
      
      <TouchableOpacity 
        style={styles.tombol}
        onPress={() => setTampil(!tampil)}
      >
        <Text style={styles.tombolTeks}>
          {tampil ? 'Unmount Komponen' : 'Mount Komponen'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tombol}
        onPress={() => setNama(nama === 'Alpha' ? 'Beta' : 'Alpha')}
      >
        <Text style={styles.tombolTeks}>Ubah Nama (Trigger Update)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 30 },
  judul: { fontSize: 22, fontWeight: 'bold', color: '#1F4E79', marginBottom: 20 },
  kotak: { backgroundColor: '#DAEEF3', borderRadius: 10, padding: 16, marginBottom: 16 },
  teks: { fontSize: 16, color: '#1F4E79', fontWeight: 'bold' },
  tombol: { backgroundColor: '#2E75B6', borderRadius: 8, padding: 12, marginBottom: 10, alignItems: 'center' },
  tombolTeks: { color: '#FFF', fontWeight: 'bold' },
});
