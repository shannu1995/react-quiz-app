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
    const fetchQuizData = async () => {
      setLoading(true);
      let newFilterType: string;
      let newFilterValue: string | undefined;

      if (difficulty !== "any") {
        newFilterType = "difficulty";
        newFilterValue = difficulty;
      } else {
        newFilterType = "continent";
        newFilterValue = continent;
      }

      setQuizData({
        filter_value: newFilterValue || '',
        filter_type: newFilterType,
        countries: [],
        scrambled_cities: []
      });
      setLoading(false);
    };

    fetchQuizData();
  }, [difficulty, continent]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Quiz Screen</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        difficulty == "any" ? (
          <Text>Quiz Chosen on continent: {continent}</Text>
        ) : (
          <Text>Quiz Chosen on difficulty: {difficulty}</Text>
        )
      )}
    </View>
  );
};

export default QuizScreen;