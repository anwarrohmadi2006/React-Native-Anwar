import { SectionList, View, Text, StyleSheet, Platform } from 'react-native';

// ─── DATA ────────────────────────────────────────────────────────────────────
const jadwalKuliah = [
  {
    title: 'Senin',
    data: [
      { id: 's1', matkul: 'Pemrograman Mobile',   jam: '07.00 - 09.30', ruang: 'Lab 1',  sks: 3, dosen: 'Dr. Ahmad Fauzi' },
      { id: 's2', matkul: 'Basis Data Lanjut',    jam: '10.00 - 12.30', ruang: 'R.201', sks: 3, dosen: 'Ir. Budi Setiawan' },
      { id: 's3', matkul: 'Statistika Lanjut',    jam: '13.00 - 15.30', ruang: 'R.302', sks: 3, dosen: 'Dr. Citra Dewi' },
    ],
  },
  {
    title: 'Selasa',
    data: [
      { id: 's4', matkul: 'Kecerdasan Buatan',    jam: '07.00 - 09.30', ruang: 'R.302', sks: 3, dosen: 'Prof. Dian Kusuma' },
      { id: 's5', matkul: 'Rekayasa Perangkat Lunak', jam: '10.00 - 12.30', ruang: 'R.101', sks: 3, dosen: 'Dr. Eko Purnomo' },
    ],
  },
  {
    title: 'Rabu',
    data: [
      { id: 's6', matkul: 'Pemrograman Mobile',   jam: '13.00 - 15.30', ruang: 'Lab 1',  sks: 3, dosen: 'Dr. Ahmad Fauzi' },
      { id: 's7', matkul: 'Jaringan Komputer',    jam: '16.00 - 18.30', ruang: 'R.101', sks: 2, dosen: 'Ir. Fajar Santosa' },
    ],
  },
  {
    title: 'Kamis',
    data: [
      { id: 's8', matkul: 'Etika Profesi IT',     jam: '07.00 - 08.40', ruang: 'R.Aula',sks: 2, dosen: 'Dr. Gita Lestari' },
      { id: 's9', matkul: 'Skripsi / Tugas Akhir',jam: '09.00 - 11.30', ruang: 'R.Dosen',sks: 6, dosen: 'Pembimbing' },
    ],
  },
  {
    title: 'Jumat',
    data: [
      { id: 's10', matkul: 'Seminar & Workshop',  jam: '08.00 - 10.00', ruang: 'Aula',  sks: 2, dosen: 'Tim Dosen' },
    ],
  },
  {
    title: 'Sabtu',
    data: [],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const namaHari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const hariIni  = namaHari[new Date().getDay()];

const sksColor = (sks) => {
  if (sks >= 6) return '#7030A0';
  if (sks >= 3) return '#1F4E79';
  return '#107C41';
};
const ruangIcon = (ruang) => {
  if (ruang.startsWith('Lab')) return '🖥️';
  if (ruang.includes('Aula')) return '🏛️';
  if (ruang.includes('Dosen')) return '📋';
  return '📚';
};

// ─── ITEM ─────────────────────────────────────────────────────────────────────
function ItemJadwal({ item }) {
  const [jamMulai, jamSelesai] = item.jam.split(' - ');
  return (
    <View style={styles.item}>
      <View style={styles.jamBlok}>
        <Text style={styles.jamMulai}>{jamMulai}</Text>
        <View style={styles.jamGaris} />
        <Text style={styles.jamSelesai}>{jamSelesai}</Text>
      </View>
      <View style={styles.itemBody}>
        <Text style={styles.matkulNama} numberOfLines={1}>{item.matkul}</Text>
        <View style={styles.itemMeta}>
          <Text style={styles.dosenTeks} numberOfLines={1}>👤 {item.dosen}</Text>
        </View>
        <View style={styles.itemFooter}>
          <View style={styles.ruangBadge}>
            <Text style={styles.ruangTeks}>{ruangIcon(item.ruang)} {item.ruang}</Text>
          </View>
          <View style={[styles.sksBadge, { backgroundColor: sksColor(item.sks) + '20', borderColor: sksColor(item.sks) + '40' }]}>
            <Text style={[styles.sksTeks, { color: sksColor(item.sks) }]}>{item.sks} SKS</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────
export default function JadwalKuliah() {
  return (
    <View style={styles.layar}>
      <SectionList
        sections={jadwalKuliah}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => <ItemJadwal item={item} />}

        renderSectionHeader={({ section }) => {
          const isToday = section.title === hariIni;
          return (
            <View style={[styles.sectionHeader, isToday && styles.sectionHeaderToday]}>
              <View style={styles.sectionLeft}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {isToday && <View style={styles.todayDot} />}
              </View>
              <Text style={styles.sectionRight}>
                {isToday ? '📅 Hari Ini' : `${section.data.length} mk`}
              </Text>
            </View>
          );
        }}

        renderSectionFooter={({ section }) =>
          section.data.length === 0 ? (
            <View style={styles.emptySection}>
              <Text style={styles.emptySectionTeks}>🌴 Tidak ada jadwal — waktu istirahat!</Text>
            </View>
          ) : null
        }

        ListHeaderComponent={
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Jadwal Kuliah</Text>
            <Text style={styles.pageSub}>Semester Genap 2024/2025</Text>
            <View style={styles.todayInfo}>
              <Text style={styles.todayInfoTeks}>Hari ini: <Text style={{ fontWeight: '800', color: '#1E3A5F' }}>{hariIni}</Text></Text>
            </View>
          </View>
        }

        ItemSeparatorComponent={() => <View style={styles.separator} />}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  layar:            { flex: 1, backgroundColor: '#F5F7FF' },
  pageHeader:       { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 56 : 60, paddingBottom: 20 },
  pageTitle:        { fontSize: 26, fontWeight: '900', color: '#1E3A5F', letterSpacing: -0.5 },
  pageSub:          { fontSize: 13, color: '#6B7FA3', marginTop: 2, marginBottom: 14 },
  todayInfo:        { backgroundColor: '#EEF2FF', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, alignSelf: 'flex-start' },
  todayInfoTeks:    { fontSize: 13, color: '#4F46E5' },
  sectionHeader:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                      backgroundColor: '#1E3A5F', paddingHorizontal: 20, paddingVertical: 12 },
  sectionHeaderToday:{ backgroundColor: '#2563EB' },
  sectionLeft:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitle:     { fontSize: 16, fontWeight: '800', color: '#FFF' },
  todayDot:         { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FCD34D' },
  sectionRight:     { fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: '600' },
  item:             { flexDirection: 'row', backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 14 },
  jamBlok:          { width: 64, alignItems: 'center', marginRight: 14, paddingTop: 2 },
  jamMulai:         { fontSize: 13, fontWeight: '800', color: '#2563EB' },
  jamGaris:         { width: 1.5, height: 20, backgroundColor: '#DBEAFE', marginVertical: 4 },
  jamSelesai:       { fontSize: 11, color: '#93B0D0' },
  itemBody:         { flex: 1 },
  matkulNama:       { fontSize: 15, fontWeight: '700', color: '#1E3A5F', marginBottom: 4 },
  itemMeta:         { marginBottom: 8 },
  dosenTeks:        { fontSize: 12, color: '#6B7FA3' },
  itemFooter:       { flexDirection: 'row', gap: 8 },
  ruangBadge:       { backgroundColor: '#F0F4FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  ruangTeks:        { fontSize: 12, color: '#2563EB', fontWeight: '600' },
  sksBadge:         { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  sksTeks:          { fontSize: 12, fontWeight: '700' },
  separator:        { height: 1, backgroundColor: '#F0F4FF', marginLeft: 96 },
  emptySection:     { backgroundColor: '#FFF', paddingVertical: 20, paddingHorizontal: 20, alignItems: 'center' },
  emptySectionTeks: { fontSize: 14, color: '#B0BEDD', fontStyle: 'italic' },
});
