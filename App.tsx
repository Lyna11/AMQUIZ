import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ConnexionScreen from "./src/screens/ConnexionScreen";
import HomeScreen from "./src/screens/HomeScreen";
import BoutiqueScreen from "./src/screens/ShopScreen";
import OuvertureScreen from "./src/screens/UnboxingScreen";
import AmisScreen from "./src/screens/SocialScreen";
import ProfilScreen from "./src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

/* VRAI APP A CONSERVER */
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Feed" screenOptions={{ tabBarActiveTintColor: "#e91e63" }}>
        <Tab.Screen
          name="Shop"
          component={BoutiqueScreen}
          options={{
            tabBarLabel: "Shop",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="shopping" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Unboxing"
          component={OuvertureScreen}
          options={{
            tabBarLabel: "Unboxing",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="treasure-chest" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Connexion"
          component={ConnexionScreen}
          options={{
            tabBarLabel: "Connexion",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Social"
          component={AmisScreen}
          options={{
            tabBarLabel: "Social",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-multiple-plus" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
