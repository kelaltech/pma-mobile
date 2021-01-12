import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import { colors } from '../../../../assets/styles/colors';
import { textStyles } from '../../../../assets/styles/text-styles';
import Button from '../../../_shared/button/button';

const FileUploader = (props: any) => {
  useEffect(() => {
    AsyncStorage.getItem('files')
      .then((getData) => {
        const storedFiles = JSON.parse(getData || '[]');
        setAllFile(storedFiles);
        props.onChange(storedFiles);
      })
      .catch((err) => console.log('Get Files Error: ', err));
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

  const removeFile = async (id?: number) => {
    Alert.alert('Delete File!', 'Are you sure you want to Delete the file', [
      {
        text: 'Yes',
        style: 'default',
        onPress: () => {
          if (id !== undefined) {
            const updateFile = [
              ...allFile.slice(0, id),
              ...allFile.slice(id + 1),
            ];
            setAllFile(updateFile);
            props.onChange(updateFile);
            AsyncStorage.setItem('files', JSON.stringify(updateFile));
          }
        },
      },
      { text: 'No', style: 'cancel' },
    ]);
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
          props.onChange(data);
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
              <Pressable onPress={() => removeFile(key)}>
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
