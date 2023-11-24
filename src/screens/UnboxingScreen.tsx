import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, FlatList, Dimensions } from 'react-native';

export default function OuvertureScreen() {
  const screenwidth:number = Dimensions.get('window').width;

  interface USER_CHESTS {
    id: number;
    nom: string;
    image: string;
  }

  const USER_CHESTS: USER_CHESTS[] = [
    {
      id: 1,
      nom: 'Coffre narutesque',
      image: 'https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-22.jpg',
    },
    {
      id: 2,
      nom: 'Coffre rare',
      image: 'https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-22.jpg',
    },
    {
      id: 3,
      nom: 'Coffre légendaire',
      image: 'https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-22.jpg',
    },
  ];

  const renderItem = ({ item }: { item: USER_CHESTS }) => (
    <View key={item.nom} style={styles.chestItemContainer}>
      <Text>{item.nom}</Text>
      <Image
        source={{ uri: item.image }}
        style={{
          width: '100%', // Utilise '100%' pour la largeur
          aspectRatio: 1 / 1,
          resizeMode: 'cover',
        }}
      />
    </View>
  );

  // Rendu
  return (
    <SafeAreaView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DBE9EE' }}>
        <View style={styles.mainContainer}>
          <FlatList
            data={USER_CHESTS}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* Pour CSS */
const styles = StyleSheet.create({
  mainContainer: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  flatListContainer: {
    width: '100%', // Ajuste ici pour utiliser la largeur de l'écran
  },
  chestItemContainer: {
    backgroundColor: 'red',
    marginBottom: 10,
    padding: 15, // Ajuste ici pour la marge/padding autour de l'image
  },
});
