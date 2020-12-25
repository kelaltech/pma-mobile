
import * as React from 'react'
import { createSwitchNavigator } from '@react-navigation/compat';
import { NavigationContainer } from '@react-navigation/native';
import AuthLoadingScreen from '../screens/authLoadingScreen';
import AuthScreen from '../screens/authScreen';
import App from './main';

const AppNavigator = createSwitchNavigator(
  {
    // For authentication
    Auth: AuthScreen,
    // For fetching and validating session
    Loading: AuthLoadingScreen,
    // Main app
    Main: App
  },
  {
    initialRouteName: 'Loading'
  }
);


const AppNavigatorScreen = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}
export default AppNavigatorScreen;