import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import DaftarMahasiswa  from '../screens/DaftarMahasiswa';
import DetailMahasiswa  from '../screens/DetailMahasiswa';
import JadwalKuliah     from '../screens/JadwalKuliah';
import DaftarProduk     from '../screens/DaftarProduk';
import DetailProduk     from '../screens/DetailProduk';

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

function MahasiswaStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DaftarMahasiswa"  component={DaftarMahasiswa} />
      <Stack.Screen name="DetailMahasiswa"  component={DetailMahasiswa} />
    </Stack.Navigator>
  );
}

function ProdukStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DaftarProduk"  component={DaftarProduk} />
      <Stack.Screen name="DetailProduk"  component={DetailProduk} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E8EDF8',
            paddingBottom: 6,
            height: 60,
          },
          tabBarActiveTintColor: '#1E3A5F',
          tabBarInactiveTintColor: '#8899BB',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
          tabBarIcon: ({ focused, color }) => {
            const icons = {
              Mahasiswa : focused ? '👥' : '👤',
              Jadwal    : focused ? '📅' : '🗓️',
              Produk    : focused ? '🛍️' : '📦',
            };
            return <Text style={{ fontSize: 20 }}>{icons[route.name] ?? '❓'}</Text>;
          },
        })}
      >
        <Tab.Screen name="Mahasiswa" component={MahasiswaStack} />
        <Tab.Screen name="Jadwal"    component={JadwalKuliah}   />
        <Tab.Screen name="Produk"    component={ProdukStack}    />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
