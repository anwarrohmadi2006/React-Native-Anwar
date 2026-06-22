import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // import ini kalau ingin polling berhenti saat layar tidak fokus

export default function DashboardPolling() {
  const [data, setData] = useState(null);
  const [pollingAktif, setPolling] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [hitungPolling, setHitung] = useState(0);
  const [countdown, setCountdown] = useState(5);

  const fetchDataTerbaru = useCallback(async () => {
    const simulasiData = {
      totalMahasiswa: Math.floor(Math.random() * 50) + 150,
      mahasiswaAktif: Math.floor(Math.random() * 30) + 100,
      rataIPK: (Math.random() * 0.5 + 3.3).toFixed(2),
    };
    setData(simulasiData);
    setLastUpdate(new Date().toLocaleTimeString('id-ID'));
    setHitung(h => h + 1);
  }, []);

  useEffect(() => {
    if (!pollingAktif) return;
    
    // Fetch pertama kali segera
    fetchDataTerbaru();
    
    // Uji cleanup interval log
    console.log('Effect: mulai interval');
    
    setCountdown(5);
    const tick = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { 
          fetchDataTerbaru(); 
          return 5; 
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      console.log('Cleanup: interval dihentikan');
      clearInterval(tick);
    };
  }, [pollingAktif, fetchDataTerbaru]);

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>Dashboard Realtime</Text>
      
      <View style={styles.kontrolPolling}>
        <Text style={styles.labelPolling}>Auto Refresh (5 detik)</Text>
        <Switch 
          value={pollingAktif} 
          onValueChange={setPolling}
          trackColor={{ false: '#CCC', true: '#2E75B6' }} 
        />
      </View>
      
      {data && (
        <View style={styles.grid}>
          <View style={[styles.kartu, { backgroundColor: '#DAEEF3' }]}>
            <Text style={styles.kartuAngka}>{data.totalMahasiswa}</Text>
            <Text style={styles.kartuLabel}>Total Mahasiswa</Text>
          </View>
          <View style={[styles.kartu, { backgroundColor: '#E2EFDA' }]}>
            <Text style={styles.kartuAngka}>{data.mahasiswaAktif}</Text>
            <Text style={styles.kartuLabel}>Aktif</Text>
          </View>
          <View style={[styles.kartu, { backgroundColor: '#FFF2CC' }]}>
            <Text style={styles.kartuAngka}>{data.rataIPK}</Text>
            <Text style={styles.kartuLabel}>Rata-rata IPK</Text>
          </View>
        </View>
      )}

      {pollingAktif && (
        <Text style={styles.countdown}>Refresh dalam {countdown} detik</Text>
      )}
      
      <Text style={styles.infoPolling}>
        {pollingAktif ? 'Auto refresh aktif' : 'Auto refresh dimatikan'}
        {lastUpdate ? ` | Update: ${lastUpdate}` : ''}
        {' | Refresh ke-'}{hitungPolling}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 30, backgroundColor: '#F5F5F5' },
  judul: { fontSize: 22, fontWeight: 'bold', color: '#1F4E79', marginBottom: 16 },
  kontrolPolling: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 14, borderRadius: 10, marginBottom: 16 },
  labelPolling: { fontSize: 15, color: '#333' },
  grid: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  kartu: { flex: 1, borderRadius: 12, padding: 16, alignItems: 'center' },
  kartuAngka: { fontSize: 28, fontWeight: 'bold', color: '#1F4E79' },
  kartuLabel: { fontSize: 12, color: '#666', marginTop: 4, textAlign: 'center' },
  infoPolling: { fontSize: 12, color: '#888', textAlign: 'center', fontStyle: 'italic', marginTop: 10 },
  countdown: { fontSize: 16, color: '#E53935', textAlign: 'center', fontWeight: 'bold', marginVertical: 10 }
});
