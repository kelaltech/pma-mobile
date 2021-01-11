import React, { useEffect } from 'react';
import {
  Alert,
  BackHandler,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { colors } from '../assets/styles/colors';
import AppNavigator from '../navigation/app-navigator';
import ApolloClientProvider from './providers/apollo-client-provider';
import AuthProvider from './providers/auth-provider';

const App = () => {
  useEffect(() => {
    let watchId: number | null = null;

    requestStorageAccess()
      .then(requestCameraAccess)
      .then(requestLocationAccess)
      .then(() => {
        // we're watching just to improve accuracy during check-ins
        watchId = Geolocation.watchPosition(
          () => {},
          () => {},
          { enableHighAccuracy: true, forceRequestLocation: true }
        );
      })
      .catch((e) => {
        Alert.alert('Missing permissions', e?.message || '', [
          {
            text: 'Exit app',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]);
      });

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.statusBar} barStyle="light-content" />

      <ApolloClientProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ApolloClientProvider>
    </>
  );
};

export default App;

const requestLocationAccess = async () => {
  if (
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    )) &&
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ))
  ) {
    return;
  }

  const answerCoarse = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    {
      title: 'PMA Coarse Location Permission',
      message:
        'PMA needs access to your coarse location so you can send your check-ins and reports.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  if (answerCoarse !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error('Location permission denied');
  }

  const answerFine = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'PMA Fine Location Permission',
      message:
        'PMA needs access to your fine location so you can send your check-ins and reports.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  if (answerFine !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error('Location permission denied');
  }
};

const requestCameraAccess = async () => {
  if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) {
    return;
  }

  const answer = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: 'PMA Camera Permission',
      message: 'PMA needs access to your camera so you can report photos.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  if (answer !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error('Camera permission denied');
  }
};

const requestStorageAccess = async () => {
  if (
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    )) &&
    (await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    ))
  ) {
    return;
  }

  const answerRead = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
      title: 'PMA External Storage Read Permission',
      message:
        'PMA needs access to read files from external storages so you can report document attachments.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  if (answerRead !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error('External storage read permission denied');
  }

  const answerWrite = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'PMA External Storage Write Permission',
      message:
        'PMA needs access to write files on external storages so you can save pending reports locally.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  if (answerWrite !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error('External storage write permission denied');
  }
};
