import { useState } from 'react';
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from '../lib/supabase';

// Daftarkan handler untuk menutup browser setelah OAuth selesai
WebBrowser.maybeCompleteAuthSession();

export function TombolGoogleLogin() {
  const [isLoading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Buat redirect URI yang sesuai dengan environment
      const redirectUri = makeRedirectUri({
        scheme: 'myapp',
        path: 'login-callback',
      });

      // Mulai OAuth flow dengan Supabase
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true, // Kita handle manual dengan WebBrowser
        },
      });
      if (error) throw error;

      // Buka browser untuk halaman login Google
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUri
      );

      if (result.type === 'success') {
        // Ekstrak token dari URL callback
        const { url } = result;
        const params = new URLSearchParams(url.split('#')[1]);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        if (accessToken && refreshToken) {
          // Set session di Supabase client
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        }
      }
    } catch (error) {
      Alert.alert('Login Google Gagal', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity style={[styles.buttonGoogle, isLoading && styles.buttonDisabled]} onPress={handleGoogleLogin} disabled={isLoading}>
      <Text style={styles.buttonGoogleText}>Masuk dengan Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonGoogle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonGoogleText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
