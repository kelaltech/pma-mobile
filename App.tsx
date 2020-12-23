
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import ApolloClientProvider from './src/app/apollo'
import MainContainer from './src/navigation/main' 


const App = () => {
  return ( 
    <ApolloClientProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <ScrollView>
            <MainContainer/>

          </ScrollView>
      </SafeAreaView> 
    </ApolloClientProvider>
  );
};

export default App;