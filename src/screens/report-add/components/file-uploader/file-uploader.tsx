/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import { colors } from '../../../../assets/styles/colors';
import { textStyles } from '../../../../assets/styles/text-styles';
import Button from '../../../_shared/button/button';

const FileUploader = ({
  onChange,
}: {
  onChange: (newDocuments: DocumentPickerResponse[]) => void;
}) => {
  const [allFile, setAllFile] = useState<DocumentPickerResponse[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('files')
      .then((storedStr) => {
        const stored = JSON.parse(storedStr || '[]');
        setAllFile(stored);
        onChange(stored);
      })
      .catch((e) =>
        Alert.alert(
          'Error :(',
          `Unable to fetch documents: ${e?.message || 'unknown error'}`
        )
      );
  }, [onChange]);

  const removeFile = useCallback(
    (index: number) => {
      Alert.alert(
        'Remove Confirmation',
        'Are you sure you want to remove this file?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            style: 'default',
            onPress: () => {
              const updatedDocuments = [
                ...allFile.slice(0, index),
                ...allFile.slice(index + 1),
              ];
              setAllFile(updatedDocuments);
              onChange(updatedDocuments);
              AsyncStorage.setItem(
                'files',
                JSON.stringify(updatedDocuments)
              ).catch((e) =>
                Alert.alert(
                  'Error :(',
                  `Unable to remove document: ${e?.message || 'unknown error'}`
                )
              );
            },
          },
        ]
      );
    },
    [allFile, onChange]
  );

  const setFile = useCallback(() => {
    DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.allFiles],
    })
      .then((files) => {
        if (files) {
          const newDocuments = [...allFile, ...files];
          setAllFile(newDocuments);
          onChange(newDocuments);
          return AsyncStorage.setItem('files', JSON.stringify(newDocuments));
        }
      })
      .catch((e) =>
        Alert.alert(
          'Error :(',
          `Unable to save document: ${e?.message || 'unknown error'}`
        )
      );
  }, [allFile, onChange]);

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
                {upload.name}
                {'  '}
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
            No document selected yet.
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
