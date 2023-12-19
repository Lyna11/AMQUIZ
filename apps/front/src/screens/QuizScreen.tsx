import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { questions } from "../config/questions";

const QuizScreen = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState("");

  // Liste des thèmes de quiz récupérés depuis le fichier questions.ts
  const theme = Object.keys(questions);
  const themeMaj = theme.map((item) => item.charAt(0).toUpperCase() + item.slice(1));

  // Liste des boutons
  const buttons = ["Naruto", "DragonBall", "Evangelion"];

  // Fonction pour gérer la recherche
  const filteredButtons = buttons.filter((button) => button.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Ligne en haut */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.greenButton} onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons name="shopping" color={"blue"} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>Liste des quizs</Text>
      </View>

      {/* Gros bloc rouge */}
      <View style={styles.redBlock}>
        {/* Input de recherche */}
        <TextInput style={styles.searchInput} placeholder="Rechercher..." value={searchText} onChangeText={(text) => setSearchText(text)} />

        {/* Liste de boutons filtrés */}
        {filteredButtons.map((themeMaj, index) => (
          <TouchableOpacity key={index} style={styles.quizButton} onPress={() => navigation.navigate("QuizGameScreen", { theme: themeMaj })}>
            <Text style={styles.buttonText}>{themeMaj}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignSelf: "flex-start", // Ajoutez cette ligne pour placer le header en haut à gauche
  },
  greenButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
  },
  redBlock: {
    backgroundColor: "red",
    height: "70%",
    width: "90%",
    padding: 20,
    borderRadius: 10,
  },
  searchInput: {
    backgroundColor: "white",
    height: 40,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  quizButton: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default QuizScreen;
