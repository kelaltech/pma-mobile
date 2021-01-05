import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const FileUploader = () => {
  const [allFile, setAllFile] = useState<string[]>([]);

  const getFile = async () => {
    try {
      const file = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      if (file) {
        file.map((val) => {
          const data = [...allFile, val.uri];
          setAllFile(data);

          try {
            AsyncStorage.setItem('', JSON.stringify(data));
          } catch (err) {
            console.log('File Upload Error: ', err);
          }
        });
      } else {
        console.warn('File not Picked');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View>
      {allFile && allFile.length !== 0 ? (
        <View>
          {allFile.map((data, key) => (
            <View>{/* <Text> {data.}  </Text> */}</View>
          ))}
        </View>
      ) : (
        <View></View>
      )}
      <Button
        onPress={() => {
          getFile();
        }}
        title="getFile"
        color="#F59D31"
      />
    </View>
  );
};

export default FileUploader;
