import React from 'react';
import { View, StyleSheet, Image, Text, ImageProps } from 'react-native';

type RoundedSquareProps = {
    montant: string,
    image: ImageProps['source'],
    piece: ImageProps['source'],
}


const RoundedSquare: React.FC<RoundedSquareProps> = ({ montant, image, piece }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
         source={image}// Remplacez le chemin par le chemin réel de votre image
          style={styles.image}
        />
         <View style={styles.content2}>
            <Text style={styles.text}>{montant}</Text>
            <Image
            source={piece}// Remplacez le chemin par le chemin réel de votre image
          style={styles.image2}
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 8,
    width: 100,
    height: 200,
    backgroundColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  content2: {
    flexDirection : 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,  // Ajustez la largeur de l'image selon vos besoins
    height: 90,  // Ajustez la hauteur de l'image selon vos besoins
    marginBottom: 8,
  },
  image2: {
    width: 15,  // Ajustez la largeur de l'image selon vos besoins
    height: 15,  // Ajustez la hauteur de l'image selon vos besoins
    marginLeft: 3
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default RoundedSquare;