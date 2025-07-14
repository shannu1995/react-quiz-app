import React, {useState, useEffect} from "react"
import { API_BASE_URL } from './config';
import { View, Text, ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native';
import { RootStackParamList } from './types';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as cheerio from 'cheerio';

type QuizScreenProps = NativeStackScreenProps<RootStackParamList, 'QuizScreen'>;

const QuizScreen = ({ route, navigation }: QuizScreenProps) => {
    const { difficulty, continent } = route.params;

    const { width } = useWindowDimensions();
    const [countriesList, setCountriesList] = useState<string[]>([]);
    const [citiesList, setCitiesList] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      let newFilterType: string;
      let newFilterValue: string | undefined;

      const formData = new FormData();
      if (difficulty !== "any") {
        newFilterType = "difficulty";
        newFilterValue = difficulty;
        formData.append('difficulty', difficulty || '');
      } else {
        newFilterType = "continent";
        newFilterValue = continent;
        formData.append('continent', continent || '');
      }

      try {
        const response = await fetch(`${API_BASE_URL}/capitals-quiz`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.text(); // Get response as text
        const $ = cheerio.load(data);
        const countries = $('#countries').text().trim();
        const cities = $('#cities').text().trim();
        console.log("countries list:", countries);
        console.log("cities list:", cities);
        setCountriesList(countries.split(',').map(item => item.trim()).filter(item => item !== ''));
        setCitiesList(cities.split(',').map(item => item.trim()).filter(item => item !== ''));
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
        setCountriesList([]);
        setCitiesList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [difficulty, continent]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Quiz Screen</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          <ScrollView style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Countries</Text>
            {countriesList.map((country, index) => (
              <Text key={index}>{country}</Text>
            ))}
          </ScrollView>
          <ScrollView style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Cities</Text>
            {citiesList.map((city, index) => (
              <Text key={index}>{city}</Text>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default QuizScreen;