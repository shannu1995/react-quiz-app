import React, {useState, useEffect} from "react"
import { API_BASE_URL } from './config';
import { View, Text, ActivityIndicator, ScrollView, useWindowDimensions, TouchableOpacity, Button} from 'react-native';
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
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [matches, setMatches] = useState<{ [key: string]: string }>({});

    const handleCountryPress = (country: string) => {
        setSelectedCountry(country);
      };
    const handleCityPress = (city: string) =>{
      if (selectedCountry) {
        setMatches(prevMatch => ({
          ...prevMatch,
          [city]: selectedCountry
        }));
        setSelectedCountry(null);
      }
    };

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

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <Text style={{fontWeight: 'bold'}}>Quiz Screen</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 16, paddingBottom: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          <ScrollView style={{ flex: 1}}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Countries</Text>
            {countriesList.map((country, index) => (
            <TouchableOpacity
              key={country}
              onPress={() => handleCountryPress(country)}
              style={{
                width: '100%',
                borderWidth: 2,
                borderColor: selectedCountry === country ? 'blue' : '#4CAF50',
                padding: 10,
                marginBottom: 10,
                backgroundColor: selectedCountry === country ? '#BBDEFB' : '#E8F5E9',
                borderRadius: 6,
              }}
            >
              <Text>{country}</Text>
            </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView style={{ flex: 1, marginLeft: 16 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Cities</Text>
            {citiesList.map((city, index) => (
            <TouchableOpacity 
            key={city} 
            onPress={() => handleCityPress(city)}
            style={{
                width: '100%',
                borderWidth: 2,
                borderColor: '#4CAF50',
                padding: 10,
                marginBottom: 10,
                backgroundColor: '#E3F2FD',
                borderRadius: 6,
              }}>
              <Text>{city}</Text>
              <Text style={{ fontStyle: 'italic', marginTop: 5, color: '#555' }}>
                Matched: {matches[city] || 'None'}
              </Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </ScrollView>
      )}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Submit">
        </Button>
      </View>
    </ScrollView>
  );
};

export default QuizScreen;