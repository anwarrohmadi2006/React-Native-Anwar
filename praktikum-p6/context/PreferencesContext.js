import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

export const PreferencesContext = createContext();

const PREFERENSI_DEFAULT = {
  temaDarkMode: false,
  notifikasi: true,
  bahasa: 'Indonesia',
  ukuranFont: 'sedang',
};

export const PreferencesProvider = ({ children }) => {
  const [prefs, setPrefs] = useState(PREFERENSI_DEFAULT);
  const [isLoading, setLoading] = useState(true);

  // Load preferensi saat aplikasi dibuka
  useEffect(() => {
    const loadPrefs = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFS);
        if (raw) {
          setPrefs({ ...PREFERENSI_DEFAULT, ...JSON.parse(raw) });
        }
      } catch (error) {
        console.error('Gagal memuat preferensi', error);
      } finally {
        setLoading(false);
      }
    };
    loadPrefs();
  }, []);

  // Update preferensi dan simpan ke AsyncStorage
  const updatePrefs = async (key, value) => {
    try {
      const newPrefs = { ...prefs, [key]: value };
      setPrefs(newPrefs);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFS, JSON.stringify(newPrefs));
    } catch (error) {
      console.error('Gagal menyimpan preferensi', error);
    }
  };

  // Helper untuk mendapatkan theme & font size
  const getTheme = () => {
    const isDark = prefs.temaDarkMode;
    return {
      background: isDark ? '#1A1A2E' : '#FFFFFF',
      containerBg: isDark ? '#1A1A2E' : '#F5F5F5',
      text: isDark ? '#FFFFFF' : '#333333',
      textPrimary: isDark ? '#66B2FF' : '#1F4E79',
      cardBg: isDark ? '#16213E' : '#FFFFFF',
      borderColor: isDark ? '#0F3460' : '#DDD',
      inputBg: isDark ? '#1E2A47' : '#FFFFFF',
    };
  };

  const getFontSize = (baseSize) => {
    switch (prefs.ukuranFont) {
      case 'kecil': return baseSize - 2;
      case 'besar': return baseSize + 4;
      default: return baseSize; // sedang
    }
  };

  return (
    <PreferencesContext.Provider value={{ prefs, updatePrefs, getTheme, getFontSize, isLoading }}>
      {children}
    </PreferencesContext.Provider>
  );
};
