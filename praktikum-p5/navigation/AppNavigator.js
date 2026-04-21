import React from 'react';
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

function FormStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={FormLogin} options={{ headerShown: false }} />
      <Stack.Screen name="Registrasi" component={FormRegistrasi} />
      <Stack.Screen name="MainApp" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="LoginStack">
        <Drawer.Screen name="LoginStack" component={FormStack} options={{ title: 'Login & Registrasi' }} />
        <Drawer.Screen name="WizardRegistrasi" component={FormRegistrasiWizard} options={{ title: 'Registrasi Berjenjang' }} />
        <Drawer.Screen name="LatihanDataDiri" component={FormLatihan1} options={{ title: 'Latihan: Data Diri' }} />
        <Drawer.Screen name="LatihanSurvei" component={FormSurvei} options={{ title: 'Latihan: Survei Mobile' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
