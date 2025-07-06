import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

const continents = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
];

type ContinentScreenProps = {
  navigation: any;
};

export default function ContinentScreen({ navigation }: ContinentScreenProps) {
  const renderItem = ({ item }: { item: string }) => (
    <Button title={item} onPress={() => { /* Handle continent selection */ }} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Continent</Text>
      <FlatList
        data={continents}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        style={styles.listStyle} // Apply width to the FlatList itself
        contentContainerStyle={styles.buttonContainer} // Apply gap to the content container
        ListFooterComponent={() => (
            <Button
              title="Choose Quiz on Difficulty"
              onPress={() => navigation.navigate('Home')}
              color="#66BB6A"
            />
        )}
      />
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
  listStyle: {
    width: '80%', // Make the FlatList component itself 80% width
  },
  buttonContainer: {
    gap: 10, // This will add spacing between the buttons
  },
});
