import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native';

const AuthLoadingScreen = () => {
    const navigation = useNavigation()
    const authFunction = async () => {
        const session = await AsyncStorage.getItem('todo')
        if (session) {
             navigation.navigate('Main')   
        }
        else {
            navigation.navigate('Auth')
        }
    }
  };

//   React.useEffect(() => {
//     authFunction();
//   }, []);

  return (
    <View>
      <Text> Loading Auth </Text>
    </View>
  );
};

export default AuthLoadingScreen;
