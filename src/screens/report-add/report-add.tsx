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
import { styles } from './report-add-style';

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
            For “{data?.project.getProject?.name}” in “
            {/* TODO: get lot info */ 'Lot 1: Bale, East Bale Robe'}”
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
                          keyboardType="numeric"
                          placeholder="Executed"
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
                          style={[styles.input, { flex: 1 }]}
                        />

                        <Text style={styles.dualFieldsSeparator}>/</Text>

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
                          (unitData.find((u) => u.unitId === c?.id)?.executed ||
                            0),
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
                          (unitData.find((u) => u.unitId === c?.id)?.planned ||
                            0),
                        0
                      )}
                    </Text>
                  </Text>
                </View>
              ))}

              <View style={[styles.hr, { marginBottom: 24 }]} />

              <Text
                style={[
                  textStyles.small,
                  { marginBottom: 4, color: colors.dark0 },
                ]}
              >
                Current Work Activity:
              </Text>

              <TextInput
                numberOfLines={4}
                multiline={true}
                style={[styles.input, { height: 'auto', marginBottom: 24 }]}
              />

              <Text
                style={[
                  textStyles.small,
                  { marginBottom: 4, color: colors.dark0 },
                ]}
              >
                Major Problems:
              </Text>

              <TextInput
                numberOfLines={4}
                multiline={true}
                style={[styles.input, { height: 'auto', marginBottom: 24 }]}
              />
            </View>
          ))}

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
              ETB {unitData.reduce((p, c) => p + c.planned, 0)}
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
              ETB {unitData.reduce((p, c) => p + c.executed, 0)}
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
                ((unitData.reduce((p, c) => p + c.executed, 0) || 0) /
                  (unitData.reduce((p, c) => p + c.planned, 0) || 1)) *
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
