import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Dimensions} from 'react-native';
import ProfileImgSelector from '../components/ProfileImgSelector';
import ProfileUserInfos from '../components/ProfileUserInfos';
import ProfileUserEdit from '../components/ProfileUserEdit';
import { useQuery } from 'react-query';
import { getQuizz } from '../api/endpoints';

export default function ProfilScreen() {

  const [active, setActive] = useState(0);

  const { isLoading, error, data } = useQuery('quizz', getQuizz);

  console.log('DATA', data);


  // Rendu
  return (
    
    <SafeAreaView style={{ flex: 1}}>

    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#DBE9EE' }}>
        <View style={styles.mainContainer}>

          <ProfileUserInfos/>

          <View style={styles.userProfilePicSkills}>
              <TouchableOpacity 
              onPress={() => {setActive(0)}}
              style={active === 0 ? styles.userProfilePicSkillsFirstChildActive : styles.userProfilePicSkillsFirstChild}>
                  <Text>Images</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => {setActive(1)}}
              style={active === 1 ? styles.userProfilePicSkillsLastChildActive : styles.userProfilePicSkillsLastChild}>
                  <Text >Skills</Text>
              </TouchableOpacity>
          
          </View>

          {active === 0 && <ProfileImgSelector/>}
          {active === 1 && <ProfileUserEdit/>}

        </View>
      </View>
      </ScrollView>

    </SafeAreaView>

  )}

/* Pour CSS */
const styles = StyleSheet.create({
  /* TODO */
  mainContainer: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    marginBottom: 50
  },

  userProfilePicSkills: {
    flexDirection: 'row',
    marginTop: 40,
    height: 60,
    width: '100%',
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'space-between',
    padding: 3,
},

userProfilePicSkillsFirstChild: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
},

userProfilePicSkillsFirstChildActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',

    backgroundColor: '#9bc1d3',
    borderRadius: 13,
    borderWidth: 2,
},

userProfilePicSkillsLastChild: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
},

userProfilePicSkillsLastChildActive: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',

    backgroundColor: '#9bc1d3',
    borderRadius: 13,
    borderWidth: 2,
},
});
