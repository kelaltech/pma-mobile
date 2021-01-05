/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
    <View style={header.container}>
      <Icon
        name="arrow-left"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <Text style={[header.title]}> {props.title} </Text>
    </View>
  ) : (
    <View style={header.container}>
      <Image
        source={require('../../../assets/image/ECO.png')}
        style={header.img}
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
    backgroundColor: '#0C1A59',
  },
  img: {
    width: 32,
    height: 32,
  },
  title: {
    ...textStyles.h3,
    marginLeft: 16,
    lineHeight: 32,
    color: 'white',
  },
  space: {
    flex: 1,
  },
  actions: {
    ...textStyles.medium,
    lineHeight: 32,
    marginLeft: 24,
    color: 'white',
  },
});
