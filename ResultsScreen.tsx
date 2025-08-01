import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, 'ResultsScreen'>;

const ResultsScreen = ({route, navigation }: ResultsScreenProps) => {
    const {matches, correctAnswers} = route.params;
    return (
        <View>
            <Text>Results Screen</Text>
            <View>
                <Text>Matches:</Text>
                {Object.entries(matches).map(([city, country]) => (
                    <Text key={city}>{city} - {country}</Text>
                ))}
            </View>
            <View>
                <Text>Correct Answers:</Text>
                {Object.entries(correctAnswers).map(([country, city]) => (
                    <Text key={city}>{city} - {country}</Text>
                ))}
            </View>
        </View>
    );
};

export default ResultsScreen;