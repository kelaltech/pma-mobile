import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const AuthLoadingScreen = ({ navigation }: any) => {
  const authFunction = async () => {
    const session = await AsyncStorage.getItem('todo');
    if (session) {
      // TODO
    } else {
      // navigation.navigate('Auth')
    }
  };

  React.useEffect(() => {
    authFunction();
  }, []);

  return (
    <View>
      <Text> Loading Auth </Text>
    </View>
  );
};

export default AuthLoadingScreen;
