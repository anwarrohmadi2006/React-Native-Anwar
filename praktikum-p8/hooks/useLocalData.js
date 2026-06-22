import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLocalData(key, defaultValue = null) {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setLoading] = useState(true);

  // Load saat pertama kali
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(raw => {
        if (raw) setData(JSON.parse(raw));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [key]);

  // Fungsi untuk update data (otomatis simpan ke AsyncStorage)
  const updateData = async (newData) => {
    setData(newData);
    await AsyncStorage.setItem(key, JSON.stringify(newData));
  };

  // Fungsi untuk hapus data
  const hapusData = async () => {
    setData(defaultValue);
    await AsyncStorage.removeItem(key);
  };

  return { data, isLoading, updateData, hapusData };
}
