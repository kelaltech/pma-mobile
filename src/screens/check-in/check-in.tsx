/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../_shared/header/header';
import Geolocation from '@react-native-community/geolocation';
import checkInStyle from './check-in-style';
import { colors } from '../../assets/styles/colors';
import { useCheckInQuery } from '../../../gen/apollo-types';
import Handle from '../_shared/handle/handle';
import dayjs from 'dayjs';

const siteEngineerId = '613ba210-651a-469c-a690-ad6ecc76a6d5';

const CheckIn = () => {
  const { loading, data, error, refetch } = useCheckInQuery({
    variables: { siteEngineerId },
  });

  const checkins = data?.checkin.getCheckins;
  return (
    <>
      <Header title="PMA" />
      <Handle {...{ loading, error, data, refetch }}></Handle>

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
        {checkins?.map((checkin) => (
          <>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {dayjs(checkin?.created_at).format('MMM DD, YYYY')}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text>{dayjs(checkin?.created_at).format('hh mm a')}</Text>
              <Text>{checkin?.location} </Text>
            </View>
          </>
        ))}
      </View>
    </>
  );
};

export default CheckIn;
