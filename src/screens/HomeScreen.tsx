import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HomeScreen() {
  // Sample list of image URLs
  const imageList = [
    'https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1621478374422-35206faeddfb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    
    <View style={styles.container}>
        {/* Photo de profil */}
        <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          style={styles.profileImage}
        />
      </View>

       {/* Nom du joueur */}
       <View style={styles.playerNameContainer}>
        <Text style={styles.playerNameText}>{'Nom du Joueur'}</Text>
      </View>

       {/* Barre de pièces */}
       <View style={styles.coinBarContainer}>
       <View style={styles.coinContent}>
       <MaterialCommunityIcons name="currency-usd" color='white' size={18}  />
        <Text style={styles.coinText}>{`600`}</Text>
        </View>
      </View>
      {/* Horizontal list of photos */}
      <FlatList
        data={imageList}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.imageListContainer}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Jouer</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Aventure</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  coinBarContainer: {
    backgroundColor: '#4F6D7A',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    marginTop: 200,
  },
  coinContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 0, // Espace entre l'icône et le texte
  },
  buttonContainer: {
    padding: 50,
    flexDirection: 'column', // Afficher les boutons verticalement
    alignItems: 'center', // Centrer les boutons horizontalement
    marginTop: -200,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 100,
    elevation: 3,
    backgroundColor: '#4F6D7A',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  imageListContainer: {
    padding: 0,
    alignItems: 'center',
    marginTop: -200,

 
  },
  image: {
    width: 130,
    height: 150,
    marginHorizontal: 5,
    borderRadius: 5,
  },



  playerNameContainer: {
    position: 'absolute',
    top: 100,
    left: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  playerNameText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },

  profileImageContainer: {
    position: 'absolute',
    top: 80,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 40, // pour un cercle, utilisez la moitié de la largeur/hauteur
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});
