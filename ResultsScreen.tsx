import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, 'ResultsScreen'>;

const ResultsScreen = ({route, navigation }: ResultsScreenProps) => {
    const {matches, correctAnswers} = route.params;
    const swappedMatches = Object.fromEntries(
        Object.entries(matches).map(([key, value]) => [value, key])
    );
    return (
    <ScrollView>
        <View style={styles.header}>
            <Text style={styles.headerCell}>Country</Text>
            <Text style={styles.headerCell}>Your Answer</Text>
            <Text style={styles.headerCell}>Correct Answer</Text>
            <Text style={styles.headerCell}>Result</Text>
        </View>
        {Object.entries(correctAnswers).map(([country, city]) => {
            const userAnswer = swappedMatches[country] || 'No Answer';
            const correctAnswer = correctAnswers[country];
            let result: string;
            if (userAnswer === 'No Answer' || userAnswer !== city) {
                result = 'Incorrect';
            } else {
                result = 'Correct';
            }
            return (
                <View key={country} style={styles.row}>
                    <Text style={styles.cell}>{country}</Text>
                    <Text style={styles.cell}>{userAnswer}</Text>
                    <Text style={styles.cell}>{correctAnswer}</Text>
                    <Text style={styles.cell}>{result}</Text>
                </View>
            );
        })}
        <View>
            <Button
                title="Back to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    paddingVertical: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default ResultsScreen;