import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View, StyleSheet } from 'react-native';

import TabNavigator from './TabNavigator';
import HalamanTentang from '../screens/HalamanTentang';
import HalamanPengaturan from '../screens/HalamanPengaturan';

const Drawer = createDrawerNavigator();

const DrawerNavigatorPraktikumC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1F4E79',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#EAF2FB',
          width: 260,
        },
        drawerActiveTintColor: '#1F4E79',
        drawerActiveBackgroundColor: '#BDD7EE',
        drawerInactiveTintColor: '#444',
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
          marginLeft: -10,
        },
        drawerItemStyle: {
          borderRadius: 10,
          marginVertical: 2,
        },
      }}
      drawerContent={(props) => {
        const { state, navigation } = props;
        return (
          <View style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerHeaderEmoji}>📱</Text>
              <Text style={styles.drawerHeaderTitle}>Praktikum C</Text>
              <Text style={styles.drawerHeaderSub}>Drawer Navigator</Text>
            </View>
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;
              const icons = ['📑', 'ℹ️', '⚙️'];
              return (
                <View
                  key={route.key}
                  style={[styles.drawerItem, isFocused && styles.drawerItemActive]}
                >
                  <Text
                    style={[styles.drawerItemText, isFocused && styles.drawerItemTextActive]}
                    onPress={() => navigation.navigate(route.name)}
                  >
                    {icons[index]}  {route.name}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      }}
    >
      <Drawer.Screen
        name="Utama"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerLabel: 'Utama',
        }}
      />
      <Drawer.Screen
        name="Tentang"
        component={HalamanTentang}
        options={{
          title: 'Tentang Aplikasi',
          drawerLabel: 'Tentang',
        }}
      />
      <Drawer.Screen
        name="Pengaturan"
        component={HalamanPengaturan}
        options={{
          title: 'Pengaturan',
          drawerLabel: 'Pengaturan',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorPraktikumC;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#EAF2FB',
  },
  drawerHeader: {
    backgroundColor: '#1F4E79',
    padding: 24,
    paddingTop: 50,
    marginBottom: 12,
    alignItems: 'center',
  },
  drawerHeaderEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  drawerHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  drawerHeaderSub: {
    fontSize: 13,
    color: '#BDD7EE',
  },
  drawerItem: {
    marginHorizontal: 12,
    marginVertical: 3,
    borderRadius: 10,
    padding: 14,
  },
  drawerItemActive: {
    backgroundColor: '#BDD7EE',
  },
  drawerItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  drawerItemTextActive: {
    color: '#1F4E79',
  },
});
