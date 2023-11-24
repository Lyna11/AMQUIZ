import * as React from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, SafeAreaView } from "react-native";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function HomeScreen() {
  // Sample list of image URLs
  const imageList = [
    "https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1621478374422-35206faeddfb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const renderImageItem = ({ item }) => <Image source={{ uri: item }} style={styles.image} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "#DBE9EE" }}>
        <View style={styles.container}>
          {/* Photo de profil */}
          <View style={styles.blocProfil}>
            <View style={styles.blocProfilRight}>
              <Text style={styles.playerNameText}>{"Pseudo"}</Text>
              <Text style={styles.playerDescriptionText}>{"Petite description"}</Text>
            </View>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={styles.profileImage}
            />
          </View>

          {/* Barre de pièces */}
          <View style={styles.blocPieces}>
            <Text style={styles.coinsText}>{"1000"}</Text>
            <Text style={styles.levelText}>{"20"}</Text>
          </View>

          {/* Horizontal list of photos */}
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={imageList}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={styles.imageListContainer}
          />

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Jouer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Aventure</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "80%",
    backgroundColor: "#DBE9EE",
    marginTop: 50,
  },
  blocProfil: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#DBE9EE",
    paddingTop: 40,
  },
  blocProfilRight: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: "#DBE9EE",
  },
  playerNameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
  playerDescriptionText: {
    fontSize: 15,
    color: "#000000",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#000000",
  },
  blocPieces: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#DBE9EE",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 100,
    padding: 16,
    marginTop: 20,
  },
  coinsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  imageListContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#DBE9EE",
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#DBE9EE",
    marginTop: 50,
  },
  button: {
    width: 200,
    paddingVertical: 30,
    borderRadius: 8,
    backgroundColor: "#4F6D7A",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
