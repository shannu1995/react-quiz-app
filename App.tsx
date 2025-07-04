import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Quiz On Difficulty</Text>
      <View style={styles.buttonContainer}>
        <Button title="Easy" onPress={() => {}} />
        <Button title="Hard" onPress={() => {}} />
        <Button title="Random" onPress={() => {}} />
        <Button title="Choose Quiz on Continent" onPress={() => {}} color="#66BB6A" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    gap: 10,
  },
});
