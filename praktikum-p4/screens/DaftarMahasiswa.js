import { useState, useCallback, useRef } from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';

// ─── DATA ────────────────────────────────────────────────────────────────────
const DATA_AWAL = [
  { id: '1',  nama: 'Andi Wijaya',       nim: '20230001', prodi: 'Teknik Informatika',  ipk: 3.85, angkatan: 2023 },
  { id: '2',  nama: 'Sari Indah Pertiwi',nim: '20230002', prodi: 'Sistem Informasi',    ipk: 3.72, angkatan: 2023 },
  { id: '3',  nama: 'Budi Santoso',      nim: '20230003', prodi: 'Teknik Informatika',  ipk: 3.60, angkatan: 2023 },
  { id: '4',  nama: 'Dewi Rahayu',       nim: '20230004', prodi: 'Sistem Informasi',    ipk: 3.91, angkatan: 2023 },
  { id: '5',  nama: 'Eko Prasetyo',      nim: '20230005', prodi: 'Teknik Informatika',  ipk: 3.45, angkatan: 2023 },
  { id: '6',  nama: 'Fitri Handayani',   nim: '20230006', prodi: 'Teknik Komputer',     ipk: 3.78, angkatan: 2023 },
  { id: '7',  nama: 'Gilang Ramadhan',   nim: '20230007', prodi: 'Sistem Informasi',    ipk: 3.55, angkatan: 2023 },
  { id: '8',  nama: 'Hana Pertiwi',      nim: '20230008', prodi: 'Teknik Komputer',     ipk: 3.88, angkatan: 2023 },
  { id: '9',  nama: 'Ivan Kurniawan',    nim: '20220009', prodi: 'Teknik Informatika',  ipk: 3.40, angkatan: 2022 },
  { id: '10', nama: 'Jihan Aulia',       nim: '20220010', prodi: 'Sistem Informasi',    ipk: 3.67, angkatan: 2022 },
  { id: '11', nama: 'Krisna Bayu',       nim: '20220011', prodi: 'Teknik Komputer',     ipk: 3.75, angkatan: 2022 },
  { id: '12', nama: 'Laila Nur',         nim: '20220012', prodi: 'Teknik Informatika',  ipk: 3.92, angkatan: 2022 },
  { id: '13', nama: 'Muhammad Fauzi',    nim: '20210013', prodi: 'Sistem Informasi',    ipk: 3.50, angkatan: 2021 },
  { id: '14', nama: 'Nadia Salsabila',   nim: '20210014', prodi: 'Teknik Informatika',  ipk: 3.82, angkatan: 2021 },
];

const PRODIS = ['Semua', 'Teknik Informatika', 'Sistem Informasi', 'Teknik Komputer'];

// ─── COLOUR HELPERS ──────────────────────────────────────────────────────────
const ipkColor = (ipk) => {
  if (ipk >= 3.8) return '#16a34a';
  if (ipk >= 3.5) return '#2563eb';
  return '#d97706';
};
const avatarColors = [
  '#1F4E79','#2E75B6','#107C41','#7030A0','#C55A11','#843C0C','#375623'
];
const getAvatarColor = (id) => avatarColors[id % avatarColors.length];

// ─── ITEM COMPONENT ──────────────────────────────────────────────────────────
function ItemMahasiswa({ item, onPress, index }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.card}>
          <View style={[styles.avatar, { backgroundColor: getAvatarColor(Number(item.id)) }]}>
            <Text style={styles.avatarTeks}>{item.nama.charAt(0)}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.nama} numberOfLines={1}>{item.nama}</Text>
            <Text style={styles.nim}>{item.nim} · {item.prodi}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeTeks}>Angkatan {item.angkatan}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.ipkBadge, { borderColor: ipkColor(item.ipk) }]}>
            <Text style={[styles.ipkLabel, { color: ipkColor(item.ipk) }]}>IPK</Text>
            <Text style={[styles.ipk, { color: ipkColor(item.ipk) }]}>{item.ipk.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────
export default function DaftarMahasiswa({ navigation }) {
  const [query, setQuery]           = useState('');
  const [filterProdi, setProdi]     = useState('Semua');
  const [isRefreshing, setRefresh]  = useState(false);
  const [data, setData]             = useState(DATA_AWAL);

  const dataFiltered = data.filter((item) => {
    const cocokNama  = item.nama.toLowerCase().includes(query.toLowerCase());
    const cocokNIM   = item.nim.includes(query);
    const cocokProdi = filterProdi === 'Semua' || item.prodi === filterProdi;
    return (cocokNama || cocokNIM) && cocokProdi;
  });

  const handleRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setData([...DATA_AWAL].sort(() => Math.random() - 0.5));
      setRefresh(false);
    }, 1500);
  }, []);

  const handlePress = (item) => {
    if (navigation) navigation.navigate('DetailMahasiswa', { mahasiswa: item });
  };

  return (
    <View style={styles.layar}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F4FF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daftar Mahasiswa</Text>
        <View style={styles.countChip}>
          <Text style={styles.countTeks}>{dataFiltered.length} mahasiswa</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari nama atau NIM..."
          placeholderTextColor="#AAA"
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Chips */}
      <FlatList
        data={PRODIS}
        keyExtractor={(i) => i}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setProdi(item)}
            style={[styles.chip, filterProdi === item && styles.chipActive]}
          >
            <Text style={[styles.chipTeks, filterProdi === item && styles.chipTeksActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Main FlatList */}
      <FlatList
        data={dataFiltered}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ItemMahasiswa item={item} index={index} onPress={() => handlePress(item)} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#2563eb']}
            tintColor="#2563eb"
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>Tidak ada hasil</Text>
            <Text style={styles.emptySubtitle}>Coba kata kunci atau filter lain</Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  layar:         { flex: 1, backgroundColor: '#F0F4FF' },
  header:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                   paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 52 : 56, paddingBottom: 12 },
  headerTitle:   { fontSize: 22, fontWeight: '800', color: '#1E3A5F', letterSpacing: -0.3 },
  countChip:     { backgroundColor: '#DBEAFE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  countTeks:     { fontSize: 12, color: '#2563EB', fontWeight: '600' },
  searchWrap:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 14,
                   marginHorizontal: 16, marginBottom: 14, paddingHorizontal: 14, paddingVertical: 10,
                   shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  searchIcon:    { fontSize: 16, marginRight: 8 },
  searchInput:   { flex: 1, fontSize: 15, color: '#1E3A5F' },
  clearBtn:      { fontSize: 14, color: '#AAA', paddingLeft: 8 },
  chipList:      { paddingLeft: 16, paddingRight: 24, paddingBottom: 14 },
  chip:          { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, marginRight: 8,
                   backgroundColor: '#FFF', borderWidth: 1.5, borderColor: '#D1D9EE', alignSelf: 'flex-start' },
  chipActive:    { backgroundColor: '#1E3A5F', borderColor: '#1E3A5F' },
  chipTeks:      { fontSize: 13, fontWeight: '600', color: '#4B5E80' },
  chipTeksActive:{ color: '#FFF' },
  card:          { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
                   borderRadius: 16, padding: 14,
                   shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  avatar:        { width: 48, height: 48, borderRadius: 24, justifyContent: 'center',
                   alignItems: 'center', marginRight: 14 },
  avatarTeks:    { color: '#FFF', fontWeight: '800', fontSize: 20 },
  cardInfo:      { flex: 1 },
  nama:          { fontSize: 15, fontWeight: '700', color: '#1E3A5F', marginBottom: 2 },
  nim:           { fontSize: 12, color: '#6B7FA3', marginBottom: 6 },
  badgeRow:      { flexDirection: 'row' },
  badge:         { backgroundColor: '#EEF2FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  badgeTeks:     { fontSize: 11, color: '#4F46E5', fontWeight: '600' },
  ipkBadge:      { alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6,
                   borderRadius: 12, borderWidth: 1.5, backgroundColor: '#FAFAFA' },
  ipkLabel:      { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  ipk:           { fontSize: 18, fontWeight: '800', marginTop: 1 },
  separator:     { height: 10 },
  empty:         { alignItems: 'center', paddingTop: 80, paddingBottom: 40 },
  emptyEmoji:    { fontSize: 48, marginBottom: 12 },
  emptyTitle:    { fontSize: 17, fontWeight: '700', color: '#1E3A5F', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#8899BB' },
});
