import React from 'react';
import { StatusBar } from 'react-native';
import { colors } from '../assets/styles/colors';
import AppNavigator from '../navigation/app-navigator';
import ApolloClientProvider from './providers/apollo-client-provider';
import AuthProvider from './providers/auth-provider';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />

      <ApolloClientProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ApolloClientProvider>
    </>
  );
};

export default App;
