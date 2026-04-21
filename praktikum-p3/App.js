import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

import HomeStack from './navigation/HomeStack';
import TabNavigator from './navigation/TabNavigator';
import DrawerNavigatorPraktikumC from './navigation/DrawerNavigatorPraktikumC';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ state, navigation }) => {
  const menuItems = [
    { name: 'PraktikumA', label: 'Praktikum A', emoji: '📌', desc: 'Stack Navigator' },
    { name: 'PraktikumB', label: 'Praktikum B', emoji: '📑', desc: 'Bottom Tab Navigator' },
    { name: 'PraktikumC', label: 'Praktikum C', emoji: '☰', desc: 'Drawer Navigator' },
  ];

  return (
    <View style={styles.drawerContainer}>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderEmoji}>🎓</Text>
        <Text style={styles.drawerHeaderTitle}>Praktikum Mobile</Text>
        <Text style={styles.drawerHeaderSub}>Pertemuan 3 — Navigasi</Text>
        <View style={styles.drawerDivider} />
        <Text style={styles.drawerHeaderName}>Anwar Rohmadi</Text>
        <Text style={styles.drawerHeaderNim}>NIM: 247411027</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>PILIH PRAKTIKUM</Text>
        {menuItems.map((item) => {
          const isFocused = state.routes[state.index].name === item.name;
          return (
            <View
              key={item.name}
              style={[styles.menuItem, isFocused && styles.menuItemActive]}
            >
              <Text
                onPress={() => navigation.navigate(item.name)}
                style={styles.menuTouchable}
              >
                <View style={styles.menuRow}>
                  <View style={styles.menuIconBox}>
                    <Text style={styles.menuEmoji}>{item.emoji}</Text>
                  </View>
                  <View style={styles.menuTextBox}>
                    <Text style={[styles.menuLabel, isFocused && styles.menuLabelActive]}>
                      {item.label}
                    </Text>
                    <Text style={styles.menuDesc}>{item.desc}</Text>
                  </View>
                  {isFocused && <Text style={styles.activeIndicator}>●</Text>}
                </View>
              </Text>
            </View>
          );
        })}
      </View>

      {/* Drawer Footer */}
      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>React Navigation v6 · Expo SDK 54</Text>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1F4E79',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          drawerStyle: {
            width: 290,
          },
        }}
      >
        <Drawer.Screen
          name="PraktikumA"
          component={HomeStack}
          options={{
            title: 'Praktikum A',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="PraktikumB"
          component={TabNavigator}
          options={{
            title: 'Praktikum B',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="PraktikumC"
          component={DrawerNavigatorPraktikumC}
          options={{
            title: 'Praktikum C',
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  drawerHeader: {
    backgroundColor: '#1F4E79',
    paddingTop: 55,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  drawerHeaderEmoji: {
    fontSize: 44,
    marginBottom: 8,
  },
  drawerHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  drawerHeaderSub: {
    fontSize: 12,
    color: '#BDD7EE',
    marginBottom: 14,
  },
  drawerDivider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 14,
  },
  drawerHeaderName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  drawerHeaderNim: {
    fontSize: 12,
    color: '#BDD7EE',
  },
  menuSection: {
    padding: 16,
    flex: 1,
  },
  menuSectionTitle: {
    fontSize: 11,
    color: '#999',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    borderRadius: 14,
    marginBottom: 6,
    overflow: 'hidden',
  },
  menuItemActive: {
    backgroundColor: '#BDD7EE',
  },
  menuTouchable: {
    display: 'flex',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
  },
  menuEmoji: {
    fontSize: 20,
  },
  menuTextBox: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  menuLabelActive: {
    color: '#1F4E79',
  },
  menuDesc: {
    fontSize: 12,
    color: '#888',
  },
  activeIndicator: {
    color: '#1F4E79',
    fontSize: 12,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#AAA',
  },
});
