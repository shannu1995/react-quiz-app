import React, {useState, useEffect} from "react"
import { API_BASE_URL } from './config';
import { View, Text, ActivityIndicator, ScrollView, useWindowDimensions, TouchableOpacity} from 'react-native';
import { RootStackParamList } from './types';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { parseDocument } from 'htmlparser2';
import { DomUtils } from 'htmlparser2';

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
        const dom = parseDocument(data);
        const countriesNode = DomUtils.getElementById('countries',dom.children)
        const citiesNode = DomUtils.getElementById('cities',dom.children);

        const countries = countriesNode ? DomUtils.textContent(countriesNode).trim() : '';
        const cities = citiesNode ? DomUtils.textContent(citiesNode).trim() : '';

        console.log("countries list:", countries);
        console.log("cities list:", cities);
        setCountriesList(countries.split('\n').map(item => item.trim()).filter(item => item !== ''));
        setCitiesList(cities.split('\n').map(item => item.trim()).filter(item => item !== ''));
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
  const onDropCountryToCities = (event: any) => {
    const draggedCountry = event.dragged.payload as string;

    // Remove dragged country from countriesList
    setCountriesList(prev => prev.filter(item => item !== draggedCountry));

    // Add dragged country to citiesList
    setCitiesList(prev => [...prev, draggedCountry]);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontWeight: 'bold'}}>Quiz Screen</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flexDirection: 'row', columnGap: 30 }}>
          <ScrollView style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Countries</Text>
            {countriesList.map((country, index) => (
            <View key={country} style={{width:200, borderWidth:2, borderColor:'#4CAF50', padding:10}}>
            <Text>{country}</Text>
            </View>
            ))}
          </ScrollView>
          <ScrollView style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Cities</Text>
            {citiesList.map((city, index) => (
            <View key={city} style={{width:200, borderWidth:2, borderColor:'#4CAF50', padding:10}}>
              <Text>{city}</Text>
            </View>
          ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default QuizScreen;