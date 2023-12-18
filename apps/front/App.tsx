// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'


import ConnexionScreen from './src/screens/ConnexionScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MenuScreen from './src/screens/MenuScreen';
import InscriptionScreen from './src/screens/InscriptionScreen';

import ShopScreen from './src/screens/ShopScreen'

const queryClient = new QueryClient()

const Stack = createStackNavigator();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Connexion" component={ConnexionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="Inscription" component={InscriptionScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>

  );
};

export default App;
