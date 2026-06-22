
// components/KartuProfil.js 
import { StyleSheet, Text, View } from 'react-native'; 
  
export default function KartuProfil({ nama, nim, prodi, angkatan }) { 
  return ( 
    <View style={styles.kartu}> 
      <Text style={styles.nama}>{nama}</Text> 
      <Text style={styles.info}>NIM    : {nim}</Text> 
      <Text style={styles.info}>Prodi  : {prodi}</Text> 
      <Text style={styles.info}>Angkatan: {angkatan}</Text> 
    </View> 
  ); 
} 
  
const styles = StyleSheet.create({ 
  kartu: { 
    borderWidth: 1, 
    borderColor: '#2E75B6', 
    borderRadius: 12, 
    padding: 16, 
    margin: 8, 
    backgroundColor: '#f0f8ff', 
  }, 
  nama: { fontSize: 18, fontWeight: 'bold', color: '#1F4E79', marginBottom: 6 
}, 
  info: { fontSize: 14, color: '#444', marginBottom: 2 }, 
}); 