import { StyleSheet, Text, View } from 'react-native'; 

export default function KartuProfil({ nama, nim, prodi, angkatan }) { 
  return ( 
    <View style={styles.kartu}> 
      <Text style={styles.nama}>{nama}</Text> 
      <View style={styles.garisPemisah} />
      <Text style={styles.info}>NIM    : {nim}</Text> 
      <Text style={styles.info}>Prodi  : {prodi}</Text> 
      <Text style={styles.info}>Angkatan: {angkatan}</Text> 
    </View> 
  ); 
} 

const styles = StyleSheet.create({ 
  kartu: { 
    borderWidth: 2, 
    borderColor: '#4CAF50', 
    borderRadius: 15, 
    padding: 20, 
    margin: 10, 
    backgroundColor: '#E8F5E9', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }, 
  nama: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32', marginBottom: 6 }, 
  info: { fontSize: 15, color: '#333', marginBottom: 4 }, 
  garisPemisah: {
    height: 1,
    backgroundColor: '#A5D6A7',
    marginVertical: 8,
  }
});
