import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BoutiqueScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#DBE9EE" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Quiz animés/mangas</Text>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Mot de passe" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <Text style={styles.underscore}>Mot de passe oublié ?</Text>
        <View style={styles.noAccount}>
          <Text style={styles.greenText}>Pas de compte ?</Text>
          <Text style={styles.underscore}>S'inscrire</Text>
        </View>
      </View>
    </View>
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
