import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView } from "react-native";
import ConnexionScreen from "./ConnexionScreen";

export default function InscriptionScreen() {
  const [showInscription, setShowInscription] = useState(true);

  const handleInscriptionPress = () => {
    setShowInscription(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#DBE9EE" }}>
        {showInscription && (
          <View style={styles.container}>
            <Text style={styles.title}>Quiz animés/mangas</Text>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Pseudo" />
            <TextInput style={styles.input} placeholder="Mot de passe" />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            <View style={styles.noAccount}>
              <Text style={styles.greenText}>Déjà un compte ?</Text>
              <TouchableOpacity onPress={handleInscriptionPress}>
                <Text style={styles.underscore}>Se Connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!showInscription && <ConnexionScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    width: "80vw",
    backgroundColor: "#DBE9EE",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "bold",
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
});
