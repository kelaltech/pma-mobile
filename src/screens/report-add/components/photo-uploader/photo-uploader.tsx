import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Pressable,
  Text,
  View,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { colors } from '../../../../assets/styles/colors';
import { textStyles } from '../../../../assets/styles/text-styles';
import Button from '../../../_shared/button/button';

const PhotoUploader = (props: any) => {
  const [allImg, setAllImg] = useState<
    {
      didCancel: boolean;
      errorCode: any;
      errorMessage: string;
      base64: string;
      uri: string;
      width: number;
      height: number;
      fileSize: number;
      type: string;
      fileName: string;
    }[]
  >([]);

  useEffect(() => {
    AsyncStorage.getItem('images')
      .then((getData) => {
        const storedImage = JSON.parse(getData || '[]');
        setAllImg(storedImage);
        props.onChange(storedImage);
      })
      .catch((err) => console.error('Get images Error', err));
  }, []);

  const removeImg = (id?: number) => {
    Alert.alert('Delete File!', 'Are you sure you want to Delete the file', [
      {
        text: 'Yes',
        style: 'default',
        onPress: () => {
          if (id !== undefined) {
            const updateImgs = [
              ...allImg.slice(0, id),
              ...allImg.slice(id + 1),
            ];
            setAllImg(updateImgs);
            props.onChange(updateImgs);
            AsyncStorage.setItem('images', JSON.stringify(updateImgs));
          }
        },
      },
      { text: 'No', style: 'cancel' },
    ]);
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
          {
            mediaType: 'photo',
            saveToPhotos: true,
            aspect: [4, 3],
            includeBase64: true,
          },
          (res: any) => {
            // console.log('res', res)
            // res.didCancel()
            if (res && !res.didCancel) {
              const imageFile = [...allImg, res];
              setAllImg(imageFile);
              // console.log(res);
              try {
                AsyncStorage.setItem('images', JSON.stringify(imageFile));
              } catch (err) {
                console.log('Set image Error', err);
              }
              props.onChange(imageFile);
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
                source={{ uri: `data:image/jpeg;base64,${img.base64}` }}
                style={{
                  width: 140,
                  height: 100,
                  marginLeft: key % 2 === 0 ? 0 : 24,
                }}
              />

              <Pressable
                android_ripple={{ color: colors.accent }}
                onPressOut={() => removeImg(key)}
                style={{
                  marginBottom: 12,
                  width: 140,
                  marginLeft: key % 2 === 0 ? 0 : 24,
                  alignSelf: 'center',
                  height: 30,
                  backgroundColor: colors.warn,
                }}
              >
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    ...textStyles.large,
                  }}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <Text style={{ alignSelf: 'center', paddingBottom: 12 }}>
          {' '}
          No Image{' '}
        </Text>
      )}

      <Button
        onPress={openCamera}
        pressableProps={{ style: { alignSelf: 'flex-start' } }}
      >
        + Add Photo
      </Button>
    </View>
  );
};

export default PhotoUploader;
