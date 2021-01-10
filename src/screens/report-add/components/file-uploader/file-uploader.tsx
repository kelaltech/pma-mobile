import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import Button from '../../../_shared/button/button';
import { colors } from '../../../../assets/styles/colors';
import { textStyles } from '../../../../assets/styles/text-styles';

const FileUploader = (porps: any) => {
  useEffect(() => {
    getFiles();
  }, []);

  const [allFile, setAllFile] = useState<DocumentPickerResponse[]>([]);

  const getFiles = async () => {
    try {
      const getData = await AsyncStorage.getItem('files');
      if (getData !== null) {
        const storedFiles = JSON.parse(getData);
        setAllFile(storedFiles);
      }
    } catch (err) {
      console.log('Get image Error', err);
    }
  };

  const removeFile = async (id?: any) => {
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

  const setFile = async () => {
    try {
      const file = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      if (file) {
        file.map((val) => {
          const data = [...allFile, val];
          setAllFile(data);
          // console.log(data);
          try {
            AsyncStorage.setItem('files', JSON.stringify(data));
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
            <View
              key={key}
              style={{ flexDirection: 'row', paddingVertical: 12 }}
            >
              <Text style={[{ ...textStyles.medium, color: colors.dark1 }]}>
                {upload.name} {'  '}
              </Text>
              <Pressable onPress={() => removeFile(key.toString())}>
                <Text style={{ ...textStyles.medium, color: colors.warn }}>
                  Remove
                </Text>
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
        onPress={setFile}
        pressableProps={{ style: { alignSelf: 'flex-start' } }}
      >
        + Add Files
      </Button>
    </View>
  );
};

export default FileUploader;
