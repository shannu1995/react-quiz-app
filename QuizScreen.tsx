import React, {useState, useEffect} from "react"
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { RootStackParamList } from './types';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type QuizScreenProps = NativeStackScreenProps<RootStackParamList, 'QuizScreen'>;

const QuizScreen = ({ route, navigation }: QuizScreenProps) => {
    const { difficulty, continent } = route.params;

    const [quizData, setQuizData] = useState<{
    filter_value: string;
    filter_type: string;
    countries: string[];
    scrambled_cities: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Difficulty:', difficulty);
    console.log('Continent:', continent);
  }, [difficulty, continent]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Quiz Screen</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {difficulty && <Text>Difficulty: {difficulty}</Text>}
          {continent && <Text>Continent: {continent}</Text>}
        </>
      )}
    </View>
  );
};

export default QuizScreen;