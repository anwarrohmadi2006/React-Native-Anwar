import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';

const formatRupiah = (n) => 'Rp ' + n.toLocaleString('id-ID');
const stars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));

export default function DetailProduk({ route, navigation }) {
  const { produk } = route.params;

  return (
    <ScrollView style={styles.layar} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: produk.warna }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backTeks}>← Kembali</Text>
        </TouchableOpacity>
        <Text style={styles.heroEmoji}>📦</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.nama}>{produk.nama}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>{stars(produk.rating)}</Text>
          <Text style={styles.ratingNum}>{produk.rating}</Text>
          <Text style={styles.sep}>·</Text>
          <Text style={styles.terjual}>{produk.terjual.toLocaleString('id-ID')} terjual</Text>
        </View>
        <Text style={styles.harga}>{formatRupiah(produk.harga)}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoBadge}><Text style={styles.infoBadgeTeks}>📂 {produk.kategori}</Text></View>
          <View style={styles.infoBadge}><Text style={styles.infoBadgeTeks}>📦 Stok: {produk.stok}</Text></View>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => Alert.alert('Berhasil!', `${produk.nama} ditambahkan ke keranjang 🛒`)}
        >
          <Text style={styles.addBtnTeks}>🛒 Tambah ke Keranjang</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layar:       { flex: 1, backgroundColor: '#F0F4FF' },
  hero:        { height: 260, justifyContent: 'center', alignItems: 'center' },
  backBtn:     { position: 'absolute', top: Platform.OS === 'android' ? 52 : 56, left: 16 },
  backTeks:    { fontSize: 15, fontWeight: '700', color: '#1E3A5F' },
  heroEmoji:   { fontSize: 80 },
  body:        { padding: 20 },
  nama:        { fontSize: 22, fontWeight: '900', color: '#1E3A5F', marginBottom: 10 },
  ratingRow:   { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  stars:       { fontSize: 16, color: '#F59E0B' },
  ratingNum:   { fontSize: 14, fontWeight: '700', color: '#4B5E80' },
  sep:         { color: '#D1D9EE' },
  terjual:     { fontSize: 13, color: '#6B7FA3' },
  harga:       { fontSize: 28, fontWeight: '900', color: '#2563EB', marginBottom: 16 },
  infoRow:     { flexDirection: 'row', gap: 10, marginBottom: 24 },
  infoBadge:   { backgroundColor: '#EEF2FF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  infoBadgeTeks:{ fontSize: 13, color: '#4F46E5', fontWeight: '600' },
  addBtn:      { backgroundColor: '#1E3A5F', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  addBtnTeks:  { fontSize: 16, fontWeight: '800', color: '#FFF' },
});
