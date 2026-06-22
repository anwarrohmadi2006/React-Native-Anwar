import AsyncStorage from '@react-native-async-storage/async-storage';

export const getKoleksi = async (key) => {
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
};

export const tambahItem = async (key, itemBaru) => {
  const koleksi = await getKoleksi(key);
  const updated = [...koleksi, { ...itemBaru, id: Date.now().toString() }];
  await AsyncStorage.setItem(key, JSON.stringify(updated));
  return updated;
};

export const updateItem = async (key, id, dataUpdate) => {
  const koleksi = await getKoleksi(key);
  const updated = koleksi.map((item) =>
    item.id === id ? { ...item, ...dataUpdate } : item
  );
  await AsyncStorage.setItem(key, JSON.stringify(updated));
  return updated;
};

export const hapusItem = async (key, id) => {
  const koleksi = await getKoleksi(key);
  const updated = koleksi.filter((item) => item.id !== id);
  await AsyncStorage.setItem(key, JSON.stringify(updated));
  return updated;
};
