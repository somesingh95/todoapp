import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details', { info: 'Some information' })}
    />
    <Button
      title="Go to To-Do List"
      onPress={() => navigation.navigate('Todo')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
