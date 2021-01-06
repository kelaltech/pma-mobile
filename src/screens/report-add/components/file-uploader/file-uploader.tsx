import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Button from '../../../_shared/button/button';

const FileUploader = (porps: any) => {
  const [allFile, setAllFile] = useState<string[]>([]);

  const removeFile = async (id?: string) => {
    if (id) {
      if (id !== '0') {
        const updateFile = allFile.slice(allFile.indexOf(id, 1));
        setAllFile(updateFile);
        AsyncStorage.setItem('files', JSON.stringify(updateFile));
      } else {
        const updateFile = allFile.slice(1);
        setAllFile(updateFile);
        AsyncStorage.setItem('files', JSON.stringify(updateFile));
      }
    }
  };

  const getFile = async () => {
    try {
      const file = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      if (file) {
        file.map((val) => {
          const data = [...allFile, val.uri];
          setAllFile(data);
          console.log(data);
          try {
            AsyncStorage.setItem('', JSON.stringify(data));
          } catch (err) {
            console.log('File Upload Error: ', err);
          }
          porps.onChange(data);
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
          {allFile.map((upload, key) => (
            <View key={key}>
              <Text>{upload}</Text>
              <Pressable onPress={() => removeFile(key.toString())}>
                <Text>Remove</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <View>
          <Text style={{ alignSelf: 'center', paddingVertical: 12 }}>
            {' '}
            No Files{' '}
          </Text>
        </View>
      )}
      <Button
        onPress={getFile}
        pressableProps={{ style: { alignSelf: 'flex-start' } }}
      >
        + Add Files
      </Button>
    </View>
  );
};

export default FileUploader;
