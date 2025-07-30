import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, 'ResultsScreen'>;

const ResultsScreen = ({ navigation }: ResultsScreenProps) => {
    return (
        <View>
            <Text>Results Screen</Text>
        </View>
    );
};

export default ResultsScreen;