/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from '../../../assets/icons/back-button.svg';
import { colors } from '../../../assets/styles/colors';
import { textStyles } from '../../../assets/styles/text-styles';

type HeaderProps = {
  to?: boolean;
  title: string;
};

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();

  const handleLogout = useCallback(() => {
    // TODO: initiate logout
  }, []);

  return props.to ? (
    <View style={[header.container, { elevation: 1 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackButton style={header.icon} />
      </TouchableOpacity>

      <Text style={[header.title]}>{props.title}</Text>
    </View>
  ) : (
    <View style={header.container}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={header.icon}
      />
      <Text style={[header.title]}>{props.title}</Text>

      <View style={header.space} />

      <Text style={header.actions}>{/*TODO: username*/}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={header.actions}>Logout</Text>
      </TouchableOpacity>
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
  title: {
    ...textStyles.h3,
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
