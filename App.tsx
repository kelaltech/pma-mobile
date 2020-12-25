
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import ApolloClientProvider from './src/app/apollo'
import AppNavigatorScreen from './src/navigation/appNavigator' 


const App = () => {
  return ( 
    <ApolloClientProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <ScrollView>
          <AppNavigatorScreen/> 
          </ScrollView>
      </SafeAreaView> 
    </ApolloClientProvider>
  );
};

export default App;