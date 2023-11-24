import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView, useWindowDimensions } from "react-native";
import RoundedSquare from "../components/square";

export default function BoutiqueScreen() {
  const { width, height } = useWindowDimensions();
  // Rendu
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
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
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#DBE9EE",
    height: "100%",
    justifyContent: "space-around",
  },
  line: {
    flexDirection: "row", // Aligner les carrés horizontalement
    flexWrap: "wrap", // Retour à la ligne si besoin
    justifyContent: "center", // Centrer les carrés horizontalement
    alignItems: "center", // Centrer les carrés verticalement
    marginVertical: 30,
  },
  titleBarContainer: {
    backgroundColor: "#4F6D7A",
    paddingVertical: 8,
    alignSelf: "stretch",
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
