import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QuizzScreen from './QuizzScreen';

export default function HomeScreen() {

  // Rendu
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HOME</Text>
    </View>
  );

}

/* Pour CSS */
const styles = StyleSheet.create({
  /* TODO */
});