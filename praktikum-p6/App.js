import { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

import HalamanLogin from './screens/HalamanLogin';
import HalamanUtama from './screens/HalamanUtama';
import TodoPersisten from './screens/TodoPersisten';
import HalamanPengaturan from './screens/HalamanPengaturan';
import { STORAGE_KEYS } from './constants/storageKeys';

const Stack = createNativeStackNavigator();

import { PreferencesProvider, PreferencesContext } from './context/PreferencesContext';

export default function App() {
  return (
    <PreferencesProvider>
      <AppContent />
    </PreferencesProvider>
  );
}

function AppContent() {
  const [isLoading, setLoading] = useState(true);
  const [userSession, setSession] = useState(null);
  const { getTheme } = useContext(PreferencesContext);
  
  const theme = getTheme();

  // Cek session tersimpan saat app pertama dibuka
  useEffect(() => {
    const cekSession = async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER_SESSION);
      if (raw) setSession(JSON.parse(raw));
      setLoading(false);
    };
    cekSession();
  }, []);

  // Tampilkan loading saat cek session
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2E75B6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userSession ? (
          // Sudah login — langsung ke halaman utama
          <>
            <Stack.Screen name="Utama">
              {() => (
                <HalamanUtama
                  session={userSession}
                  onLogout={async () => {
                    await AsyncStorage.removeItem(STORAGE_KEYS.USER_SESSION);
                    setSession(null);
                  }}
                />
              )}
            </Stack.Screen>
            <Stack.Screen 
              name="TodoPersisten" 
              component={TodoPersisten} 
              options={{ 
                headerShown: true, 
                title: 'Aplikasi Tugas',
                headerStyle: { backgroundColor: theme.background },
                headerTintColor: theme.text
              }} 
            />
            <Stack.Screen 
              name="Pengaturan" 
              component={HalamanPengaturan} 
              options={{ 
                headerShown: true, 
                title: 'Pengaturan',
                headerStyle: { backgroundColor: theme.background },
                headerTintColor: theme.text
              }} 
            />
          </>
        ) : (
          // Belum login — ke halaman login
          <Stack.Screen name="Login">
            {() => (
              <HalamanLogin
                onLoginBerhasil={async (userData) => {
                  await AsyncStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(userData));
                  setSession(userData);
                }}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
