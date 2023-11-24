import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConnexionScreen from './ConnexionScreen';
import MenuScreen from './MenuScreen';
const ProfileScreen= ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Connexion'); // Remplacez 'Login' par le nom de votre écran de connexion
      //setIsLoggedIn(true);
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };
  const checkSession = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const savedEmail = JSON.parse(user).email; // Récupère l'email enregistré localement
        const emailParts = savedEmail.split('@'); // Divise l'email en deux parties : nom d'utilisateur et domaine
        const username = emailParts[0]; // Obtient le nom d'utilisateur avant le caractère "@"
        setUsername(username);
      }
    } catch (error) {
      console.log('Error checking session:', error);
    }
  };
  // Rendu
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text >
          Bienvenue {username}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Se deconnecter</Text>
          </TouchableOpacity>  
         
    </View>
  );
  
}

/* Pour CSS */
const styles = StyleSheet.create({
  /* TODO */
  button: {
    backgroundColor: "#181818",
    padding: 18,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#181818",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
export default ProfileScreen;
