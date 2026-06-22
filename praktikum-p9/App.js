import 'react-native-url-polyfill/auto'; // polyfill untuk URL parsing
import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './lib/supabase';

// Import screens
import HalamanLogin from './screens/HalamanLogin';
import HalamanDaftar from './screens/HalamanDaftar';
import HalamanUtama from './screens/HalamanUtama';

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [isLoading, setLoad] = useState(true);

  useEffect(() => {
    // 1. Cek session yang sudah ada (dari AsyncStorage)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoad(false);
    });

    // 2. Subscribe perubahan auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[Auth] Event:', event);
        // event bisa: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED
        setSession(session);
        setLoad(false);
      }
    );

    // 3. Cleanup: unsubscribe saat App unmount
    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#2E75B6' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          // Authenticated — akses halaman utama
          <Stack.Screen name='Utama' component={HalamanUtama} />
        ) : (
          // Unauthenticated — tampilkan auth screens
          <>
            <Stack.Screen name='Login' component={HalamanLogin} />
            <Stack.Screen name='Daftar' component={HalamanDaftar} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
