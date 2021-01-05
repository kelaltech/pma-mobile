import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProjectDetail from '../screens/project-detail/project-detail';
import MyReports from '../screens/my-reports/my-reports';
import CheckIn from '../screens/check-in/check-in';
import { Text } from 'react-native';

const BottomTab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="MyReports"
      tabBarOptions={{ showLabel: false, activeBackgroundColor: '#F59D31' }}
    >
      <BottomTab.Screen
        name="Project"
        component={ProjectDetail}
        options={{
          tabBarIcon: () => (
            <Text
              style={{ color: '#5A5A5A', alignSelf: 'center', fontSize: 16 }}
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
          tabBarIcon: () => (
            <Text
              style={{ color: '#5A5A5A', alignSelf: 'center', fontSize: 16 }}
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
          tabBarIcon: () => (
            <Text
              style={{ color: '#5A5A5A', alignSelf: 'center', fontSize: 16 }}
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
