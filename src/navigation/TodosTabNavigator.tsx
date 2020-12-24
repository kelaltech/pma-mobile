import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import TabBarIcon from './components/TabBarIcon';
import PrivateTodosScreen from '../screens/PrivateTodosScreen';
import { Text, View } from 'react-native';
import PublicTodosScreen from '../screens/PublicTodosScreen';
import { NavigationContainer } from '@react-navigation/native';

// const PrivateTodosStack = createStackNavigator({
//   Private: PrivateTodos,
// });

const PrivateTodosStack = createStackNavigator();

const PrivateTodosStackScreen = () => {
    return (
        <PrivateTodosStack.Navigator>
        <PrivateTodosStack.Screen name="PrivateTodos" component={PrivateTodosScreen} />
        </PrivateTodosStack.Navigator>
    )
}

PrivateTodosStackScreen.navigationOptions = {
  tabBarLabel: 'Private Todos',
  tabBarIcon: () => (
   <View> <Text>  Private Todo </Text> </View>
  ),
  tabBarOptions: {
    activeTintColor: '#392F76',
    inactiveTitColor: 'gray'
  }
};

const PublicTodosStack = createStackNavigator();

const PublicTodosStackScreen = () => {
  return(
    <PublicTodosStack.Navigator>
      <PublicTodosStack.Screen name="Public Todos" component={PublicTodosScreen}/>
    </PublicTodosStack.Navigator>
  )
}

PublicTodosStackScreen.navigationOptions = {
  tabBarLabel: 'Public Todos',
  tabBarIcon: () => (
    <View> <Text>  Private Todo </Text> </View>

  ),
  tabBarOptions: {
    activeTintColor: '#392F76',
    inactiveTitColor: 'gray'
  }
};

const TodosTabNavigator = createBottomTabNavigator();


const TodosTabNavigatorScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <TodosTabNavigator.Navigator>
        <TodosTabNavigator.Screen name="Private" component={PrivateTodosStackScreen} />
        <TodosTabNavigator.Screen name="Public" component={PublicTodosStackScreen} />
      </TodosTabNavigator.Navigator>
    </NavigationContainer>
  )
}
export default TodosTabNavigatorScreen;