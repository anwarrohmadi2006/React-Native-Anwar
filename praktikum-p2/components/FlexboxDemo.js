import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'; 
  
// Komponen kotak kecil untuk eksperimen 
function Kotak({ warna, label }) { 
  return ( 
    <View style={[styles.kotak, { backgroundColor: warna }]}> 
      <Text style={styles.kotakTeks}>{label}</Text> 
    </View> 
  ); 
} 
  
// Komponen container eksperimen 
function Demo({ judul, containerStyle, children }) { 
  return ( 
    <View style={styles.demoWrapper}> 
      <Text style={styles.demoJudul}>{judul}</Text> 
      <View style={[styles.demoKonten, containerStyle]}> 
        {children ? children : (
          <>
            <Kotak warna='#2E75B6' label='A' /> 
            <Kotak warna='#1F4E79' label='B' /> 
            <Kotak warna='#BDD7EE' label='C' /> 
          </>
        )}
      </View> 
    </View> 
  ); 
} 
  
export default function FlexboxDemo() { 
  return ( 
    <ScrollView style={styles.layar}> 
      <Text style={styles.pageJudul}>Eksplorasi Flexbox</Text> 
  
      <Demo judul='1. column (default)' containerStyle={{ flexDirection: 'column' }} /> 
      <Demo judul='2. row' containerStyle={{ flexDirection: 'row' }} /> 
      <Demo judul='3. row + justifyContent: center' containerStyle={{ flexDirection: 'row', justifyContent: 'center' }} /> 
      <Demo judul='4. row + justifyContent: space-between' containerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }} /> 
      <Demo judul='5. row + justifyContent: space-around' containerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }} /> 
      <Demo judul='6. row + alignItems: flex-end' containerStyle={{ flexDirection: 'row', alignItems: 'flex-end', height: 100 }} /> 
      <Demo judul='7. row + alignItems: center' containerStyle={{ flexDirection: 'row', alignItems: 'center', height: 100 }} /> 
      
      <Demo judul='8. Eksperimen: flexWrap: wrap' containerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Kotak warna='#2E75B6' label='1' /> 
        <Kotak warna='#1F4E79' label='2' /> 
        <Kotak warna='#BDD7EE' label='3' /> 
        <Kotak warna='#2E75B6' label='4' /> 
        <Kotak warna='#1F4E79' label='5' /> 
        <Kotak warna='#BDD7EE' label='6' /> 
        <Kotak warna='#2E75B6' label='7' /> 
        <Kotak warna='#1F4E79' label='8' /> 
      </Demo>
      
      <Demo judul='9. Eksperimen: row + alignSelf pada B' containerStyle={{ flexDirection: 'row', height: 120, alignItems: 'center' }}>
        <Kotak warna='#2E75B6' label='A' /> 
        <View style={[styles.kotak, { backgroundColor: '#1F4E79', alignSelf: 'flex-start' }]}> 
          <Text style={styles.kotakTeks}>B</Text> 
        </View> 
        <Kotak warna='#BDD7EE' label='C' /> 
      </Demo>
      <View style={{ height: 40 }} />
    </ScrollView> 
  ); 
} 
  
const styles = StyleSheet.create({ 
  layar:       { flex: 1, backgroundColor: '#F5F5F5', paddingTop: 50 }, 
  pageJudul:   { fontSize: 22, fontWeight: 'bold', color: '#1F4E79', textAlign: 'center', marginBottom: 16 }, 
  demoWrapper: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#FFF', borderRadius: 8, padding: 12, elevation: 2 }, 
  demoJudul:   { fontSize: 13, fontWeight: '600', color: '#666', marginBottom: 8 }, 
  demoKonten:  { backgroundColor: '#EEF5FB', borderRadius: 4, padding: 8 }, 
  kotak:       { width: 60, height: 60, borderRadius: 6, justifyContent: 'center', alignItems: 'center', margin: 4 }, 
  kotakTeks:   { color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 }, 
});
