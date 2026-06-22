import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DaftarPost from './screens/DaftarPost';
import DetailPost from './screens/DetailPost';
import FormBuatPost from './screens/FormBuatPost';
import FormEditPost from './screens/FormEditPost';
import TestAPI from './screens/TestAPI';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="TestAPI"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2E75B6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="TestAPI" 
          component={TestAPI} 
          options={{ title: 'Uji API (Konsol)' }} 
        />
        <Stack.Screen 
          name="DaftarPost" 
          component={DaftarPost} 
          options={{ title: 'Daftar Post (P8)' }} 
        />
        <Stack.Screen 
          name="DetailPost" 
          component={DetailPost} 
          options={{ title: 'Detail Post' }} 
        />
        <Stack.Screen 
          name="FormBuatPost" 
          component={FormBuatPost} 
          options={{ title: 'Buat Post Baru' }} 
        />
        <Stack.Screen 
          name="FormEditPost" 
          component={FormEditPost} 
          options={{ title: 'Edit Post' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
