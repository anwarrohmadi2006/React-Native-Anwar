import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FormRegistrasi from '../screens/FormRegistrasi';
import FormLogin from '../screens/FormLogin';
import FormRegistrasiWizard from '../screens/FormRegistrasiWizard';
import FormLatihan1 from '../screens/FormLatihan1';
import FormSurvei from '../screens/FormSurvei';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  // Stack untuk User yang belum login (Tanpa Hamburger)
  function AuthStack() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <FormLogin {...props} onLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="Registrasi" component={FormRegistrasi} />
      </Stack.Navigator>
    );
  }

  // Drawer untuk User yang sudah login (Dengan Hamburger)
  function MainDrawer() {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" options={{ title: 'Beranda' }}>
          {(props) => <HomeScreen {...props} email={userEmail} onLogout={handleLogout} />}
        </Drawer.Screen>
        <Drawer.Screen name="WizardRegistrasi" component={FormRegistrasiWizard} options={{ title: 'Registrasi Berjenjang' }} />
        <Drawer.Screen name="LatihanDataDiri" component={FormLatihan1} options={{ title: 'Latihan: Data Diri' }} />
        <Drawer.Screen name="LatihanSurvei" component={FormSurvei} options={{ title: 'Latihan: Survei Mobile' }} />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}
