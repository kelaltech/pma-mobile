import React, { useEffect, useState } from 'react';
import { launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  Image,
  Pressable,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../../assets/styles/colors';

const PhotoUploader = () => {
  useEffect(() => {
    getImage();
  }, []);
  const [allImg, setAllImg] = useState<string[]>([]);
  const getImage = async () => {
    try {
      const getData = await AsyncStorage.getItem('images');
      if (getData !== null) {
        const bil = JSON.parse(getData);
        // console.log(bil.length)
        setAllImg(bil);
      }
    } catch (err) {
      console.error('Get images Error', err);
    }
  };

  const removeImg = (id?: string) => {
    if (id) {
      if (id !== '0') {
        const updateImgs = allImg.slice(allImg.indexOf(id, 1));
        setAllImg(updateImgs);

        AsyncStorage.setItem('images', JSON.stringify(updateImgs));
      } else {
        const updateImgs = allImg.slice(1);
        setAllImg(updateImgs);

        AsyncStorage.setItem('images', JSON.stringify(updateImgs));
      }
    } else {
      AsyncStorage.getAllKeys()
        .then((keys) => AsyncStorage.multiRemove(keys))
        .then(() => alert('success'));
      setAllImg([]);
    }
  };

  const openCamera = async () => {
    try {
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      const storeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Store Image Permission',
          message: 'App needs access to your Files ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (
        cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
        storeGranted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        // console.log("Camera permission given");
        launchCamera(
          { mediaType: 'photo', saveToPhotos: true, includeBase64: true },
          (res: any) => {
            if (res.base64) {
              const vat = [...allImg, res.base64];
              setAllImg(vat);
              // console.log(allImg)
              try {
                AsyncStorage.setItem('images', JSON.stringify(vat));
              } catch (err) {
                console.log('Set image Error', err);
              }
            }
          }
        );
      } else {
        console.error('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View>
      {allImg && allImg.length !== 0 ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {allImg.map((img, key) => (
            <View key={key} style={{ flexDirection: 'column' }}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${img}` }}
                style={{
                  width: 140,
                  height: 100,
                  marginLeft: key % 2 === 0 ? 0 : 24,
                }}
              />

              <Pressable
                android_ripple={{ color: colors.accent }}
                onPressOut={() => removeImg(key.toString())}
                style={{
                  marginBottom: 12,
                  width: 140,
                  marginLeft: key % 2 === 0 ? 0 : 24,
                  alignSelf: 'center',
                  height: 30,
                  backgroundColor: '#ff0000',
                }}
              >
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 18,
                  }}
                >
                  DELETE
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ alignSelf: 'center', paddingBottom: 12, color: '' }}>
          {' '}
          No Image{' '}
        </Text>
      )}

      <Button onPress={openCamera} title="+ Add Photo" color="#F59D31" />
    </View>
  );
};

export default PhotoUploader;
