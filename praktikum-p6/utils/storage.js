import AsyncStorage from '@react-native-async-storage/async-storage';

export const simpan = async (key, value) => {
  try {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
    return true;
  } catch (e) {
    console.error('Gagal menyimpan:', e);
    return false;
  }
};

export const ambil = async (key, defaultValue = null) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return defaultValue;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch (e) {
    console.error('Gagal membaca:', e);
    return defaultValue;
  }
};

export const hapus = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Gagal menghapus:', e);
    return false;
  }
};

export const hapusSemua = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    console.error('Gagal menghapus semua:', e);
    return false;
  }
};
