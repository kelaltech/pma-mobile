import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text } from 'react-native';
import { colors } from '../assets/styles/colors';
import { textStyles } from '../assets/styles/text-styles';
import CheckIn from '../screens/check-in/check-in';
import MyReports from '../screens/my-reports/my-reports';
import ProjectDetail from '../screens/project-detail/project-detail';

const BottomTab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="MyReports"
      tabBarOptions={{
        showLabel: false,
        activeBackgroundColor: colors.secondary,
        inactiveBackgroundColor: colors.light0,
        style: { height: 69 },
        tabStyle: { height: 69 },
      }}
    >
      <BottomTab.Screen
        name="Project"
        component={ProjectDetail}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={[
                textStyles.small,
                { color: focused ? colors.light0 : colors.dark1 },
              ]}
            >
              PROJECT
            </Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="MyReports"
        component={MyReports}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={[
                textStyles.small,
                { color: focused ? colors.light0 : colors.dark1 },
              ]}
            >
              MY REPORTS
            </Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="CheckIn"
        component={CheckIn}
        options={{
          tabBarIcon: ({ focused }) => (
            <Text
              style={[
                textStyles.small,
                { color: focused ? colors.light0 : colors.dark1 },
              ]}
            >
              CHECK-INS
            </Text>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainContainer;
