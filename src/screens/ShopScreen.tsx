import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import RoundedSquare from "../components/square";
export default function BoutiqueScreen() {
  // Rendu
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Title_ text="COFFRES" />
        <View style={styles.line}>
          <RoundedSquare montant="2000" image={require("../../assets/img/coffre.jpg")} piece={require("../../assets/img/piece.png")}></RoundedSquare>
          <RoundedSquare montant="3000" image={require("../../assets/img/coffre2.jpg")} piece={require("../../assets/img/piece.png")}></RoundedSquare>
          <RoundedSquare montant="4000" image={require("../../assets/img/coffre.jpg")} piece={require("../../assets/img/piece.png")}></RoundedSquare>
        </View>
        <Title_ text="PIECES" />
        <View style={styles.line}>
          <RoundedSquare montant="2000" image={require("../../assets/img/coffre.jpg")} piece={require("../../assets/img/piece.png")}></RoundedSquare>
          <RoundedSquare montant="5000" image={require("../../assets/img/coffre.jpg")} piece={require("../../assets/img/piece.png")}></RoundedSquare>
          <RoundedSquare montant="6000" image={require("../../assets/img/coffre.jpg")} piece={require("../../assets/img/piece.png")}></RoundedSquare>
        </View>
      </View>
    </SafeAreaView>
  );
}

type TitleProps = {
  text: string;
};

export const Title_: React.FC<TitleProps> = ({ text }) => (
  <View style={styles.titleBarContainer}>
    <View style={styles.titleContent}>
      <Text style={styles.titleText}>{text}</Text>
    </View>
  </View>
);

/* Pour CSS */
const styles = StyleSheet.create({
  line: {
    flex: 1,
    flexDirection: "row", // Aligner les carrés horizontalement
    justifyContent: "space-between", // Espace équitable entre les carrés
    paddingHorizontal: 16, // Espace intérieur horizontal pour améliorer la lisibilité
  },
  titleBarContainer: {
    backgroundColor: "#4F6D7A",
    paddingVertical: 8,
    alignSelf: "stretch",
    marginTop: 20,
  },
  titleContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginLeft: 0, // Espace entre l'icône et le texte
  },
});
