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
  ReportCreateInput,
  ReportUnitCreateInput,
  useReportAddMutation,
  useReportGetQuery,
} from '../../../gen/apollo-types';
import { useMyProject } from '../../app/states/my-project/use-my-project';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';
import Button from '../_shared/button/button';
import Handle from '../_shared/handle/handle';
import Header from '../_shared/header/header';
import FileUploader from './components/file-uploader/file-uploader';
import PhotoUploader from './components/photo-uploader/photo-uploader';
import { styles } from './report-add-style';

const ReportAdd = () => {
  const { myProject } = useMyProject();

  const { error, loading, data, refetch } = useReportGetQuery({
    variables: { projectId: myProject.id || '' },
    fetchPolicy: 'cache-and-network',
  });
  const sections = useMemo(() => data?.project.getProject?.sections || [], [
    data,
  ]);

  const [allImg, setAllImg] = useState<{ uri?: string }[]>([]);
  const [allFile, setAllFile] = useState<{ uri?: string }[]>([]);

  const [reportUnits, _setReportUnits] = useState<ReportUnitCreateInput[]>([]);
  const setReportUnits = useCallback(
    (_reportUnits: typeof reportUnits) => {
      _setReportUnits(_reportUnits);
      AsyncStorage.setItem(
        'reportUnits',
        JSON.stringify(_reportUnits)
      ).catch((e) =>
        Alert.alert(
          'Error :(',
          `Unable to save progress: ${e?.message || 'unknown error'}`
        )
      );
    },
    [reportUnits]
  );

  const [currentWorkActivity, _setCurrentWorkActivity] = useState('');
  const setCurrentWorkActivity = useCallback(
    (_currentWorkActivity: typeof currentWorkActivity) => {
      _setCurrentWorkActivity(_currentWorkActivity);
      AsyncStorage.setItem(
        'currentWorkActivity',
        _currentWorkActivity
      ).catch((e) =>
        Alert.alert(
          'Error :(',
          `Unable to save currentWorkActivity: ${e?.message || 'unknown error'}`
        )
      );
    },
    [currentWorkActivity]
  );

  const [majorProblems, _setMajorProblems] = useState('');
  const setMajorProblems = useCallback(
    (_majorProblems: typeof majorProblems) => {
      _setMajorProblems(_majorProblems);
      AsyncStorage.setItem('majorProblems', _majorProblems).catch((e) =>
        Alert.alert(
          'Error :(',
          `Unable to save majorProblems: ${e?.message || 'unknown error'}`
        )
      );
    },
    [majorProblems]
  );

  useEffect(() => {
    AsyncStorage.getItem('reportUnits')
      .then((_reportUnitsStr) => {
        const reportUnitsFromDraft: ReportUnitCreateInput[] = JSON.parse(
          _reportUnitsStr || '[]'
        );
        const _reportUnits: ReportUnitCreateInput[] = [];
        for (const section of sections) {
          for (const item of section?.sectionItems || []) {
            for (const unit of item?.units || []) {
              const reportUnitFromDraft = reportUnitsFromDraft.find(
                (u) => u.unitId === unit?.id
              );
              _reportUnits.push({
                unitId: unit?.id!,
                executed: reportUnitFromDraft?.executed || 0,
                planned: reportUnitFromDraft?.planned || 0,
              });
            }
          }
        }
        _setReportUnits(_reportUnits);
      })
      .catch((e) =>
        Alert.alert(
          'Error :(',
          `Unable to fetch progress: ${e?.message || 'unknown error'}`
        )
      );

    AsyncStorage.getItem('currentWorkActivity')
      .then((_currentWorkActivity) => {
        if (_currentWorkActivity) {
          _setCurrentWorkActivity(_currentWorkActivity);
        }
      })
      .catch((e) =>
        Alert.alert(
          'Error :(',
          `Unable to fetch currentWorkActivity: ${
            e?.message || 'unknown error'
          }`
        )
      );

    AsyncStorage.getItem('majorProblems')
      .then((_majorProblems) => {
        if (_majorProblems) {
          _setMajorProblems(_majorProblems);
        }
      })
      .catch((e) =>
        Alert.alert(
          'Error :(',
          `Unable to fetch majorProblems: ${e?.message || 'unknown error'}`
        )
      );
  }, [sections]);

  const clearDraft = useCallback(() => {
    AsyncStorage.multiRemove([
      'images',
      'files',
      'reportUnits',
      'currentWorkActivity',
      'majorProblems',
    ]);
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
    const input: ReportCreateInput = {
      project_id: myProject.id || '',
      files: allFile,
      photos: allImg,
      reportUnits: reportUnits,
      current_work_problems: currentWorkActivity,
      major_problems: majorProblems,
    };

    let isReady = true;
    for (const unit of input.reportUnits) {
      if (unit.executed === undefined || !unit.planned === undefined) {
        isReady = false;
        break;
      }
    }
    if (!input.current_work_problems || !input.major_problems) {
      isReady = false;
    }
    if (!isReady) {
      Alert.alert('Validation Error', 'Missing value for required input(s).');
      return;
    }

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
  }, [
    addReport,
    allFile,
    allImg,
    clearDraft,
    currentWorkActivity,
    majorProblems,
    myProject.id,
    navigation,
    reportUnits,
  ]);

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
        {...{
          error,
          loading,
          data,
          refetch: () => refetch({ projectId: myProject.id || '' }),
        }}
      >
        <View style={styles.bg}>
          <Text style={styles.title}>
            {dayjs().format('ddd, MMM DD, YYYY')}
          </Text>
        </View>

        <View style={styles.card}>
          <Text
            style={[
              textStyles.small,
              { color: colors.dark1, marginBottom: 24 },
            ]}
          >
            For “{data?.project.getProject?.name}” in “{myProject.lot?.name}”
          </Text>

          <View style={[styles.hr, { marginBottom: 24 }]} />

          <Text
            style={[textStyles.h5, { marginBottom: 24, color: colors.dark0 }]}
          >
            Photos
          </Text>

          <PhotoUploader onChange={photosOnChange} />

          <View style={[styles.hr, { marginBottom: 24 }]} />

          <Text
            style={[textStyles.h5, { marginBottom: 24, color: colors.dark0 }]}
          >
            Documents
          </Text>

          <FileUploader onChange={documentsOnChange} />

          <View style={[styles.hr, { marginBottom: 24 }]} />

          {(sections || []).map((section) => (
            <View key={section?.id}>
              <Text
                style={[
                  textStyles.h5,
                  { marginBottom: 24, color: colors.dark0 },
                ]}
              >
                {section?.name}
              </Text>

              {(section?.sectionItems || []).map((item, itemIndex) => (
                <View key={item?.id}>
                  <Text
                    style={[
                      textStyles.h6,
                      {
                        marginBottom: 24,
                        textTransform: 'uppercase',
                        color: colors.dark0,
                      },
                    ]}
                  >
                    {itemIndex + 1}. {item?.name}
                  </Text>

                  {(item?.units || []).map((unit) => (
                    <View key={unit?.id}>
                      <Text
                        style={[
                          textStyles.small,
                          { marginBottom: 4, color: colors.dark0 },
                        ]}
                      >
                        {unit?.name} [{unit?.unit}]:
                      </Text>

                      <Text
                        style={[
                          textStyles.small,
                          { marginBottom: 4, color: colors.dark1 },
                        ]}
                      >
                        Amount: ETB {(unit?.quantity || 0) * (unit?.rate || 0)};{' '}
                        To-Date: ETB {unit?.toDate}
                      </Text>

                      <View style={[styles.dualFields, { marginBottom: 24 }]}>
                        <TextInput
                          value={(
                            reportUnits.find((u) => u.unitId === unit?.id)
                              ?.executed || 0
                          ).toString()}
                          onChangeText={(val) => {
                            setReportUnits(
                              reportUnits.map((u) => {
                                if (u.unitId === unit?.id) {
                                  return { ...u, executed: Number(val) };
                                } else {
                                  return { ...u };
                                }
                              })
                            );
                          }}
                          keyboardType="numeric"
                          placeholder="Executed *"
                          style={[styles.input, { flex: 1 }]}
                        />

                        <Text style={styles.dualFieldsSeparator}>/</Text>

                        <TextInput
                          value={(
                            reportUnits.find((u) => u.unitId === unit?.id)
                              ?.planned || 0
                          ).toString()}
                          onChangeText={(val) => {
                            setReportUnits(
                              reportUnits.map((u) => {
                                if (u.unitId === unit?.id) {
                                  return { ...u, planned: Number(val) };
                                } else {
                                  return { ...u };
                                }
                              })
                            );
                          }}
                          keyboardType="numeric"
                          placeholder="Planned *"
                          style={[styles.input, { flex: 1 }]}
                        />
                      </View>
                    </View>
                  ))}

                  <Text style={[textStyles.small, { color: colors.dark1 }]}>
                    Total Executed:{' '}
                    <Text style={{ color: colors.dark0 }}>
                      ETB{' '}
                      {(item?.units || []).reduce(
                        (p, c) =>
                          p +
                          (reportUnits.find((u) => u.unitId === c?.id)
                            ?.executed || 0),
                        0
                      )}
                    </Text>
                  </Text>

                  <Text
                    style={[
                      textStyles.small,
                      { color: colors.dark1, marginBottom: 24 },
                    ]}
                  >
                    Total Planned:{' '}
                    <Text style={{ color: colors.dark0 }}>
                      ETB{' '}
                      {(item?.units || []).reduce(
                        (p, c) =>
                          p +
                          (reportUnits.find((u) => u.unitId === c?.id)
                            ?.planned || 0),
                        0
                      )}
                    </Text>
                  </Text>
                </View>
              ))}

              <View style={[styles.hr, { marginBottom: 24 }]} />
            </View>
          ))}

          <Text
            style={[textStyles.small, { marginBottom: 4, color: colors.dark0 }]}
          >
            Current Work Activity: *
          </Text>

          <TextInput
            value={currentWorkActivity}
            onChangeText={setCurrentWorkActivity}
            numberOfLines={4}
            multiline={true}
            style={[styles.input, { height: 'auto', marginBottom: 24 }]}
          />

          <Text
            style={[textStyles.small, { marginBottom: 4, color: colors.dark0 }]}
          >
            Major Problems: *
          </Text>

          <TextInput
            value={majorProblems}
            onChangeText={setMajorProblems}
            numberOfLines={4}
            multiline={true}
            style={[styles.input, { height: 'auto', marginBottom: 24 }]}
          />

          <View style={[styles.hr, { marginBottom: 24 }]} />

          <Text
            style={[textStyles.h5, { marginBottom: 24, color: colors.dark0 }]}
          >
            GRAND TOTAL
          </Text>

          <Text
            style={[
              textStyles.large,
              { marginBottom: 24, color: colors.dark1 },
            ]}
          >
            AMOUNT:{' '}
            <Text style={{ color: colors.dark0 }}>
              ETB{' '}
              {sections.reduce(
                (p1, c1) =>
                  p1 +
                  (c1?.sectionItems || []).reduce(
                    (p2, c2) =>
                      p2 +
                      (c2?.units || []).reduce(
                        (p3, c3) => p3 + (c3?.quantity || 0) * (c3?.rate || 0),
                        0
                      ),
                    0
                  ),
                0
              )}
            </Text>
          </Text>

          <Text
            style={[
              textStyles.large,
              { marginBottom: 24, color: colors.dark1 },
            ]}
          >
            TO-DATE:{' '}
            <Text style={{ color: colors.dark0 }}>
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
          </Text>

          <Text
            style={[
              textStyles.large,
              { marginBottom: 24, color: colors.dark1 },
            ]}
          >
            PLANNED:{' '}
            <Text style={{ color: colors.dark0 }}>
              ETB {reportUnits.reduce((p, c) => p + c.planned, 0)}
            </Text>
          </Text>

          <Text
            style={[
              textStyles.large,
              { marginBottom: 24, color: colors.dark1 },
            ]}
          >
            EXECUTED:{' '}
            <Text style={{ color: colors.dark0 }}>
              ETB {reportUnits.reduce((p, c) => p + c.executed, 0)}
            </Text>
          </Text>

          <Text
            style={[
              textStyles.large,
              { marginBottom: 24, color: colors.dark1 },
            ]}
          >
            EXECUTED IN %:{' '}
            <Text style={{ color: colors.dark0 }}>
              {Math.round(
                ((reportUnits.reduce((p, c) => p + c.executed, 0) || 0) /
                  (reportUnits.reduce((p, c) => p + c.planned, 0) || 1)) *
                  100
              )}
              %
            </Text>
          </Text>

          <Text
            style={[
              textStyles.large,
              { marginBottom: 24, color: colors.dark1 },
            ]}
          >
            ATTACHED:{' '}
            <Text style={{ color: colors.dark0 }}>
              {allImg.length} Photo{allImg.length === 1 ? '' : 's'} +{' '}
              {allFile.length} Document{allImg.length === 1 ? '' : 's'}
            </Text>
          </Text>

          <View style={[styles.hr, { marginBottom: 24 }]} />

          <Button
            pressableProps={{ style: { alignSelf: 'flex-end' } }}
            onPress={handleSubmit}
          >
            Send Report
          </Button>
        </View>
      </Handle>
    </>
  );
};

export default ReportAdd;
