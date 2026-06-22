import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Import komponen-komponen
import DemoLifecycle from './screens/DemoLifecycle';
import SearchDebounce from './screens/SearchDebounce';
import DashboardPolling from './screens/DashboardPolling';
import DaftarMahasiswaAsync from './screens/DaftarMahasiswaAsync';
import TodoPersisten from './screens/TodoPersisten';

const Tab = createMaterialTopTabNavigator();

// Wrapper untuk Tab A (Praktikum A)
function TabAScreen() {
  return (
    <ScrollView style={styles.container}>
      <DemoLifecycle />
      <SearchDebounce />
    </ScrollView>
  );
}

// Wrapper untuk Tab B (Praktikum B)
function TabBScreen() {
  return (
    <DashboardPolling />
  );
}

// Wrapper untuk Tab C (Praktikum C)
function TabCScreen() {
  return (
    <ScrollView style={styles.container}>
      <DaftarMahasiswaAsync />
      <TodoPersisten />
    </ScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#2E75B6',
            tabBarInactiveTintColor: '#888',
            tabBarIndicatorStyle: { backgroundColor: '#2E75B6' },
            tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
            tabBarStyle: { backgroundColor: '#FFF' },
          }}
        >
          <Tab.Screen name="Praktikum A" component={TabAScreen} />
          <Tab.Screen name="Praktikum B" component={TabBScreen} />
          <Tab.Screen name="Praktikum C" component={TabCScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  }
});
