/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
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
  const [unitData, setUnitData] = useState<ReportUnitCreateInput[]>([]);

  const { error, loading, data, refetch } = useReportGetQuery({
    variables: { projectId },
  });

  const clone = () => {
    data?.project.getProject?.sections?.map((item) => {
      item?.sectionItems?.map((units) => {
        units?.units?.map((u) => {
          setUnitData([
            ...unitData,
            { unitId: u?.id || '', planned: 0, executed: 0 },
          ]);
        });
      });
    });
  };

  useEffect(() => {
    clone();
  }, [data]);

  const sections = data?.project.getProject?.sections;

  const [allFile, setAllFile] = useState<any[]>([]);
  const [allImg, setAllImg] = useState<any[]>([]);

  const [addReport] = useReportAddMutation();

  const generateRNFile = (uri: any, name: any) => {
    return uri
      ? new ReactNativeFile({
          uri,
          type: mime.lookup(uri) || 'image',
          name,
        })
      : null;
  };

  const handleSubmit = () => {
    console.log('files', allFile);
    console.log('image', allImg);
    console.log('units', unitData);
    try {
      addReport({
        variables: {
          input: {
            project_id: projectId,
            files: allFile,
            photos: allImg,
            reportUnits: unitData,
          },
        },
      });
    } catch (err) {
      console.log('Mutaion Error: ', err);
    }
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
                onChange={(newVal: any[]) => {
                  newVal.map((imgVal) => {
                    const image = generateRNFile(
                      imgVal.uri,
                      `image-${Date.now()}`
                    );
                    setAllImg([...allImg, image]);
                  });
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
                onChange={(newVal: DocumentPickerResponse[]) => {
                  newVal.map((fileVal) => {
                    const file = generateRNFile(
                      fileVal?.uri,
                      ` file-${Date.now()}`
                    );
                    setAllFile([...allFile, file]);
                  });
                }}
              />

              <View
                style={{
                  paddingVertical: 12,
                  borderBottomColor: '#EFF1F1',
                  borderBottomWidth: 2,
                }}
              />
              <Text style={[textStyles.h5, { paddingTop: 12 }]}>
                {' '}
                {section?.name}
              </Text>
              {(section?.sectionItems || []).map((item) => (
                <View key={item?.id}>
                  <Text style={[textStyles.h6, { paddingVertical: 12 }]}>
                    {key + 1}. {item?.name}
                  </Text>

                  {(item?.units || []).map((unit) => (
                    <View key={unit?.id}>
                      <Text style={[textStyles.small, { paddingBottom: 12 }]}>
                        {unit?.name} [{unit?.unit}]:
                      </Text>
                      <Text
                        style={[
                          textStyles.small,
                          { paddingBottom: 12, color: colors.dark1 },
                        ]}
                      >
                        Amount: {(unit?.quantity || 0) * (unit?.rate || 0)}{' '}
                        {'    '}
                        To-Date: {unit?.toDate}
                      </Text>
                      <View style={{ flexDirection: 'row', paddingRight: 12 }}>
                        <TextInput
                          keyboardType="numeric"
                          placeholder={'Planned'}
                          onChangeText={(val) => {
                            setUnitData(
                              unitData.map((u) => {
                                if (u.unitId === unit?.id) {
                                  return {
                                    ...u,
                                    planned: Number(val),
                                  };
                                } else {
                                  return {
                                    ...u,
                                  };
                                }
                              })
                            );
                          }}
                          style={[textStyles.large, addReportStyle.textInput]}
                        />
                        <Text
                          style={[
                            textStyles.large,
                            { alignSelf: 'center', color: colors.dark1 },
                          ]}
                        >
                          {'  '} / {'  '}
                        </Text>
                        <TextInput
                          // value={unitData[key].planned.toString() ? '' : unitData[key].planned.toString()}
                          keyboardType="numeric"
                          placeholder={'Executed'}
                          onChangeText={(val) => {
                            setUnitData(
                              unitData.map((u) => {
                                if (u.unitId === unit?.id) {
                                  return {
                                    ...u,
                                    executed: Number(val),
                                  };
                                } else {
                                  return {
                                    ...u,
                                  };
                                }
                              })
                            );
                          }}
                          style={[textStyles.large, addReportStyle.textInput]}
                        />
                      </View>
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
