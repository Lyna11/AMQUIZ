import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import ConnexionScreen from "./ConnexionScreen";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, fetchSignInMethodsForEmail, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

//import { REACT_APP_FIREBASE_API_KEY, AUTHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } from '@env';

/*const firebaseConfig = {
  // Votre configuration Firebase
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: ""
};*/
//const app = initializeApp(firebaseConfig);
const auth = getAuth();
//const auth = initializeAuth(app, {
//  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//});

const InscriptionScreen = ({ navigation }) => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailDejaUtilise, setEmailDejaUtilise] = useState(false);
  const [emailInvalide, setEmailInvalide] = useState(false);
  const [motsDePasseDifferents, setMotsDePasseDifferents] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const checkExistingEmail = (email) => {
    return new Promise((resolve, reject) => {
      fetchSignInMethodsForEmail(auth, email)
        .then((signInMethods) => {
          if (signInMethods && signInMethods.length > 0) {
            setEmailDejaUtilise(true);
            resolve(true);
          } else {
            setEmailDejaUtilise(false);
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleSubmit = async () => {
    setEmailInvalide(false);
    setMotsDePasseDifferents(false);

    if (!validateEmail(email)) {
      setEmailInvalide(true);
      setErrorMessage("L'e-mail n'est pas valide");
      return;
    }

    if (motDePasse !== confirmationMotDePasse) {
      setMotsDePasseDifferents(true);
      setErrorMessage("Les mots de passe ne correspondent pas");
      return;
    }

    if (nom.trim() === "" || email.trim() === "" || motDePasse.trim() === "" || confirmationMotDePasse.trim() === "") {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    try {
      const emailExists = await checkExistingEmail(email);
      if (emailExists) {
        setErrorMessage("L'adresse e-mail existe déjà");
        return;
      }

      createUserWithEmailAndPassword(auth, email, motDePasse)
        .then(() => navigation.navigate("Connexion"))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#DBE9EE" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Quiz animés/mangas</Text>

        <TextInput style={[styles.input, emailInvalide && styles.inputInvalid]} placeholder="Email" value={email} onChangeText={setEmail} />

        <TextInput style={styles.input} placeholder="Pseudo" value={nom} onChangeText={setNom} />

        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} value={motDePasse} onChangeText={setMotDePasse} />

        <TextInput
          placeholder="Confirmer le mot de passe"
          style={[styles.input, motsDePasseDifferents && styles.inputInvalid]}
          secureTextEntry={true}
          value={confirmationMotDePasse}
          onChangeText={setConfirmationMotDePasse}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

        <View style={styles.noAccount}>
          <Text style={styles.greenText}>Déjà un compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Connexion")}>
            <Text style={styles.underscore}>Se Connecter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {emailDejaUtilise && <Text style={styles.errorMessage}>Cette adresse e-mail est déjà utilisée</Text>}
      {errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

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
    color: "red",
    marginTop: -100,
  },
});

export default InscriptionScreen;
