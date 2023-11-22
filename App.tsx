// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ConnexionScreen from './src/screens/ConnexionScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MenuScreen from './src/screens/MenuScreen';
import InscriptionScreen from './src/screens/InscriptionScreen';

import ShopScreen from './src/screens/ShopScreen'


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Connexion" component={ConnexionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
