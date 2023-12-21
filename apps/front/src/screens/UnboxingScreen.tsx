import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { useFirebase } from '../hooks/firebase';
import { useMutation } from 'react-query';
import { postUnboxChests } from '../api/endpoints';

interface USER_CHESTS {
  id: number;
  nom: string;
  image: string;
}

export default function OuvertureScreen() {
  const screenwidth: number = Dimensions.get('window').width;
  const screenheight: number = Dimensions.get('window').height;

  const [imageDebloquee, setImageDebloquee] = useState<string | null>(null);

  const { navigate } = useNavigation();
  const { db, isInitialized, currentUser } = useFirebase();

  const [chests, setchests] = useState("");



  useEffect(() => {

      const userId = currentUser?.uid ?? null;
      //console.log({ userId });
      // const nbrChest = currentUser?.comChestCount ?? null;
      // console.log({ comChestCount });

    // Fetch user data from Firebase 
    const fetchUserData = async () => {
      try {
        if (!isInitialized || !currentUser) return;

        const userDoc = await getDoc(doc(db, 'Users', currentUser.uid));
        console.log(userDoc);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          let nbrChests = userData.comChestCount;
          console.log(nbrChests);

          setchests(nbrChests);
          

          // Handle user data as needed
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, [isInitialized, currentUser, db]);


  const { mutate: unlockChest, isLoading: isUnlockingChest } = useMutation(postUnboxChests, {
    onSuccess: (data: any) => { // reponse du back
      if (data.imageId) {
        // Mettre à jour l'état avec l'ID de l'image débloquée
        setImageDebloquee(data.imageId);
      } else {
        console.log('Aucune image débloquée.');
      }
    },
    onError: (error) => {
      console.error('Erreur lors du déblocage de l\'image', error);
    }
  })

  // const unlockChest = mutation.mutate
  // const isUnlockingChest = mutation.isLoading

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: '#DBE9EE', height:screenheight, display:'flex', alignItems:'center'}}>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Nombre de coffres à ouvrir : {chests}</Text>
          
          <FlatList
            data={Array.from({ length: chests }, (_, index) => index + 1)} 
            renderItem={({ item }) => (
              <View key={item} style={styles.chestItemContainer}>
                <Image
                  source={{ uri: 'https://icons.iconarchive.com/icons/iconarchive/seaside/512/Treasure-Chest-icon.png' }}
                  style={{
                    width: screenwidth*0.9,
                    aspectRatio: 1 / 1,
                    resizeMode: 'cover',
                  }}
                />
                <TouchableOpacity onPress={() => unlockChest()}>
                  {isUnlockingChest ? 'Déblocage...' : (<View style={styles.button}>
                    <Text>Débloquer</Text>
                  </View>)}
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.toString()}
            horizontal
            pagingEnabled
            scrollEnabled
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
    marginTop: '30%',
    width: '90%',
    //marginLeft: 'auto',
    //marginRight: 'auto',
  },
  text: {
    fontSize:22,
    fontWeight:'Bold',
    marginBottom:40,
    textAlign:'center'
  },
  
  flatListContainer: {
    width: '100%', 
  },
  chestItemContainer: {
    //backgroundColor: 'red',
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});