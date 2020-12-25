import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';

const UsersStack = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <NavigationContainer independent={true}>
            <UsersStack.Navigator>
                <UsersStack.Screen name="Project" component={LoginScreen} />
                <UsersStack.Screen name="Reports" component={LoginScreen} />
                <UsersStack.Screen name="checkin" component={LoginScreen} />
            </UsersStack.Navigator>
        </NavigationContainer>
    )
}

export default MainContainer