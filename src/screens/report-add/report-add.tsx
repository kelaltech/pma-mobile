/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import {
  useReportAddMutation,
  useReportGetQuery,
} from '../../../gen/apollo-types';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';
import Button from '../_shared/button/button';
import Handle from '../_shared/handle/handle';
import Header from '../_shared/header/header';
import FileUploader from './components/file-uploader/file-uploader';
import PhotoUploader from './components/photo-uploader/photo-uploader';
import { addReportStyle } from './report-add-style';
import { ReportUnitCreateInput } from '../../../gen/apollo-types';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';

const projectId = '7330da71-8e87-40a4-aba1-6a1fa0403abe'; //TODO GET PROJECT ID FROM GLOBAL STATE

const ReportAdd = () => {
  const { error, loading, data, refetch } = useReportGetQuery({
    variables: { projectId },
  });

  const sections = data?.project.getProject?.sections;

  const [allFile, setAllFile] = useState<DocumentPickerResponse[]>([]);
  const [allImg, setAllImg] = useState<string[]>([]);
  const [unitData, setUnitData] = useState<ReportUnitCreateInput[]>([]);

  const [] = useReportAddMutation();

  function generateRNFile(uris: any[], name: any) {
    return uris
      ? uris.map((uri, key) => {
          new ReactNativeFile({
            uri,
            type: mime.lookup(uri) || 'image',
            name,
          });
        })
      : null;
  }

  const handleSubmit = () => {
    const images = generateRNFile(allImg, `image-${Date.now()}`);
    const files = generateRNFile(allFile, `file-${Date.now()}`);
  };

  return (
    <>
      <Header title="Add Report" to />

      <Handle {...{ error, loading, data, refetch }}>
        <View style={addReportStyle.topPart}>
          <Text style={{ ...textStyles.h1, color: colors.light0 }}>
            {dayjs().format('ddd, MMM DD, YYYY')}
          </Text>
        </View>

        <View style={addReportStyle.formContainer}>
          <View>
            <Text
              style={[
                textStyles.small,
                {
                  color: '#5A5A5A',
                  paddingBottom: 12,
                },
              ]}
            >
              For {data?.project.getProject?.name}
            </Text>
            <View
              style={{
                borderBottomColor: '#EFF1F1',
                borderBottomWidth: 2,
              }}
            />
          </View>
          {(sections || []).map((section, key) => (
            <View key={key}>
              <Text style={[textStyles.h5, { paddingVertical: 12 }]}>
                {' '}
                Photos{' '}
              </Text>

              <PhotoUploader
                onChange={(newVal: any) => {
                  setAllImg(newVal);
                  console.log(newVal.uri);
                }}
              />

              <View
                style={{
                  paddingTop: 12,
                  borderBottomColor: '#EFF1F1',
                  borderBottomWidth: 2,
                }}
              />

              <Text style={[textStyles.h5, { paddingVertical: 12 }]}>
                {' '}
                Documents{' '}
              </Text>

              <FileUploader
                onChange={(newVal: any) => setAllFile(newVal.uri)}
              />

              <View
                style={{
                  paddingVertical: 12,
                  borderBottomColor: '#EFF1F1',
                  borderBottomWidth: 2,
                }}
              />

              {(section?.sectionItems || []).map((item) => (
                <View key={item?.id}>
                  <Text style={[textStyles.h5]}>{item?.name}</Text>

                  {(item?.units || []).map((unit) => (
                    <View key={unit?.id}>
                      <Text>
                        {unit?.name} [{unit?.unit}]:
                      </Text>
                      <Text>
                        Amount: {(unit?.quantity || 0) * (unit?.rate || 0)}
                      </Text>
                      <Text>To-Date: {unit?.toDate}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TextInput
                          keyboardType="numeric"
                          placeholder={'Planned'}
                          onChange={() => {}}
                        />
                        <TextInput
                          // value={eachUnitData.planned? '' : eachUnitData.planned}
                          keyboardType="numeric"
                          placeholder={'Executed'}
                          onChange={() => {}}
                        />
                      </View>
                      {/* {unitData.map(eachUnitData => (
                        <View style={{ flexDirection: 'row' }}>
                          <TextInput placeholder={'Planned'} />
                          <TextInput
                            // value={eachUnitData.planned? '' : eachUnitData.planned}
                            keyboardType='numeric'
                            placeholder={'Executed'}
                            onChange={() => handleunitchage(unit?.id, 8, 1)}
                          />
                        </View>
                      ))} */}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={{ margin: 24 }}>
          <Button
            pressableProps={{ style: { alignSelf: 'flex-end' } }}
            // onPress={() => { }}
            onPress={handleSubmit}
          >
            Submit
          </Button>
        </View>
      </Handle>
    </>
  );
};

export default ReportAdd;
