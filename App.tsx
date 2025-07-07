import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContinentScreen from './ContinentScreen';
import AllDataScreen from './AllDataScreen';
import QuizScreen from './QuizScreen';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeScreenProps = {
  navigation: any;
};

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Quiz On Difficulty</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="View Existing Data"
          onPress={() => navigation.navigate("All Current Data")}
          color="#66BB6A" />
        <Button title="Easy" onPress={() => navigation.navigate("QuizScreen", {difficulty: 'easy', continent: 'all'})} />
        <Button title="Hard" onPress={() => navigation.navigate("QuizScreen", {difficulty: 'hard', continent: 'all'})} />
        <Button title="Random" onPress={() => navigation.navigate("QuizScreen", {difficulty: 'random', continent: 'all'})} />
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
        <Stack.Screen name="Continent" component={ContinentScreen} options={{ title: 'Select Continent' }} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ title: 'Quiz' }} />
        <Stack.Screen name="All Current Data" component={AllDataScreen} options={{ title: 'All Current Data' }} />
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
