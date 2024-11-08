import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { withScreenLevelProviders } from '../app/configs/screen-level-providers';
import Index from '../screens/index';
import Login from '../screens/login/login';
import ReportAdd from '../screens/report-add/report-add';
import ReportDetail from '../screens/report-detail/report-detail';
import MainNavigator from './main-navigator';
import ReportEdit from '../screens/report-edit/report-edit';
export const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
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
        <Stack.Screen
          name="Index"
          component={withScreenLevelProviders(Index)}
          options={{ cardStyleInterpolator: () => ({}) }}
        />
        <Stack.Screen
          name="Login"
          component={withScreenLevelProviders(Login)}
          options={{ cardStyleInterpolator: () => ({}) }}
        />
        <Stack.Screen
          name="Main"
          component={withScreenLevelProviders(MainNavigator)}
          options={{ cardStyleInterpolator: () => ({}) }}
        />
        <Stack.Screen
          name="ReportAdd"
          component={withScreenLevelProviders(ReportAdd)}
        />
        <Stack.Screen
          name="ReportDetail"
          component={withScreenLevelProviders(ReportDetail)}
        />
        <Stack.Screen
          name="ReportEdit"
          component={withScreenLevelProviders(ReportEdit)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
