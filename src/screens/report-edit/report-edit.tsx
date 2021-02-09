/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View, Alert, TextInput, Image, Pressable } from 'react-native';
import Header from '../_shared/header/header';
import {
  ReportUpdateInput,
  ReportUnitCreateInput,
  useGetReportEditQuery,
  useReportEditMutation,
  useCreateCommentMutation,
  CommentCreateInput,
} from '../../../gen/apollo-types';
import { useMyProject } from '../../app/states/my-project/use-my-project';
import Handle from '../_shared/handle/handle';
import { styles } from './report-edit-style';
import dayjs from 'dayjs';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';
import PhotoUploader from '../report-add/components/photo-uploader/photo-uploader';
import FileUploader from '../report-add/components/file-uploader/file-uploader';
import AsyncStorage from '@react-native-community/async-storage';
import { ReactNativeFile } from 'apollo-upload-client';
import { DocumentPickerResponse } from 'react-native-document-picker';
import * as mime from 'react-native-mime-types';
import Button from '../_shared/button/button';
import { useAuth } from '../../app/states/auth/use-auth';

const ReportEdit = () => {
  const { myProject } = useMyProject();
  const route = useRoute<
    RouteProp<{ ReportEdit: { reportId: string } }, 'ReportEdit'>
  >();
  const { reportId } = route.params;

  const { error, loading, data, refetch } = useGetReportEditQuery({
    variables: { reportId: reportId || '' },
    fetchPolicy: 'cache-and-network',
  });
  const [commentVal, setCommentVal] = useState('');
  const [addComment] = useCreateCommentMutation();
  const comments = data?.comment.byReportId;

  const sections = useMemo(() => data?.report?.byId?.project?.sections || [], [
    data,
  ]);
  const [allImg, setAllImg] = useState<{ uri?: string }[]>([]);
  const [allFile, setAllFile] = useState<{ uri?: string }[]>([]);
  const [removeImg, setRemoveImg] = useState<string[]>([]);
  const [removeFile, setRemoveFile] = useState<string[]>([]);
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
        AsyncStorage.setItem(
          'reportUnits',
          JSON.stringify(_reportUnits)
        ).catch((e) =>
          Alert.alert(
            'Error :(',
            `Unable to save progress: ${e?.message || 'unknown error'}`
          )
        );
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
          if (_currentWorkActivity === '') {
            _setCurrentWorkActivity(
              data?.report.byId?.current_work_problems || ''
            );
            AsyncStorage.setItem(
              'currentWorkActivity',
              data?.report.byId?.current_work_problems || ''
            ).catch((e) =>
              Alert.alert(
                'Error :(',
                `Unable to save currentWorkActivity: ${
                  e?.message || 'unknown error'
                }`
              )
            );
          } else {
            _setCurrentWorkActivity(_currentWorkActivity);
          }
        } else {
          _setCurrentWorkActivity(
            data?.report.byId?.current_work_problems || ''
          );
          AsyncStorage.setItem(
            'currentWorkActivity',
            data?.report.byId?.current_work_problems || ''
          ).catch((e) =>
            Alert.alert(
              'Error :(',
              `Unable to save currentWorkActivity: ${
                e?.message || 'unknown error'
              }`
            )
          );
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
          if (_majorProblems === '') {
            _setMajorProblems(data?.report.byId?.major_problems || '');
            AsyncStorage.setItem(
              'majorProblems',
              data?.report.byId?.major_problems || ''
            ).catch((e) =>
              Alert.alert(
                'Error :(',
                `Unable to save majorProblems: ${e?.message || 'unknown error'}`
              )
            );
          } else {
            _setMajorProblems(_majorProblems);
          }
        } else {
          _setMajorProblems(data?.report.byId?.major_problems || '');
          AsyncStorage.setItem(
            'majorProblems',
            data?.report.byId?.major_problems || ''
          ).catch((e) =>
            Alert.alert(
              'Error :(',
              `Unable to save majorProblems: ${e?.message || 'unknown error'}`
            )
          );
        }
      })
      .catch((e) =>
        Alert.alert(
          'Error :(',
          `Unable to fetch majorProblems: ${e?.message || 'unknown error'}`
        )
      );
  }, [data, sections]);

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
  const [addReport] = useReportEditMutation();
  const handleSubmit = useCallback(() => {
    const input: ReportUpdateInput = {
      reportId: reportId || '',
      approved_by: '',
      newFiles: allFile,
      removedFiles: removeFile || [],
      newPhotos: allImg,
      removedPhotos: removeImg || [],
      reportUnits: reportUnits,
      current_work_problems: currentWorkActivity,
      major_problems: majorProblems,
    };
    console.log(reportUnits);
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
        if (response.data?.report.updateReport?.id) {
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
    navigation,
    removeImg,
    reportId,
    reportUnits,
    removeFile,
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
  const removePhoto = useCallback(
    (id: string) => {
      Alert.alert(
        'Remove Confirmation',
        'Are you sure you want to remove this file?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            style: 'default',
            onPress: () => {
              const updatePhotos = [...removeImg, id];
              setRemoveImg(updatePhotos);
            },
          },
        ]
      );
    },
    [removeImg]
  );
  const removeDoc = useCallback(
    (id: string) => {
      Alert.alert(
        'Remove Confirmation',
        'Are you sure you want to remove this file?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            style: 'default',
            onPress: () => {
              const updateFile = [...removeFile, id || ''];
              setRemoveFile(updateFile);
            },
          },
        ]
      );
    },
    [removeFile]
  );

  const { account } = useAuth()[0];
  const handleComment = useCallback(() => {
    const input: CommentCreateInput = {
      content: commentVal || '',
      reportId: reportId,
      userId: account?.id!,
    };

    addComment({ variables: { input }, fetchPolicy: 'no-cache' })
      .then(({ errors }) => {
        if (errors?.length) {
          Alert.alert('Error :(', errors[0]?.message || 'Unknown error');
          return;
        }
        setCommentVal('');
        refetch({ reportId });
      })
      .catch((err) => Alert.alert('Error :(', err?.message || 'Unknown error'));
  }, [account, addComment, commentVal, refetch, reportId]);
  return (
    <>
      <Header title="Edit Report" to />
      <Handle
        {...{
          error,
          loading,
          data,
          refetch: () => refetch({ reportId: reportId }),
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
            For “{myProject.name}”
          </Text>

          <View style={[styles.hr, { marginBottom: 24 }]} />

          <Text
            style={[textStyles.h5, { marginBottom: 24, color: colors.dark0 }]}
          >
            Photos
          </Text>

          {data?.report.byId?.photos?.length ? (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginRight: -24,
              }}
            >
              {data?.report.byId?.photos.map((photo, index) => (
                <>
                  {!removeImg.find((i) => i === photo?.id) ? (
                    <View
                      key={`${index}-${photo?.url}`}
                      style={{
                        flex: 1,
                        minWidth: `${100 / 3}%`,
                        maxWidth: `${100 / 3}%`,
                      }}
                    >
                      <Image
                        source={{ uri: `${photo?.url}` }}
                        style={{
                          height: 70,
                          marginRight: 24,
                        }}
                      />
                      <Pressable
                        android_ripple={{ color: colors.accent }}
                        onPressOut={() => removePhoto(photo?.id || '')}
                        style={{
                          marginBottom: 24,
                          marginRight: 24,
                          height: 21,
                          backgroundColor: colors.warn,
                        }}
                      >
                        <Text
                          style={[
                            textStyles.small,
                            {
                              alignSelf: 'center',
                              ...textStyles.large,
                              lineHeight: 24,
                              color: colors.light0,
                            },
                          ]}
                        >
                          Delete
                        </Text>
                      </Pressable>
                    </View>
                  ) : null}
                </>
              ))}
            </View>
          ) : null}
          <PhotoUploader onChange={photosOnChange} />

          <View style={[styles.hr, { marginBottom: 24 }]} />

          <Text
            style={[textStyles.h5, { marginBottom: 24, color: colors.dark0 }]}
          >
            Documents
          </Text>
          {data?.report.byId?.files?.length
            ? data?.report.byId?.files.map((document, index) => (
                <>
                  {!removeFile.find((i) => i === document?.id) ? (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        marginBottom: index < allFile.length - 1 ? 12 : 24,
                      }}
                    >
                      <Text
                        style={[
                          textStyles.medium,
                          { flex: 1, flexWrap: 'wrap', color: colors.dark1 },
                        ]}
                      >
                        {document?.name}
                      </Text>
                      <Pressable onPress={() => removeDoc(document?.id || '')}>
                        <Text
                          style={[textStyles.medium, { color: colors.dark1 }]}
                        >
                          {'  '}(
                          <Text style={[{ color: colors.warn }]}>Remove</Text>)
                        </Text>
                      </Pressable>
                    </View>
                  ) : null}
                </>
              ))
            : null}
          <FileUploader onChange={documentsOnChange} />

          <View style={[styles.hr, { marginBottom: 24 }]} />
          {(data?.report.byId?.project.sections || []).map((section) => (
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
                          // onChangeText={(val) => {
                          //   setReportUnits(
                          //     reportUnits.map((u) => {
                          //       if (u.unitId === unit?.id) {
                          //         return { ...u, planned: Number(val) };
                          //       } else {
                          //         return { ...u };
                          //       }
                          //     })
                          //   );
                          // }}
                          keyboardType="numeric"
                          placeholder="Planned *"
                          editable={false}
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
          <View>
            <Text
              style={{ ...textStyles.h2, paddingLeft: 24, paddingBottom: 24 }}
            >
              Comments
            </Text>
            <View>
              {comments?.map((comment) => (
                <View
                  key={comment.id}
                  style={{
                    marginHorizontal: 24,
                    marginBottom: 24,
                    paddingTop: 32,
                    paddingHorizontal: 24,
                    paddingBottom: 8,
                    borderRadius: 8,
                    backgroundColor: colors.light0,
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ ...textStyles.h6, paddingBottom: 12 }}>
                      {comment.user.name}
                    </Text>
                    <View style={{ flex: 1 }} />
                    <Text>
                      {dayjs(comment.created_at)
                        .format('MMM, DD, YYYY')
                        .toString()}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: colors.light2,
                      borderBottomWidth: 2,
                    }}
                  />
                  <Text
                    style={{
                      paddingTop: 12,
                      ...textStyles.large,
                      color: colors.dark1,
                    }}
                  >
                    {comment.content}
                  </Text>
                </View>
              ))}
            </View>

            <View
              style={{
                marginHorizontal: 24,
                marginBottom: 24,
                paddingTop: 32,
                paddingHorizontal: 24,
                paddingBottom: 8,
                borderRadius: 8,
                backgroundColor: colors.light0,
              }}
            >
              <Text style={{ paddingBottom: 12, ...textStyles.small }}>
                Add your comment:
              </Text>
              <TextInput
                value={commentVal}
                onChangeText={setCommentVal}
                numberOfLines={4}
                multiline={true}
                style={{
                  backgroundColor: colors.light2,
                  borderRadius: 8,
                  justifyContent: 'flex-start',
                }}
              />
              <View style={{ margin: 24 }}>
                <Button
                  pressableProps={{ style: { alignSelf: 'flex-end' } }}
                  onPress={handleComment}
                >
                  Comment
                </Button>
              </View>
            </View>
          </View>
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

export default ReportEdit;
