import React from 'react';
import ApolloClientProvider from './src/app/apollo';
import AppNavigatorScreen from './src/navigation/appNavigator';

const App = () => {
  return (
    <ApolloClientProvider>
      <AppNavigatorScreen />
    </ApolloClientProvider>
  );
};

export default App;
