import { StyleSheet, Text, ScrollView, View } from 'react-native'; 
import KartuProfil from './components/KartuProfil'; 
  
export default function App_Praktikum_B() { 
  return ( 
    <ScrollView style={styles.container}> 
      <Text style={styles.judul}>Daftar Mahasiswa</Text> 
      <KartuProfil 
        nama='Anwar' 
        nim='20230001' 
        prodi='Teknik Informatika' 
        angkatan='2023' 
      /> 
      <KartuProfil 
        nama='Teman Sekelas' 
        nim='20230002' 
        prodi='Teknik Informatika' 
        angkatan='2023' 
      /> 
      <KartuProfil 
        nama='Mahasiswa Lain' 
        nim='20230003' 
        prodi='Sistem Informasi' 
        angkatan='2022' 
      /> 
      <KartuProfil 
        nama='Andi Pratama' 
        nim='20230004' 
        prodi='Teknik Komputer' 
        angkatan='2024' 
      /> 
      {/* Jarak bawah */}
      <View style={{ height: 40 }} />
    </ScrollView> 
  ); 
} 
  
const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50 }, 
  judul: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', 
           color: '#1F4E79', marginBottom: 12 }, 
});
