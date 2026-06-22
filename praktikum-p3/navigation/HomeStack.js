import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HalamanHome from '../screens/HalamanHome';
import HalamanDetail from '../screens/HalamanDetail';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1F4E79',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HalamanHome}
        options={{ title: 'Daftar Mahasiswa' }}
      />
      <Stack.Screen
        name="Detail"
        component={HalamanDetail}
        options={{ title: 'Detail Mahasiswa' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
