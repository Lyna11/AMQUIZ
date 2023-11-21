import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './src/components/HomeScreen'
import BoutiqueScreen from './src/components/BoutiqueScreen'
import OuvertureScreen from './src/components/OuvertureScrenn'
import AmisScreen  from './src/components/AmisScreen'
import ProfilScreen from './src/components/ProfilScreen'

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent:  'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName="Feed" screenOptions={{ tabBarActiveTintColor: '#e91e63' }}>
        <Tab.Screen name="Boutique" component={BoutiqueScreen} 
         options={{
          tabBarLabel: 'Boutique',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          ),
          
        }}/>
        <Tab.Screen name="Ouverture" component={OuvertureScreen} 
         options={{
          tabBarLabel: 'Ouverture',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="treasure-chest" color={color} size={size} />
          ),
          
        }}/>
        <Tab.Screen name="Accueil" component={HomeScreen}
         options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          
        }} />
        <Tab.Screen name="Amis" component={AmisScreen}
         options={{
          tabBarLabel: 'Amis',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-multiple-plus" color={color} size={size} />
          ),
          
        }} />
        <Tab.Screen name="Profil" component={ProfilScreen} 
         options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}