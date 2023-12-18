import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, SafeAreaView, Modal, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Deconnexion from "../components/Deconnexion";
const HomeScreen = ({ navigation, route }) => {
  useEffect(() => {
    const backAction = () => {
      // Bloquer le bouton de retour
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    // Nettoyer l'effet lors du démontage de l'écran
    return () => backHandler.remove();
  }, []); // Assurez-vous
  const [username, setUsername] = useState("");
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const savedEmail = JSON.parse(user).email;
        const emailParts = savedEmail.split("@");
        const username = emailParts[0];
        setUsername(username);
      }
    } catch (error) {
      console.log("Error checking session:", error);
    }
  };
  const { params } = route;
  const usernameSave = username;
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDeco, setModalVisibleDeco] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "#DBE9EE" }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={{
                uri: "https://img.icons8.com/color/48/settings--v1.png",
              }}
              style={styles.iconeSettings}
            />
          </TouchableOpacity>
          {/* Photo de profil */}
          <View style={styles.blocProfil}>
            <View style={styles.blocProfilRight}>
              <Text style={styles.playerNameText}>{`${usernameSave}`}</Text>
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QuizScreen")}>
              <Text style={styles.text}>Jouer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Aventure</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        style={{ display: "flex", justifyContent: "center", alignItems: "center", borderColor: "black", borderWidth: 2 }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>
          <Text style={{ fontSize: 26, fontWeight: "bold" }}>PARAMETRE</Text>
          <View style={styles.containerModal}>
            <View style={styles.verticalButtonsContainer}>
              <TouchableOpacity style={styles.buttonModal}>
                <Text style={styles.buttonText}>Son</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonModal}>
                <Text style={styles.buttonText}>Conditions d'utilisation</Text>
              </TouchableOpacity>
            </View>

            {/* Nouvelle structure pour les boutons horizontaux */}
            <View style={styles.horizontalButtonsContainer}>
              <TouchableOpacity style={styles.horizontalButton}>
                <Deconnexion navigation={navigation} closeModal={() => setModalVisible(!modalVisible)} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.horizontalButton} onPress={() => setModalVisibleDeco(true)}>
                <Text style={styles.buttonText}>Supprimer mon compte</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        style={{ display: "flex", justifyContent: "center", alignItems: "center", borderColor: "black", borderWidth: 2 }}
        animationType="slide"
        transparent={true}
        visible={modalVisibleDeco}
        onRequestClose={() => {
          setModalVisibleDeco(!modalVisibleDeco);
        }}>
        <View style={styles.modal}>
          <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>VOULEZ-VOUS VRAIMENT SUPRIMER VOTRE COMPTE ?</Text>
          <View style={styles.containerModal}>
            {/* Nouvelle structure pour les boutons horizontaux */}
            <View style={styles.horizontalButtonsContainer}>
              <TouchableOpacity style={styles.horizontalButton}>
                <Text style={styles.buttonText}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.horizontalButton} onPress={() => setModalVisibleDeco(!modalVisibleDeco)}>
                <Text style={styles.buttonText}>Non</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "90%",
    backgroundColor: "#DBE9EE",
    marginTop: 50,
  },
  iconeSettings: {
    width: 30,
    height: 30,
    alignSelf: "flex-start",
  },

  blocProfil: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#DBE9EE",
    paddingTop: 10,
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

  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "50%",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: "black",
    elevation: 20,
  },

  buttonModal: {
    width: 200,
    paddingVertical: 30,
    borderRadius: 8,
    backgroundColor: "#C0D6DF",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  containerModal: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 20,
  },

  // Styles pour les boutons horizontaux
  verticalButtonsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  // Styles pour les boutons horizontaux
  horizontalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%", // La largeur est définie à 100% de l'écran
    marginTop: 50,
  },
  horizontalButton: {
    backgroundColor: "#C0D6DF",
    paddingVertical: 15,
    borderRadius: 10,
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});
export default HomeScreen;
