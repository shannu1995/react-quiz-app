import React, {useState, useEffect} from 'react';
import { Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { API_BASE_URL } from './config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type AllDataScreenProps = NativeStackScreenProps<RootStackParamList, 'All Current Data'>;


export default function AllDataScreen({}: AllDataScreenProps) {
    const { width } = useWindowDimensions();
    const [data, setData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/view-existing-data`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.text(); // Change to .text()
                setData(result);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.header}>All Data Screen</Text>
      {isLoading ? (
        <Text>Loading data...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : data ? (
        <RenderHtml
          contentWidth={width}
          source={{ html: data }}
        />
      ) : (
        <Text>No data available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});