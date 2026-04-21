import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';

const ipkColor = (ipk) => {
  if (ipk >= 3.8) return '#16a34a';
  if (ipk >= 3.5) return '#2563eb';
  return '#d97706';
};
const avatarColors = ['#1F4E79','#2E75B6','#107C41','#7030A0','#C55A11','#843C0C','#375623'];
const getAvatarColor = (id) => avatarColors[id % avatarColors.length];

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

export default function DetailMahasiswa({ route, navigation }) {
  const { mahasiswa } = route.params;
  const color = getAvatarColor(Number(mahasiswa.id));

  return (
    <ScrollView style={styles.layar} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: color }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backTeks}>← Kembali</Text>
        </TouchableOpacity>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarTeks}>{mahasiswa.nama.charAt(0)}</Text>
        </View>
        <Text style={styles.heroNama}>{mahasiswa.nama}</Text>
        <Text style={styles.heroNIM}>{mahasiswa.nim}</Text>
      </View>

      <View style={styles.body}>
        {/* IPK Card */}
        <View style={[styles.ipkCard, { borderLeftColor: ipkColor(mahasiswa.ipk) }]}>
          <Text style={styles.ipkKeterangan}>Indeks Prestasi Kumulatif</Text>
          <Text style={[styles.ipkNilai, { color: ipkColor(mahasiswa.ipk) }]}>
            {mahasiswa.ipk.toFixed(2)}
          </Text>
          <Text style={styles.ipkPredikat}>
            {mahasiswa.ipk >= 3.75 ? '🏆 Cumlaude' : mahasiswa.ipk >= 3.5 ? '⭐ Sangat Memuaskan' : '✅ Memuaskan'}
          </Text>
        </View>

        {/* Info Table */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Informasi Akademik</Text>
          <InfoRow label="Program Studi"  value={mahasiswa.prodi} />
          <InfoRow label="NIM"            value={mahasiswa.nim} />
          <InfoRow label="Angkatan"       value={String(mahasiswa.angkatan)} />
          <InfoRow label="Status"         value="Aktif" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layar:           { flex: 1, backgroundColor: '#F0F4FF' },
  hero:            { paddingTop: Platform.OS === 'android' ? 52 : 56, paddingBottom: 40, alignItems: 'center' },
  backBtn:         { position: 'absolute', top: Platform.OS === 'android' ? 52 : 56, left: 16, zIndex: 10 },
  backTeks:        { color: 'rgba(255,255,255,0.9)', fontSize: 15, fontWeight: '600' },
  avatarLarge:     { width: 88, height: 88, borderRadius: 44, backgroundColor: 'rgba(255,255,255,0.3)',
                     justifyContent: 'center', alignItems: 'center', marginBottom: 14, borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)' },
  avatarTeks:      { color: '#FFF', fontWeight: '800', fontSize: 40 },
  heroNama:        { fontSize: 22, fontWeight: '800', color: '#FFF', marginBottom: 4 },
  heroNIM:         { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  body:            { padding: 16 },
  ipkCard:         { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 12,
                     borderLeftWidth: 5, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 },
  ipkKeterangan:   { fontSize: 12, color: '#8899BB', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  ipkNilai:        { fontSize: 42, fontWeight: '900', marginBottom: 4 },
  ipkPredikat:     { fontSize: 14, color: '#4B5E80', fontWeight: '600' },
  infoCard:        { backgroundColor: '#FFF', borderRadius: 16, padding: 20, elevation: 2,
                     shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 },
  sectionTitle:    { fontSize: 13, fontWeight: '700', color: '#8899BB', textTransform: 'uppercase',
                     letterSpacing: 0.8, marginBottom: 16 },
  infoRow:         { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12,
                     borderBottomWidth: 1, borderBottomColor: '#F0F4FF' },
  infoLabel:       { fontSize: 14, color: '#8899BB', fontWeight: '500' },
  infoValue:       { fontSize: 14, color: '#1E3A5F', fontWeight: '700', maxWidth: '60%', textAlign: 'right' },
});
