import { SafeAreaView, View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { useNavigation  } from "@react-navigation/native";


export default function ProfilScreen({}) {

  const screenwidth:number = Dimensions.get('window').width;
  const screenheight:number = Dimensions.get('window').height;

  const { navigate } = useNavigation();

  return(


    <SafeAreaView style={{backgroundColor: "#DBE9EE", height:screenheight}}> 
      <View style={{ flex: 1, alignItems: 'center', marginTop:'25%' }}>
        <View>

          <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#DBE9EE" }}>
            <Image source={require('../../assets/img/trophee.png')} style={{ width: screenwidth*0.5, aspectRatio: 1/1 }} />
            <Text 
              style={{    
              fontSize: 30,
              fontWeight: "bold",
              color: "#000000",
              marginTop:50}}>
                NOM_DU_JOUEUR
              </Text>
            <Text
              style={{    
              fontSize: 28,
              fontWeight: "bold",
              color: "#000000",}}>
            SCORE_DU_JOUEUR</Text>
            <Text
              style={{    
              fontSize: 16,
              color: "#000000",
              marginTop:40}}>
              NOM_DU_JOUEUR_2</Text>
            <Text
            style={{    
              fontSize: 16,
              color: "#000000"}}>
              SCORE_DU_JOUEUR_2
            </Text>
          </View>

           <TouchableOpacity
                  style={styles.finishButton}
                  onPress={() => {
                    navigate("HomeScreen");
                  }}>
                  <Text style={styles.counter}>Revenir</Text>
            </TouchableOpacity>


        </View>
      </View>
    </SafeAreaView>

  );
  }

  const styles = StyleSheet.create({
    counter: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#ffffff",
    },
    finishButton: {
      width: "100%",
      borderRadius: 8,
      padding: 16,
      marginTop: 50,
      backgroundColor: "#4F6D7A",
      justifyContent: "center",
      alignItems: 'center',
  }})
