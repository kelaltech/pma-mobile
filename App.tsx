
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import ApolloClientProvider from './src/app/apollo'
import AppNavigatorScreen from './src/navigation/appNavigator'

const App = () => {
  return (
    <ApolloClientProvider>
      <AppNavigatorScreen />
    </ApolloClientProvider>
  );
};

export default App;