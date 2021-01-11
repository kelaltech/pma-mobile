import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Index from '../screens/index';
import Login from '../screens/login/login';
import ReportAdd from '../screens/report-add/report-add';
import ReportDetail from '../screens/report-detail/report-detail';
import MainNavigator from './main-navigator';

export const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
        <Stack.Screen
          name="Index"
          component={Index}
          options={{ cardStyleInterpolator: () => ({}) }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ cardStyleInterpolator: () => ({}) }}
        />
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{ cardStyleInterpolator: () => ({}) }}
        />
        <Stack.Screen name="ReportAdd" component={ReportAdd} />
        <Stack.Screen name="ReportDetail" component={ReportDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
