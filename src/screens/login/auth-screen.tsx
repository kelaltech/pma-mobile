import React, { useState } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
// import jwtDecoder from 'jwt-decode'
import { useNavigation } from '@react-navigation/native';
import Login from './login';
import { login, loginProps } from '../../app/auth-actions';
import AsyncStorage from '@react-native-community/async-storage';
import { useLoginMutation } from '../../../gen/apollo-types';

const AuthScreen = () => {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [loginProps, setLoginProps] = useState({ email: '', password: '' });

  const [tryLogin] = useLoginMutation();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topPart} />
      <Login submit={tryLogin} />
      <View style={styles.copyRight}>
        <Text style={{ fontSize: 14, color: '#0C1A59' }}>
          2020 © Engineering Corporation of Oromia (ECO). App is developed and
          powered by Kelal Tech
        </Text>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 100,
    paddingBottom: 20,
  },
  copyRight: {
    paddingVertical: 20,
    paddingHorizontal: 48,
  },
  topPart: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: '50%',
    backgroundColor: '#0C1A59',
  },
});
