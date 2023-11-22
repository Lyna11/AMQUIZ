import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
export default function BoutiqueScreen() {

  // Rendu
  return (
    <SafeAreaView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>     
      </View> 
    </SafeAreaView>
  );
  
}

/* Pour CSS */
const styles = StyleSheet.create({
  titleBarContainer: {
    backgroundColor: '#4F6D7A',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 50,
  },
  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 0, // Espace entre l'icône et le texte
  }, 
});