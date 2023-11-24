import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, getAuth, fetchSignInMethodsForEmail,initializeAuth,getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_FIREBASE_API_KEY, AUTHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } from '@env';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  // Votre configuration Firebase
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: ""
};
const app = initializeApp(firebaseConfig);
//const auth = getAuth();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const ConnexionScreen= ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    checkSession();
  }, []);


  const checkSession = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const savedEmail = JSON.parse(user).email;
        const emailParts = savedEmail.split('@');
        const username = emailParts[0];
        setUsername(username);
        navigation.navigate('Menu', { screen:'Profile' , params:{username} });
      }
    } catch (error) {
      console.log('Error checking session:', error);
    }
  };
  const saveSession = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('Session saved successfully');
    } catch (error) {
      console.log('Error saving session:', error);
    }
  };
  const clearSession = async () => {
    try {
      await AsyncStorage.removeItem('user');
      console.log('Session cleared successfully');
    } catch (error) {
      console.log('Error clearing session:', error);
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const emailParts = email.split('@');
        const username = emailParts[0];
        setUsername(username);
        setIsLoggedIn(true);
        saveSession(user);
        navigation.navigate('Menu', { screen:'Profile' , params:{username} });

      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = '';
        if (errorCode === 'auth/invalid-email') {
          errorMessage = 'Adresse e-mail invalide.';
        } else if (errorCode === 'auth/wrong-password') {
          errorMessage = 'Mot de passe incorrect.';
        } else if (errorCode === 'auth/user-not-found') {
          errorMessage = "L'utilisateur n'existe pas.";
        } else {
          errorMessage = 'Erreur lors de la connexion.';
        }
        setErrorMessage(errorMessage);
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUsername(user.displayName);
        saveSession(user);
        navigation.navigate('Menu');
      })
      .catch(error => console.log(error));
  };





  return (

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#DBE9EE" }}>
      



        <View style={styles.container}>

          <Text style={styles.title}>Quiz animés/mangas</Text>

          <TextInput 
          style={styles.input} 
          placeholder="Email" 
          onChangeText={setEmail}
          value={email}/>

          <TextInput 
          style={styles.input} 
          placeholder="Mot de passe"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
           />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>

          <Text style={styles.underscore}>Mot de passe oublié ?</Text>

          <View style={styles.noAccount}>
            <Text style={styles.greenText}>Pas de compte ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Inscription')} >
              <Text style={styles.underscore}>S'inscrire</Text>
            </TouchableOpacity>
          </View>

        </View>
            

          <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    width: "80%",
    backgroundColor: "#DBE9EE",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    borderColor: "#84AFBE",
    borderWidth: 2,
    borderRadius: 100,
    padding: 18,
    marginBottom: 16,
    fontSize: 16,
  },
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
  underscore: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#181818",
  },
  greenText: {
    textAlign: "center",
    color: "#008205",
    marginRight: 8,
  },
  noAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  errorMessage: {
    color: 'red',
    marginTop:  -100,
  },
});

export default ConnexionScreen;

