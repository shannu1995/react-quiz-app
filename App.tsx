import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContinentScreen from './ContinentScreen';

const Stack = createNativeStackNavigator();

type HomeScreenProps = {
  navigation: any;
};

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Quiz On Difficulty</Text>
      <View style={styles.buttonContainer}>
        <Button title="Easy" onPress={() => {}} />
        <Button title="Hard" onPress={() => {}} />
        <Button title="Random" onPress={() => {}} />
        <Button
          title="Choose Quiz on Continent"
          onPress={() => navigation.navigate('Continent')}
          color="#66BB6A"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Continent" component={ContinentScreen} options={{ title: 'Back Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
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
