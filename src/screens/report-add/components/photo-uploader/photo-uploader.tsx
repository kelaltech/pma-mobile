/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { colors } from '../../../../assets/styles/colors';
import { textStyles } from '../../../../assets/styles/text-styles';
import Button from '../../../_shared/button/button';

const PhotoUploader = ({
  onChange,
}: {
  onChange: (newPhotos: { uri?: string; fileName?: string }[]) => void;
}) => {
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
      .then((storedStr) => {
        const stored = JSON.parse(storedStr || '[]');
        setAllImg(stored);
        onChange(stored);
      })
      .catch((e) =>
        Alert.alert(
          'Error :(',
          `Unable to fetch images: ${e?.message || 'unknown error'}`
        )
      );
  }, [onChange]);

  const removeImg = useCallback(
    (index: number) => {
      Alert.alert(
        'Delete Confirmation',
        'Are you sure you want to delete this photo?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            style: 'default',
            onPress: () => {
              const updatedPhotos = [
                ...allImg.slice(0, index),
                ...allImg.slice(index + 1),
              ];
              setAllImg(updatedPhotos);
              onChange(updatedPhotos);
              AsyncStorage.setItem(
                'images',
                JSON.stringify(updatedPhotos)
              ).catch((e) =>
                Alert.alert(
                  'Error :(',
                  `Unable to remove image: ${e?.message || 'unknown error'}`
                )
              );
            },
          },
        ]
      );
    },
    [allImg, onChange]
  );

  const openCamera = useCallback(() => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        aspect: [1, 1],
        includeBase64: true,
        maxWidth: 1080,
        maxHeight: 1080,
      },
      (photo: any) => {
        if (photo && !photo.didCancel) {
          const newPhotos = [...allImg, photo];
          setAllImg(newPhotos);
          onChange(newPhotos);
          AsyncStorage.setItem('images', JSON.stringify(newPhotos)).catch((e) =>
            Alert.alert(
              'Error :(',
              `Unable to save photo: ${e?.message || 'unknown error'}`
            )
          );
        }
      }
    );
  }, [allImg, onChange]);

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
          No photo captured yet.
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
