/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React from 'react';
import { Alert, Linking, Platform, Pressable, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  useCheckInAddMutation,
  useCheckInsQuery,
} from '../../../gen/apollo-types';
import MapPin from '../../assets/icons/map-pin.svg';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';
import Handle from '../_shared/handle/handle';
import Header from '../_shared/header/header';
import styles from './check-ins-style';

const siteEngineerId = '613ba210-651a-469c-a690-ad6ecc76a6d5'; // TODO: ...

const CheckIns = () => {
  const { loading, data, error, refetch } = useCheckInsQuery({
    variables: { siteEngineerId },
    fetchPolicy: 'cache-and-network',
  });
  const checkins = data?.checkin.getCheckins || [];

  const [checkInAdd] = useCheckInAddMutation();

  const handleCheckin = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to check in right here, right now?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          style: 'default',
          onPress: () => {
            Geolocation.getCurrentPosition(
              (position) => {
                checkInAdd({
                  variables: {
                    input: {
                      userId: siteEngineerId,
                      location: {
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                      },
                    },
                  },
                })
                  .then(() => {
                    Alert.alert('Success!', 'Your check-in has been saved.');
                    refetch({ siteEngineerId });
                  })
                  .catch((e) => {
                    Alert.alert('Error :(', e?.message || 'Unknown error');
                    refetch({ siteEngineerId });
                  });
              },
              (e) => {
                Alert.alert('Error :(', e?.message || 'Unknown error');
              },
              { enableHighAccuracy: true, forceRequestLocation: true }
            );
          },
        },
      ]
    );
  };

  return (
    <>
      <Header title="PMA" />
      <Handle
        {...{
          loading,
          error,
          data,
          refetch: () => refetch({ siteEngineerId }),
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Check-ins</Text>
        </View>
        <Pressable
          style={styles.checkInButton}
          android_ripple={{ color: colors.accent, radius: 168 / 2 }}
          onPressOut={handleCheckin}
        >
          <MapPin style={styles.checkInButtonIcon} />
          <Text
            style={{
              paddingTop: 12,
              ...textStyles.medium,
              textAlign: 'center',
              color: colors.primary,
            }}
          >
            CHECK-IN NOW RIGHT HERE
          </Text>
        </Pressable>

        <View style={styles.checkInsContainer}>
          {checkins.map((checkIn, i) => (
            <Pressable
              key={checkIn?.id}
              android_ripple={{ color: colors.accent }}
              style={{ marginBottom: i < checkins.length - 1 ? 24 : 0 }}
              onPress={() => {
                Linking.openURL(
                  `${Platform.select({
                    ios: 'maps:0,0?q=',
                    android: 'geo:0,0?q=',
                  })}${checkIn?.location.split(' ')[0]},${
                    checkIn?.location.split(' ')[1]
                  }(Check-in Location)})`
                );
              }}
            >
              <Text style={styles.checkInCardTitle}>
                {dayjs(checkIn?.created_at).format('ddd, MMM DD, YYYY')}
              </Text>
              <View style={styles.checkInCardDescriptionView}>
                <Text
                  style={[
                    styles.checkInCardDescriptionText,
                    { marginRight: 12 },
                  ]}
                >
                  TIME:{' '}
                  <Text style={{ color: colors.dark0 }}>
                    {dayjs(checkIn?.created_at).format('hh:mma')}
                  </Text>
                </Text>
                <Text style={styles.checkInCardDescriptionText}>
                  GEO:{' '}
                  <Text style={{ color: colors.dark0 }}>
                    {checkIn?.location}
                  </Text>
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Handle>
    </>
  );
};

export default CheckIns;
