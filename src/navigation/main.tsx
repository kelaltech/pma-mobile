import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import OnlineUsers from '../screens/UsersScreen';
import LogoutScreen from '../screens/LogoutScreen';
import TodosTabs from './TodosTabNavigator';

const UsersStack = createStackNavigator();

const MyUSerStack = () => {
    return (
        <UsersStack.Navigator>
            <UsersStack.Screen name="OnlineUsers" component={OnlineUsers} />
        </UsersStack.Navigator>
    )
}

// // Drawer navigator
// const Drawer = createDrawerNavigator({
//     Todos: {
//         screen: TodosTabs
//     },
//     Users: {
//         screen: UsersStack
//     },
//     Logout: {
//         screen: LogoutScreen
//     },
// }, {
//     contentOptions: {
//         activeTintColor: '#39235A',
//         inactiveTintColor: 'black',
//         inactiveBackgroundColor: 'transparent',
//         labelStyle: {
//             fontSize: 15,
//             marginLeft: 10,
//         },
//     },
// });

const Tab = createDrawerNavigator();

// function MyTabs() {
//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="Home" component={TodosTabs} />
//             <Tab.Screen name="Settings" component={MyUSerStack} />
//             <Tab.Screen name="Settings" component={LogoutScreen} />
//         </Tab.Navigator>
//     );
// }

const MainContainer = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={TodosTabs} />
                <Tab.Screen name="Settings" component={MyUSerStack} />
                <Tab.Screen name="Settings" component={LogoutScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainContainer