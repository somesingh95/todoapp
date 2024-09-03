import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <AppNavigator />
  
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
export default App;