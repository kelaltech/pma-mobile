/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLoginMutation } from '../../../gen/apollo-types';
import { useAuth } from '../../app/contexts/auth-context';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';
import Button from '../_shared/button/button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [tryLogin] = useLoginMutation();
  const [{}, { login }] = useAuth();
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Validation Error', 'Email is required to login');
      return;
    }
    if (!password) {
      Alert.alert('Validation Error', 'Password is required to login');
      return;
    }

    tryLogin({ variables: { loginInput: { email, password } } })
      .then(({ data, errors }) => {
        const { token, account } = data?.account.login || {};

        if (errors?.length) {
          Alert.alert(
            errors
              .map((e) => e?.name)
              .filter((n) => !!n)
              .join('|') || 'Error',
            errors
              .map((e) => e?.message)
              .filter((n) => !!n)
              .join('\n') || 'Unknown error'
          );
          return;
        }

        if (!account || !token) {
          console.error('Response is missing either token or account info');
          return;
        }

        login(token, account)
          .then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
              history: [],
            });
          })
          .catch((error) => {
            Alert.alert(
              error?.name || 'Error',
              error?.message || 'Unknown error'
            );
          });
      })
      .catch((error) => {
        Alert.alert(error?.name || 'Error', error?.message || 'Unknown error');
      });
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.bg} />

      <View style={styles.card}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />

        <View style={styles.line} />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#808389"
          value={email}
          onChangeText={setEmail}
          textContentType={'emailAddress'}
          autoCompleteType={'email'}
          keyboardType={'email-address'}
        />

        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          textContentType={'password'}
          autoCompleteType={'password'}
        />

        <View style={styles.line} />

        <Button onPress={handleLogin}>Login</Button>
      </View>

      <View style={styles.copyright}>
        <Text
          style={{
            ...textStyles.small,
            color: colors.primary,
          }}
        >
          2020 © Engineering Corporation of Oromia (ECO).
        </Text>
        <Pressable android_ripple={{ color: colors.accent, borderless: true }}>
          <Text
            style={{
              ...textStyles.small,
              color: colors.primary,
            }}
          >
            App is developed and powered by Kelal Tech
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bg: {
    backgroundColor: colors.primary,
    height: 'auto',
    minHeight: 350,
    paddingTop: 48,
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  card: {
    marginTop: -(350 - 48),
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 64,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: colors.light0,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 24,
    width: 140,
    height: 140,
  },
  label: {
    marginBottom: 4,
    ...textStyles.small,
    color: colors.dark1,
  },
  input: {
    marginBottom: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 8,
    ...textStyles.medium,
    lineHeight: 24,
    backgroundColor: colors.light2,
    elevation: 1,
  },
  line: {
    marginTop: 8,
    marginBottom: 32,
    borderBottomColor: colors.light2,
    borderBottomWidth: 1,
  },
  copyright: {
    alignSelf: 'center',
    marginHorizontal: 24,
    marginBottom: 48,
  },
});
