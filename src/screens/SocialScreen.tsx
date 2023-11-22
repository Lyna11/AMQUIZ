import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AmisScreen() {

  // Rendu
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SOCIAL</Text>
    </View>
  );
  
}

/* Pour CSS */
const styles = StyleSheet.create({
  /* TODO */
});