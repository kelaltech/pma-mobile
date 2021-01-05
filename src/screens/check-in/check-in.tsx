/* eslint-disable react-native/no-inline-styles */
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
      <Header title="PMA" />

      <View style={checkInStyle.titleContainer}>
        <Text style={checkInStyle.title}>Check-ins</Text>
      </View>
      <Pressable
        style={checkInStyle.checkInBtn}
        android_ripple={{ color: colors.accent, radius: 168 / 2 }}
        onPressOut={() =>
          Geolocation.getCurrentPosition(
            (info) => alert(JSON.stringify(info, null, 2)) // TODO: save check-in to db
          )
        }
      >
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <Icon name="map-marker-alt" size={45} color="#F59D31" />
          <Text style={{ fontSize: 16, textAlign: 'center', paddingTop: 12 }}>
            CHECK-IN NOW RIGHT HERE{/* TODO: fetch check-ins from db */}
          </Text>
        </View>
      </Pressable>

      <View style={checkInStyle.oldCheckIn}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Wed, Dec 23, 2020
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
