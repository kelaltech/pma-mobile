import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import TabBarIcon from './components/TabBarIcon';
import PrivateTodos from '../screens/PrivateTodosScreen';
import PublicTodos from '../screens/PublicTodosScreen';
import { Text, View } from 'react-native';
import PublicTodosScreen from '../screens/PublicTodosScreen';

// const PrivateTodosStack = createStackNavigator({
//   Private: PrivateTodos,
// });

const PrivateTodosStack = createStackNavigator();

const PrivateTodosStackScreen = () => {
    return (
        <PrivateTodosStack.Navigator>
            <PrivateTodosStack.Screen name="PrivateTodos" component={PrivateTodos } />
        </PrivateTodosStack.Navigator>
    )
}

PrivateTodosStack.navigationOptions = {
  tabBarLabel: 'Private Todos',
  tabBarIcon: ({ focused }) => (
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
      <PublicTodosStack.Screen name="Public Todos" component={PublicTodos}/>
    </PublicTodosStack.Navigator>
  )
}

PublicTodosStack.navigationOptions = {
  tabBarLabel: 'Public Todos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="public"
    />
  ),
  tabBarOptions: {
    activeTintColor: '#392F76',
    inactiveTitColor: 'gray'
  }
};

const TodosTabNavigator = createBottomTabNavigator({
  PrivateTodosStack,
  PublicTodosStack,
});


const TodosTabNavigatorScreen = () =>{
    
}
export default createAppContainer(TodosTabNavigator);