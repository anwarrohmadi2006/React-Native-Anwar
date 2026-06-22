// services/api.js
import axios from 'axios';

// Buat instance Axios dengan konfigurasi default
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10 detik timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // Tambahkan token dari storage (jika ada)
    // const token = await AsyncStorage.getItem('@token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    // Response sukses — kembalikan data langsung
    return response;
  },
  (error) => {
    // Tangani error global
    const status = error.response?.status;
    if (status === 401) {
      console.log('Token expired — perlu login ulang');
    }
    if (status === 500) {
      console.log('Server error — coba lagi nanti');
    }
    return Promise.reject(error);
  }
);

export default api;
