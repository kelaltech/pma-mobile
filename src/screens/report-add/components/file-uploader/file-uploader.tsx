import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FileUploader = () => {
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
              <TouchableOpacity onPress={() => removeFile(key.toString())}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View>
          <Text> Add Files </Text>
        </View>
      )}
      <Button
        onPress={() => {
          getFile();
        }}
        title="+ Add Files "
        color="#F59D31"
      />
    </View>
  );
};

export default FileUploader;
