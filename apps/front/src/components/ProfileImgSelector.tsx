import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Dimensions} from 'react-native';


const ProfileImgSelector: React.FC = () => {
    const [active, setActive] = useState(0);

    

const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;


interface DATA_IMG_1 {
  url: string,
  nom: string
}

const DATA_IMG_1 = [
{ 
    url: 'https://i.postimg.cc/zf7Lbdx4/IMG-2135.png',
    nom: 'img1'
},
{
    url: 'https://i.postimg.cc/zf7Lbdx4/IMG-2135.png',
    nom: 'img2'
},
{
    url: 'https://i.postimg.cc/zf7Lbdx4/IMG-2135.png',
    nom: 'img3'
},
{
    url: 'https://i.postimg.cc/zf7Lbdx4/IMG-2135.png',
    nom: 'img4'
}
]

const DATA_IMG_2 = [
{
    url: 'https://cdn.discordapp.com/attachments/1166801102482702437/1176882339796746323/20231122_144951.jpg?ex=65707c17&is=655e0717&hm=46a88162127963de0542d708c7f7fb6429a586bb97b35814f052ddafaf93664c&',
    nom: 'img1'
},
{
    url: 'https://cdn.discordapp.com/attachments/1166801102482702437/1176882339796746323/20231122_144951.jpg?ex=65707c17&is=655e0717&hm=46a88162127963de0542d708c7f7fb6429a586bb97b35814f052ddafaf93664c&',
    nom: 'img2'
},
{
    url: 'https://cdn.discordapp.com/attachments/1166801102482702437/1176882339796746323/20231122_144951.jpg?ex=65707c17&is=655e0717&hm=46a88162127963de0542d708c7f7fb6429a586bb97b35814f052ddafaf93664c&',
    nom: 'img3'
},
{
    url: 'https://cdn.discordapp.com/attachments/1166801102482702437/1176882339796746323/20231122_144951.jpg?ex=65707c17&is=655e0717&hm=46a88162127963de0542d708c7f7fb6429a586bb97b35814f052ddafaf93664c&',
    nom: 'img4'
}
]

    {/* const [active, setActive] = useState(0); */}


return (

    <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>

            <Text style={{fontWeight:'bold', marginTop:50, fontSize:24, textAlign:'center'}}>ONE PIECE</Text>

            <ScrollView 
            snapToInterval={screenwidth} 
            decelerationRate='fast'
            alwaysBounceHorizontal={true}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.displayImgSelector}>
            {DATA_IMG_1.map(item => (
                <View key={item.nom}>
                {/* <Text>{item.nom}</Text> */}
                <Image
                source={{uri:item.url}}
                style={{
                    width: screenwidth/3,
                    aspectRatio: 1/1,  
                    resizeMode: 'cover',
                    marginRight: 30
                }}
                />
                </View>
            ))}
            </ScrollView>

            <Text style={{fontWeight:'bold', marginTop:50, fontSize:24, textAlign:'center'}}>EVANGELION</Text>

            <ScrollView 
            snapToInterval={screenwidth} 
            decelerationRate='fast'
            alwaysBounceHorizontal={true}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.displayImgSelector}>
            {DATA_IMG_2.map(item => (
                <View key={item.nom}>
                {/* <Text>{item.nom}</Text> */}
                <Image
                source={{uri:item.url}}
                style={{
                    width: screenwidth/3,
                    aspectRatio: 1/1,  
                    resizeMode: 'cover',
                    marginRight: 30
                }}
                />
                </View>
            ))}
            </ScrollView>


        </View>
        </ScrollView>
    </SafeAreaView>
    
)}

    
const styles = StyleSheet.create({
    container: {
        width: '100%',
        margin: 'auto',
    },

    displayImgSelector: {
        marginTop:40,
    },

    displayImgSelectorOff: {
        display:'none'
    }
})


export default ProfileImgSelector;