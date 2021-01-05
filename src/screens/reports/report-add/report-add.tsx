/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  PermissionsAndroid,
  Image,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera } from 'react-native-image-picker';
import Header from '../../components/Util/header/header';
import { ProjectPlanSection } from '../data';
import FileUploader  from './components/file-uploader/fileUpload' 
const AddReports = () => {
  const [allImg, setAllImg] = useState<string[]>([]);
  const getImage = async () => {
    try {
      const getData = await AsyncStorage.getItem('new');
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

        AsyncStorage.setItem('new', JSON.stringify(updateImgs));
      } else {
        const updateImgs = allImg.slice(1);
        setAllImg(updateImgs);

        AsyncStorage.setItem('new', JSON.stringify(updateImgs));
      }
    } else {
      AsyncStorage.getAllKeys()
        .then((keys) => AsyncStorage.multiRemove(keys))
        .then(() => alert('success'));
      setAllImg([]);
    }
  };

  const openCamera = async () => {
    // console.log('opened ')
    try {
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const storeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Store Image Permission',
          message: 'App needs access to your Files ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
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
                AsyncStorage.setItem('new', JSON.stringify(vat));
              } catch (err) {
                console.log('Set image Error', err);
              }
            }
          },
        );
      } else {
        console.error('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

 
  return (
    <>
      <Header title="Add Report" to />
      <ScrollView>
        <View
          style={{
            backgroundColor: '#0C1A59',
            height: 210,
            paddingTop: 48,
            paddingLeft: 24,
          }}
        >
          <Text style={{ color: 'white', fontSize: 28, fontWeight: '700' }}>
           {new Date().getMonth()} {new Date().getDate()}, {new Date().getFullYear()}  
          </Text>
        </View>

        <View
          style={{
            marginTop: -84,
            marginHorizontal: 24,
            backgroundColor: 'white',
            height: 'auto',
            borderRadius: 8,
            paddingHorizontal: 24,
            paddingVertical: 32,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#5A5A5A' }}>
            For “Project Roobee” in “Lot 1: Bale, East Bale Robe”
          </Text>
          <View
            style={{
              borderBottomColor: '#EFF1F1',
              borderBottomWidth: 1,
            }}
          />
          <Text> Photos </Text>
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

                  <TouchableOpacity
                    onPress={() => removeImg(key.toString())}
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
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
              <Text> Add Image </Text>
            )}

          <Button onPress={openCamera} title="+ Add Photo" color="#F59D31" />
          {ProjectPlanSection.map((section, key) => (
            <View key={key}>
              <Text>{section.name}</Text>
              {section.sectionItems.map((items, key) => (
                <View key={key}>
                  <Text>{items.name}</Text>
                  {items.units.map((each, key) => (
                    <View key={key}>
                      <Text>
                        {' '}
                        Report Metric Name {each.name} : {each.unit}{' '}
                      </Text>
                      <Text> Amount {each.quantity * each.rate} </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TextInput
                          value={each.planned}
                          placeholder={'Planned'}
                          onChange={() => { }}
                        />
                        <TextInput
                          value={each.planned}
                          placeholder={'Executed'}
                          onChange={() => { }}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
        <Button onPress={getImage} title="Get Photos" color="#F59D31" />
        <Button
          onPress={() => {
            removeImg();
          }}
          title="Submit"
          color="#F59D31"
        />
        <FileUploader/>
      </ScrollView>
    </>
  );
};

export default AddReports;
