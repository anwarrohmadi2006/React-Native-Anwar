import { useState, useEffect, useCallback } from 'react';
import {
  FlatList, View, Text, StyleSheet, ActivityIndicator,
  TouchableOpacity, RefreshControl, Dimensions, Platform,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 16 * 2 - 12) / 2;

// ─── DATA ────────────────────────────────────────────────────────────────────
const DATA_PRODUK = [
  { id: '1',  nama: 'Laptop Gaming ROG',    harga: 18500000, stok: 5,  kategori: 'Komputer', warna: '#BDD7EE', rating: 4.8, terjual: 132 },
  { id: '2',  nama: 'Mouse Wireless Logitech', harga: 350000, stok: 24, kategori: 'Aksesori', warna: '#E2EFDA', rating: 4.6, terjual: 540 },
  { id: '3',  nama: 'Keyboard Mechanical',  harga: 950000,  stok: 8,  kategori: 'Aksesori', warna: '#FFF2CC', rating: 4.7, terjual: 298 },
  { id: '4',  nama: 'Monitor 27" QHD',      harga: 5200000, stok: 3,  kategori: 'Komputer', warna: '#FCE4D6', rating: 4.9, terjual: 87  },
  { id: '5',  nama: 'Webcam HD 1080P',      harga: 650000,  stok: 15, kategori: 'Jaringan', warna: '#E8DEF8', rating: 4.5, terjual: 220 },
  { id: '6',  nama: 'Router WiFi 6',        harga: 1200000, stok: 10, kategori: 'Jaringan', warna: '#D7F0FA', rating: 4.7, terjual: 176 },
  { id: '7',  nama: 'Printer Laser A4',     harga: 2800000, stok: 6,  kategori: 'Cetak',    warna: '#FDDDE6', rating: 4.4, terjual: 95  },
  { id: '8',  nama: 'Scanner Dokumen',      harga: 1600000, stok: 4,  kategori: 'Cetak',    warna: '#FFF0DA', rating: 4.3, terjual: 60  },
  { id: '9',  nama: 'SSD NVMe 1TB',         harga: 900000,  stok: 20, kategori: 'Komputer', warna: '#D4F1E4', rating: 4.8, terjual: 420 },
  { id: '10', nama: 'Hub USB-C 7-in-1',     harga: 480000,  stok: 18, kategori: 'Aksesori', warna: '#FDE8C8', rating: 4.6, terjual: 310 },
];

const KATEGORI = ['Semua', 'Komputer', 'Aksesori', 'Jaringan', 'Cetak'];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const formatRupiah = (n) =>
  'Rp ' + n.toLocaleString('id-ID');

const stokStatus = (stok) => {
  if (stok <= 5)  return { label: 'Stok Terbatas', color: '#EF4444', bg: '#FEF2F2' };
  if (stok <= 15) return { label: `Stok: ${stok}`, color: '#F59E0B', bg: '#FFFBEB' };
  return           { label: `Stok: ${stok}`, color: '#16A34A', bg: '#F0FDF4' };
};

const stars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));

// ─── SKELETON CARD ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <View style={[styles.card, { width: CARD_SIZE }]}>
      <View style={[styles.skl, { height: CARD_SIZE * 0.7, borderRadius: 10 }]} />
      <View style={{ padding: 10 }}>
        <View style={[styles.skl, { height: 14, width: '80%', marginBottom: 6, borderRadius: 6 }]} />
        <View style={[styles.skl, { height: 12, width: '55%', borderRadius: 6 }]} />
      </View>
    </View>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProdukCard({ item, onPress }) {
  const st = stokStatus(item.stok);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.card, { width: CARD_SIZE }]}>
      <View style={[styles.produkGambar, { backgroundColor: item.warna }]}>
        <Text style={styles.produkEmoji}>📦</Text>
        <View style={[styles.stokBadge, { backgroundColor: st.bg }]}>
          <Text style={[styles.stokTeks, { color: st.color }]}>{st.label}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.produkNama} numberOfLines={2}>{item.nama}</Text>
        <Text style={styles.ratingTeks}>{stars(item.rating)} <Text style={styles.ratingNum}>{item.rating}</Text></Text>
        <Text style={styles.terjualTeks}>{item.terjual.toLocaleString('id-ID')} terjual</Text>
        <Text style={styles.hargaTeks}>{formatRupiah(item.harga)}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────
export default function DaftarProduk({ navigation }) {
  const [data, setData]                 = useState([]);
  const [isLoading, setLoading]         = useState(true);
  const [isRefreshing, setRefreshing]   = useState(false);
  const [filterKategori, setKategori]   = useState('Semua');

  const loadData = useCallback((showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    setTimeout(() => {
      setData(DATA_PRODUK);
      setLoading(false);
      setRefreshing(false);
    }, showRefresh ? 1200 : 2000);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const dataFiltered = data.filter(
    (item) => filterKategori === 'Semua' || item.kategori === filterKategori
  );

  const handlePressItem = (item) => {
    if (navigation) navigation.navigate('DetailProduk', { produk: item });
  };

  // ── Loading state ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <View style={styles.layar}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Katalog Produk</Text>
          <Text style={styles.pageSub}>Memuat produk...</Text>
        </View>
        <View style={styles.chipListWrap}>
          {KATEGORI.map((k) => (
            <View key={k} style={[styles.skl, { height: 34, width: 80, borderRadius: 20 }]} />
          ))}
        </View>
        <View style={styles.gridWrap}>
          {[1,2,3,4].map((i) => <SkeletonCard key={i} />)}
        </View>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingTeks}>Memuat produk...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.layar}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Katalog Produk</Text>
        <Text style={styles.pageSub}>{data.length} produk tersedia</Text>
      </View>

      {/* Kategori chips */}
      <FlatList
        data={KATEGORI}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setKategori(item)}
            style={[styles.chip, filterKategori === item && styles.chipActive]}
          >
            <Text style={[styles.chipTeks, filterKategori === item && styles.chipTeksActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Grid produk */}
      <FlatList
        data={dataFiltered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, marginBottom: 12, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 32, paddingTop: 4 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => loadData(true)}
            colors={['#2563EB']}
            tintColor="#2563EB"
          />
        }
        ListHeaderComponent={
          <View style={styles.resultHeader}>
            <Text style={styles.resultTeks}>
              Menampilkan <Text style={{ fontWeight: '800', color: '#1E3A5F' }}>{dataFiltered.length}</Text> produk
              {filterKategori !== 'Semua' ? ` · ${filterKategori}` : ''}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>Produk tidak ditemukan</Text>
            <Text style={styles.emptySub}>Coba pilih kategori lain</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProdukCard item={item} onPress={() => handlePressItem(item)} />
        )}
      />
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  layar:         { flex: 1, backgroundColor: '#F0F4FF' },
  pageHeader:    { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 52 : 56, paddingBottom: 12 },
  pageTitle:     { fontSize: 24, fontWeight: '900', color: '#1E3A5F', letterSpacing: -0.4 },
  pageSub:       { fontSize: 13, color: '#6B7FA3', marginTop: 2 },
  chipListWrap:  { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 16 },
  chipList:      { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  chip:          { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
                   backgroundColor: '#FFF', borderWidth: 1.5, borderColor: '#D1D9EE' },
  chipActive:    { backgroundColor: '#1E3A5F', borderColor: '#1E3A5F' },
  chipTeks:      { fontSize: 13, fontWeight: '600', color: '#4B5E80' },
  chipTeksActive:{ color: '#FFF' },
  resultHeader:  { paddingHorizontal: 16, paddingVertical: 8 },
  resultTeks:    { fontSize: 13, color: '#8899BB' },
  card:          { backgroundColor: '#FFF', borderRadius: 16, overflow: 'hidden',
                   shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  produkGambar:  { height: CARD_SIZE * 0.65, justifyContent: 'center', alignItems: 'center' },
  produkEmoji:   { fontSize: 44 },
  stokBadge:     { position: 'absolute', top: 8, right: 8, paddingHorizontal: 8,
                   paddingVertical: 3, borderRadius: 8 },
  stokTeks:      { fontSize: 10, fontWeight: '700' },
  cardBody:      { padding: 10 },
  produkNama:    { fontSize: 13, fontWeight: '700', color: '#1E3A5F', marginBottom: 4, lineHeight: 18 },
  ratingTeks:    { fontSize: 11, color: '#F59E0B', marginBottom: 2 },
  ratingNum:     { color: '#6B7FA3' },
  terjualTeks:   { fontSize: 11, color: '#8899BB', marginBottom: 6 },
  hargaTeks:     { fontSize: 14, fontWeight: '800', color: '#2563EB' },
  gridWrap:      { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 16, opacity: 0.35 },
  loadingOverlay:{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                   justifyContent: 'center', alignItems: 'center', gap: 12,
                   backgroundColor: 'rgba(240,244,255,0.85)' },
  loadingTeks:   { fontSize: 14, color: '#2563EB', fontWeight: '600' },
  skl:           { backgroundColor: '#E2E8F4' },
  emptyWrap:     { alignItems: 'center', paddingTop: 60 },
  emptyEmoji:    { fontSize: 48, marginBottom: 12 },
  emptyTitle:    { fontSize: 16, fontWeight: '700', color: '#1E3A5F', marginBottom: 6 },
  emptySub:      { fontSize: 13, color: '#8899BB' },
});
