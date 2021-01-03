import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProjectDetail from '../screens/project/projectsDetailScreen'
import MyReports from '../screens/reports/my-report/myReportsScreen'
import CheckIn from '../screens/checkin/checkInScreen'
import { Text } from 'react-native';

const BottomTab = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <BottomTab.Navigator initialRouteName="Project" tabBarOptions={{ showLabel: false, activeBackgroundColor: '#F59D31' }} >
            <BottomTab.Screen name="Project" component={ProjectDetail} options={{
                tabBarIcon: () => (
                    <Text style={{ color: '#5A5A5A', alignSelf: 'center', fontSize: 16 }}> Project </Text>
                )
            }} />
            <BottomTab.Screen name="MyReports" component={MyReports} options={{
                tabBarIcon: () => (
                    <Text style={{ color: '#5A5A5A', alignSelf: 'center', fontSize: 16 }}> My Reports </Text>
                )
            }} />
            <BottomTab.Screen name="CheckIn" component={CheckIn} options={{
                tabBarIcon: () => (
                    <Text style={{ color: '#5A5A5A', alignSelf: 'center', fontSize: 16 }}> Check-in </Text>
                )
            }} />
        </BottomTab.Navigator>
    )
}


export default MainContainer