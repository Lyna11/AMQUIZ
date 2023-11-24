import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Dimensions} from 'react-native';


const ProfileUserInfos: React.FC = () => {

interface USER {
  id: number,
  nom: string,
  description: string
}

const USER = 
  {
    id: 1,
    nom: 'Tri Ptt',
    description: 'Développeur',
    image: 'https://i.postimg.cc/zf7Lbdx4/IMG-2135.png'
  }
  
  return (

    <SafeAreaView style={{ flex: 1}}>

        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#DBE9EE' }}>
          <View style={styles.container}>


            <View style={styles.userProfileInfos}>
              <View style={styles.userProfileInfosText}>
                <Text style={styles.userProfileInfosTextFirstChild}>
                  {USER.nom}
                </Text>
                <Text>{"\n"}</Text>
                <Text style={styles.userProfileInfosTextLastChild}>
                  {USER.description}
                </Text>
              </View>
              <Image source={{uri:USER.image}} style={styles.userProfileInfosPicture}/>
              
            </View>        
          </View>
        </View>

      </SafeAreaView>

  )}

  /* Pour CSS */
  const styles = StyleSheet.create({
    /* TODO */
    container: {
      width:'100%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    userProfileInfos: {
      flexDirection: 'row',
      width: '100%',
    },
    userProfileInfosText: {
      fontSize: 24,
      width: '65%',
      paddingRight: 20,
      paddingTop: 20
    },

    userProfileInfosTextFirstChild: {
      fontSize: 22,
    },

    userProfileInfosTextLastChild: {
      fontSize: 16,
    },

    userProfileInfosPicture: {
      display:'flex',
      flex:1,
      borderWidth: 2,
      aspectRatio: '1/1',
    }
})

export default ProfileUserInfos;