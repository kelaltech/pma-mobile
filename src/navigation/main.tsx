import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProjectDetail from '../screens/projectsDetailScreen'
import MyReports from '../screens/reports/myReportsScreen'
import CheckIn from '../screens/checkInScreen'

const BottomTab = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <BottomTab.Navigator initialRouteName="CheckIn">
            <BottomTab.Screen name="Project" component={ProjectDetail} />
            <BottomTab.Screen name="MyReports" component={MyReports} />
            <BottomTab.Screen name="CheckIn" component={CheckIn} />
        </BottomTab.Navigator>
    )
}


export default MainContainer