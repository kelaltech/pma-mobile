import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../_shared/header/header';
import Geolocation from '@react-native-community/geolocation';
import checkInStyle from './check-in-style';
import { colors } from '../../assets/styles/colors';

const CheckIn = () => {
  return (
    <>
      <Header title="Check in" />
      <View style={checkInStyle.titleContainer}>
        <Text style={checkInStyle.title}>My check-ins</Text>
      </View>
      <View style={checkInStyle.checkInBtn}>
        <Pressable
          android_ripple={{ color: colors.accent }}
          onPressOut={() =>
            Geolocation.getCurrentPosition((info) => console.log(info))
          }
        >
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: 'white',
            }}
          >
            <Icon name="map-marker-alt" size={45} color="#F59D31" />
            <Text style={{ fontSize: 16, textAlign: 'center', paddingTop: 12 }}>
              CHECK-IN NOW RIGHT HERE
            </Text>
          </View>
        </Pressable>
      </View>

      <View style={checkInStyle.oldCheckIn}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {' '}
          Wed, Dec 23, 2020{' '}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text> TIME: 3:15pm </Text>
          <Text> LOCATION: 38.146, 4.284 </Text>
        </View>
      </View>
    </>
  );
};

export default CheckIn;
