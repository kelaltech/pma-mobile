import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthLoadingScreen from '../screens/_shared/auth-loading/auth-loading-screen';
import AuthScreen from '../screens/login/auth-screen';
import MainContainer from './main';
import { createStackNavigator } from '@react-navigation/stack';
import ReportDetail from '../screens/report-detail/report-detail';
import AddReports from '../screens/report-add/report-add';

const AppStackNav = createStackNavigator();

// const AppNavigator = createSwitchNavigator(
//   {
//     // For authentication
//     Auth: AuthScreen,
//     // For fetching and validating session
//     Loading: AuthLoadingScreen,
//     // Main app
//     Main: App
//   },
//   {
//     initialRouteName: 'Main'
//   }
// );

const AppNavigatorScreen = () => {
  return (
    <NavigationContainer>
      <AppStackNav.Navigator
        initialRouteName="Main"
        headerMode="none"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyle: { elevation: 6 },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <AppStackNav.Screen name="AddReport" component={AddReports} />
        <AppStackNav.Screen name="ReportDetail" component={ReportDetail} />
        <AppStackNav.Screen name="Main" component={MainContainer} />
        <AppStackNav.Screen name="Loading" component={AuthLoadingScreen} />
        <AppStackNav.Screen name="Auth" component={AuthScreen} />
      </AppStackNav.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigatorScreen;
