import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text } from 'react-native';
import { withScreenLevelProviders } from '../app/configs/screen-level-providers';
import { colors } from '../assets/styles/colors';
import { textStyles } from '../assets/styles/text-styles';
import CheckIns from '../screens/check-ins/check-ins';
import MyReports from '../screens/my-reports/my-reports';
import ProjectDetail from '../screens/project-detail/project-detail';

const BottomTab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="MyReports"
      tabBarOptions={{
        showLabel: false,
        activeBackgroundColor: colors.accent,
        inactiveBackgroundColor: colors.light0,
        style: { height: 69 },
        tabStyle: { height: 69 },
      }}
    >
      <BottomTab.Screen
        name="Project"
        component={withScreenLevelProviders(ProjectDetail)}
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
        component={withScreenLevelProviders(MyReports)}
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
        name="CheckIns"
        component={withScreenLevelProviders(CheckIns)}
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

export default MainNavigator;
