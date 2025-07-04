import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [backendStatus, setBackendStatus] = useState('Checking backend...');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('https://geography-quiz.net/index');
        if (response.ok) {
          setBackendStatus(`Backend OK`);
        } else {
          setBackendStatus(`Backend Error: ${response.status} ${response.statusText}`);
        }
      } catch (error: any) {
        setBackendStatus(`Network Error: ${error.message}`);
      }
    };

    checkBackend();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{backendStatus}</Text>
      {backendStatus === 'Checking backend...' && <ActivityIndicator size="large" color="#0000ff" />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  statusText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
