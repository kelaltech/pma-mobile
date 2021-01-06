/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../app/contexts/auth-context';
import BackButton from '../../../assets/icons/back-button.svg';
import { colors } from '../../../assets/styles/colors';
import { textStyles } from '../../../assets/styles/text-styles';

type HeaderProps = {
  to?: boolean;
  title: string;
};

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();

  const [{ account }, { logout }] = useAuth();

  const handleLogout = useCallback(() => {
    logout().then(() =>
      navigation.reset({ index: 0, routes: [{ name: 'Login' }], history: [] })
    );
  }, [logout, navigation]);

  return props.to ? (
    <View style={[header.container, { elevation: 3 }]}>
      <Pressable
        android_ripple={{ color: colors.light0, borderless: true }}
        onPressOut={() => navigation.goBack()}
      >
        <BackButton style={header.icon} />
      </Pressable>

      <Text style={header.title}>{props.title}</Text>
    </View>
  ) : (
    <View style={header.container}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={header.icon}
      />
      <Text style={header.wordMark}>{props.title}</Text>

      <View style={header.space} />

      <Text style={header.actions}>{account?.name}</Text>
      <Pressable
        android_ripple={{ color: colors.light0, borderless: true }}
        onPressOut={handleLogout}
      >
        <Text style={header.actions}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Header;

const header = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.primary,
  },
  icon: {
    width: 32,
    height: 32,
  },
  wordMark: {
    ...textStyles.h3,
    marginLeft: 16,
    lineHeight: 32,
    color: colors.light0,
  },
  title: {
    ...textStyles.h5,
    marginLeft: 16,
    lineHeight: 32,
    color: colors.light0,
  },
  space: {
    flex: 1,
  },
  actions: {
    ...textStyles.medium,
    lineHeight: 32,
    marginLeft: 24,
    color: colors.light0,
  },
});
