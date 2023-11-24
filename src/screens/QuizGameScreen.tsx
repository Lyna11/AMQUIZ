import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler } from "react-native";

const QuizGameScreen = ({ navigation, route }) => {
  const { params } = route;
  const nomDuQuizz = params?.button;

  useEffect(() => {
    const backAction = () => {
      // Bloquer le bouton de retour
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    // Nettoyer l'effet lors du démontage de l'écran
    return () => backHandler.remove();
  }, []); // Assurez-vous
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>{`Quiz ${nomDuQuizz} !`}</Text>

      {/* Texte */}
      <Text style={styles.text}>Timer : 4</Text>

      {/* Grand cadre rouge */}
      <View style={styles.redBox}>
        <Text style={styles.questionText}>Comment ca va ? Tu vas bien ou pas ?</Text>
      </View>

      {/* Liste de 4 boutons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Réponse 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Réponse 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Réponse 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Réponse 4</Text>
        </TouchableOpacity>
      </View>

      {/* Bouton rond en bas */}
      <TouchableOpacity style={styles.roundButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.coupSpecialText}>Skil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    width: "60%",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  redBox: {
    width: "90%",
    height: "30%",
    backgroundColor: "red",
    marginBottom: 30,
    justifyContent: "center",
  },
  buttonContainer: {
    width: "90%",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  roundButton: {
    backgroundColor: "green",
    borderRadius: 50, // La moitié de la largeur
    padding: 25,

    alignItems: "center", // Alignement du contenu au centre
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  coupSpecialText: {
    color: "transparent",
    fontSize: 18,
  },
  questionText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default QuizGameScreen;
