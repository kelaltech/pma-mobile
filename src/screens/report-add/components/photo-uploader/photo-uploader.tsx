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
      {allImg?.length ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginRight: -24,
          }}
        >
          {allImg.map((photo, index) => (
            <View
              key={`${index}-${photo.uri}`}
              style={{
                flex: 1,
                minWidth: `${100 / 3}%`,
                maxWidth: `${100 / 3}%`,
              }}
            >
              <Image
                source={{ uri: `data:image/jpeg;base64,${photo.base64}` }}
                style={{
                  height: 70,
                  marginRight: 24,
                }}
              />

              <Pressable
                android_ripple={{ color: colors.accent }}
                onPressOut={() => removeImg(index)}
                style={{
                  marginBottom: 24,
                  marginRight: 24,
                  height: 21,
                  backgroundColor: colors.warn,
                }}
              >
                <Text
                  style={[
                    textStyles.small,
                    {
                      alignSelf: 'center',
                      ...textStyles.large,
                      lineHeight: 24,
                      color: colors.light0,
                    },
                  ]}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <Text
          style={[textStyles.small, { marginBottom: 24, color: colors.dark1 }]}
        >
          No photos captured yet.
        </Text>
      )}

      <Button
        onPress={openCamera}
        pressableProps={{
          style: { alignSelf: 'flex-start', marginBottom: 24 },
        }}
      >
        + Add a photo
      </Button>
    </View>
  );
};

export default PhotoUploader;
