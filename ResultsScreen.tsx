import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, 'ResultsScreen'>;

const ResultsScreen = ({route, navigation }: ResultsScreenProps) => {
    const {matches, correctAnswers} = route.params;
    const swappedMatches = Object.fromEntries(
        Object.entries(matches).map(([key, value]) => [value, key])
    );
    return (
        <View>
            <Text>Results Screen</Text>
            <View>
                <Text>Matches:</Text>
                {Object.entries(swappedMatches).map(([city, country]) => (
                    <Text key={city}>{city} - {country}</Text>
                ))}
            </View>
            <View>
                <Text>Correct Answers:</Text>
                {Object.entries(correctAnswers).map(([city, country]) => (
                    <Text key={city}>{city} - {country}</Text>
                ))}
            </View>
        <View>
            <Button
                title="Back to Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
        </View>
    );
};

export default ResultsScreen;