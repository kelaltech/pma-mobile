/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ReactNativeFile } from 'apollo-upload-client';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';
import * as mime from 'react-native-mime-types';
import {
  ReportUnitCreateInput,
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

const projectId = '7330da71-8e87-40a4-aba1-6a1fa0403abe'; // TODO: GET PROJECT ID FROM GLOBAL STATE

const ReportAdd = () => {
  const { error, loading, data, refetch } = useReportGetQuery({
    variables: { projectId },
    fetchPolicy: 'cache-and-network',
  });
  const sections = useMemo(() => data?.project.getProject?.sections || [], [
    data,
  ]);

  const [allImg, setAllImg] = useState<{ uri?: string }[]>([]);
  const [allFile, setAllFile] = useState<{ uri?: string }[]>([]);

  const [unitData, setUnitData] = useState<ReportUnitCreateInput[]>([]);
  useEffect(() => {
    const _reportUnits: ReportUnitCreateInput[] = [];
    for (const section of sections) {
      for (const item of section?.sectionItems || []) {
        for (const unit of item?.units || []) {
          _reportUnits.push({ unitId: unit?.id!, executed: 0, planned: 0 });
        }
      }
    }
    setUnitData(_reportUnits);
  }, [sections]);

  const clearDraft = useCallback(() => {
    AsyncStorage.multiRemove(['images', 'files']);
  }, []);

  const getReactNativeFile = useCallback((uri?: string, name?: string) => {
    return uri
      ? new ReactNativeFile({
          uri,
          name,
          type: mime.lookup(uri) || mime.lookup(name) || 'image',
        })
      : null;
  }, []);
  const navigation = useNavigation();
  const [addReport] = useReportAddMutation();
  const handleSubmit = useCallback(() => {
    const input = {
      project_id: projectId,
      files: allFile,
      photos: allImg,
      reportUnits: unitData,
    };
    addReport({ variables: { input }, fetchPolicy: 'no-cache' })
      .then((response) => {
        if (response.data?.report.createReport?.id) {
          clearDraft();
          navigation.navigate('MyReports');
        } else {
          throw response.errors?.length
            ? response.errors[0]
            : new Error('No data');
        }
      })
      .catch((e) => Alert.alert('Error :(', e?.message || 'Unknown error'));
  }, [addReport, allFile, allImg, clearDraft, navigation, unitData]);

  const photosOnChange = useCallback(
    (newPhotos: { uri?: string; fileName?: string }[]) => {
      setAllImg(
        newPhotos
          .map(
            (newPhoto) => getReactNativeFile(newPhoto.uri, newPhoto.fileName)!
          )
          .filter((d) => d !== null)
      );
    },
    [getReactNativeFile]
  );
  const documentsOnChange = useCallback(
    (newDocuments: DocumentPickerResponse[]) => {
      setAllFile(
        newDocuments
          .map(
            (newDocument) =>
              getReactNativeFile(newDocument.uri, newDocument.name)!
          )
          .filter((d) => d !== null)
      );
    },
    [getReactNativeFile]
  );

  return (
    <>
      <Header title="Add Report" to />

      <Handle
        {...{ error, loading, data, refetch: () => refetch({ projectId }) }}
      >
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
                { color: colors.dark1, paddingBottom: 12 },
              ]}
            >
              For {data?.project.getProject?.name}
            </Text>
            <View
              style={{ borderBottomColor: colors.light2, borderBottomWidth: 2 }}
            />
          </View>
          {(sections || []).map((section, key) => (
            <View key={key}>
              <Text style={[textStyles.h5, { paddingVertical: 12 }]}>
                Photos
              </Text>
              <PhotoUploader onChange={photosOnChange} />

              <View
                style={{
                  paddingTop: 12,
                  borderBottomColor: colors.light2,
                  borderBottomWidth: 2,
                }}
              />

              <Text style={[textStyles.h5, { paddingVertical: 12 }]}>
                Documents
              </Text>
              <FileUploader onChange={documentsOnChange} />

              <View
                style={{
                  paddingVertical: 12,
                  borderBottomColor: colors.light2,
                  borderBottomWidth: 2,
                }}
              />
              <Text style={[textStyles.h5, { paddingTop: 12 }]}>
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
                        To-Date: {unit?.toDate}
                      </Text>
                      <View style={{ flexDirection: 'row', paddingRight: 12 }}>
                        <TextInput
                          // value={unitData[key].planned.toString() ? '' : unitData[key].planned.toString()}
                          keyboardType="numeric"
                          placeholder={'Executed'}
                          onChangeText={(val) => {
                            setUnitData(
                              unitData.map((u) => {
                                if (u.unitId === unit?.id) {
                                  return { ...u, executed: Number(val) };
                                } else {
                                  return { ...u };
                                }
                              })
                            );
                          }}
                          style={[textStyles.large, addReportStyle.textInput]}
                        />
                        <Text
                          style={[
                            textStyles.large,
                            {
                              alignSelf: 'center',
                              color: colors.dark1,
                              paddingHorizontal: 8,
                            },
                          ]}
                        >
                          /
                        </Text>
                        <TextInput
                          keyboardType="numeric"
                          placeholder={'Planned'}
                          onChangeText={(val) => {
                            setUnitData(
                              unitData.map((u) => {
                                if (u.unitId === unit?.id) {
                                  return { ...u, planned: Number(val) };
                                } else {
                                  return { ...u };
                                }
                              })
                            );
                          }}
                          style={[textStyles.large, addReportStyle.textInput]}
                        />
                      </View>
                    </View>
                  ))}
                  <View style={{ flexDirection: 'row', paddingTop: 12 }}>
                    <Text style={{ color: colors.dark1 }}>
                      Total Executed:{' '}
                    </Text>
                    <Text>
                      ETB{' '}
                      {(item?.units || []).reduce(
                        (p, c) =>
                          p +
                          (unitData.find((u) => u.unitId === c?.id)?.executed ||
                            0),
                        0
                      )}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 12 }}>
                    <Text style={{ color: colors.dark1 }}>Total Planned: </Text>
                    <Text>
                      ETB{' '}
                      {(item?.units || []).reduce(
                        (p, c) =>
                          p +
                          (unitData.find((u) => u.unitId === c?.id)?.planned ||
                            0),
                        0
                      )}
                    </Text>
                  </View>
                </View>
              ))}

              <View
                style={{
                  borderBottomColor: colors.light2,
                  borderBottomWidth: 2,
                  paddingTop: 24,
                }}
              />

              <View style={{ paddingTop: 24 }}>
                <Text style={{ paddingBottom: 12, ...textStyles.small }}>
                  Current Work Activity:
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.light2,
                    borderRadius: 8,
                    elevation: 1,
                  }}
                  numberOfLines={5}
                  multiline={true}
                />
                <Text style={{ paddingVertical: 12, ...textStyles.small }}>
                  Major Problems:
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.light2,
                    borderRadius: 8,
                    elevation: 1,
                  }}
                  numberOfLines={5}
                  multiline={true}
                />
              </View>
            </View>
          ))}

          <View
            style={{
              borderBottomColor: colors.light2,
              borderBottomWidth: 2,
              paddingTop: 24,
            }}
          />
          <View style={{ paddingTop: 24 }}>
            <Text style={{ ...textStyles.h5 }}>Grand Total </Text>
            <View style={{ flexDirection: 'row', paddingTop: 24 }}>
              <Text style={{ color: colors.dark1, ...textStyles.large }}>
                AMOUNT:{' '}
              </Text>
              <Text style={{ ...textStyles.large }}>
                ETB{' '}
                {sections.reduce(
                  (p1, c1) =>
                    p1 +
                    (c1?.sectionItems || []).reduce(
                      (p2, c2) =>
                        p2 +
                        (c2?.units || []).reduce(
                          (p3, c3) =>
                            p3 + (c3?.quantity || 0) * (c3?.rate || 0),
                          0
                        ),
                      0
                    ),
                  0
                )}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 24 }}>
              <Text style={{ color: colors.dark1, ...textStyles.large }}>
                TO-DATE:{' '}
              </Text>
              <Text style={{ ...textStyles.large }}>
                ETB{' '}
                {sections.reduce(
                  (p1, c1) =>
                    p1 +
                    (c1?.sectionItems || []).reduce(
                      (p2, c2) =>
                        p2 +
                        (c2?.units || []).reduce(
                          (p3, c3) => p3 + (c3?.toDate || 0),
                          0
                        ),
                      0
                    ),
                  0
                )}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 24 }}>
              <Text style={{ color: colors.dark1, ...textStyles.large }}>
                PLANNED:{' '}
              </Text>
              <Text style={{ ...textStyles.large }}>
                ETB {unitData.reduce((p, c) => p + c.planned, 0)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 24 }}>
              <Text style={{ color: colors.dark1, ...textStyles.large }}>
                EXECUTED:{' '}
              </Text>
              <Text style={{ ...textStyles.large }}>
                ETB {unitData.reduce((p, c) => p + c.executed, 0)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 24 }}>
              <Text style={{ color: colors.dark1, ...textStyles.large }}>
                EXECUTED IN %:{' '}
              </Text>
              <Text style={{ ...textStyles.large }}>
                {Math.round(
                  ((unitData.reduce((p, c) => p + c.executed, 0) || 0) /
                    (unitData.reduce((p, c) => p + c.planned, 0) || 1)) *
                    100
                )}
                %
              </Text>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 24 }}>
              <Text style={{ color: colors.dark1, ...textStyles.large }}>
                ATTACHED:{' '}
              </Text>
              <Text style={{ ...textStyles.large }}>
                {allImg.length} Photo{allImg.length === 1 ? '' : 's'} +{' '}
                {allFile.length} Document{allImg.length === 1 ? '' : 's'}
              </Text>
            </View>
          </View>

          {/* Submit button */}

          <View style={{ margin: 24 }}>
            <Button
              pressableProps={{ style: { alignSelf: 'flex-end' } }}
              onPress={handleSubmit}
            >
              Submit
            </Button>
          </View>
        </View>
      </Handle>
    </>
  );
};

export default ReportAdd;
