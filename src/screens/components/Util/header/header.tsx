import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

type HeaderProps = {
  to?: boolean;
  title: string;
};

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={header.container}>
      {props.to ? (
        <View style={header.displayRow}>
          <Icon
            name="arrow-left"
            size={25}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Text style={[header.title]}> {props.title} </Text>
        </View>
      ) : (
        <View style={header.displayRow}>
          <View style={header.displayRow}>
            <Image
              source={require('../../../../assets/image/ECO.png')}
              style={header.img}
            />
            <Text style={[header.title]}> {props.title} </Text>
          </View>
          <View style={[header.displayRow]}>
            <Text style={{fontSize: 16, color: 'white', paddingHorizontal: 12}}>
              {' '}
              Site 2{' '}
            </Text>
            <TouchableOpacity>
              <Text style={{fontSize: 16, color: 'white'}}>Logout </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

const header = StyleSheet.create({
  container: {
    backgroundColor: '#0C1A59',
    height: 64,
    paddingTop: 25,
    paddingHorizontal: 24,
  },
  displayRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    color: 'white',
    paddingHorizontal: 12,
  },
  img: {
    width: 32,
    height: 32,
  },
});
