import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthLoadingScreen from '../screens/authLoadingScreen';
import AuthScreen from '../screens/authScreen';
import MainContainer from './main';
import {createStackNavigator} from '@react-navigation/stack';
import ReportDetail from '../screens/reports/report-detail/reportDetailScreen';
import AddReports from '../screens/reports/add-report/addReportsScreen';

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
      <AppStackNav.Navigator initialRouteName="Main" headerMode="none">
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
