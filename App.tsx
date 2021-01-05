import React from 'react';
import { StatusBar } from 'react-native';
import ApolloClientProvider from './src/app/apollo';
import { colors } from './src/assets/styles/colors';
import AppNavigatorScreen from './src/navigation/app-navigator';

const App = () => {
  return (
    <ApolloClientProvider>
      <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />

      <AppNavigatorScreen />
    </ApolloClientProvider>
  );
};

export default App;
