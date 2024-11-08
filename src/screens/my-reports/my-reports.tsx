/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useMyReportsQuery } from '../../../gen/apollo-types';
import { useMyProject } from '../../app/states/my-project/use-my-project';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';
import Button from '../_shared/button/button';
import Handle from '../_shared/handle/handle';
import Header from '../_shared/header/header';

const MyReports = () => {
  const navigation = useNavigation();

  const { myProject } = useMyProject();
  const { loading, error, data, refetch } = useMyReportsQuery({
    variables: { projectId: myProject.id || '' },
    fetchPolicy: 'cache-and-network',
  });
  useEffect(() => {
    refetch({ projectId: myProject.id || '' });
  }, [myProject.id, refetch]);
  // console.log(data?.report?.pendingReport);
  return (
    <>
      <Header title="PMA" />

      <Handle
        {...{
          loading,
          error,
          data,
          refetch: () => refetch({ projectId: myProject.id || '' }),
        }}
      >
        <View
          style={{
            backgroundColor: colors.primary,
            height: 'auto',
            minHeight: 210,
            paddingTop: 48,
            paddingHorizontal: 24,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              flex: 1,
              paddingBottom: 108,
              height: 'auto',
              ...textStyles.h1,
              color: colors.light0,
            }}
          >
            My Reports
          </Text>
          <Pressable
            android_ripple={{ color: colors.accent }}
            style={{ marginTop: 7 }}
          >
            <Button onPress={() => navigation.navigate('ReportAdd')}>
              + Report
            </Button>
          </Pressable>
        </View>

        <View
          style={{
            marginTop: -(108 - 24),
            marginHorizontal: 24,
            marginBottom: 48,
            paddingTop: 32,
            paddingHorizontal: 24,
            paddingBottom: 8,
            borderRadius: 8,
            backgroundColor: colors.light0,
          }}
        >
          <Text
            style={{
              marginBottom: 24,
              ...textStyles.small,
              textTransform: 'uppercase',
              color: colors.dark1,
            }}
          >
            {data?.report.myReports?.reports.length || 0} STATUS REPORT
            {data?.report.myReports?.reports.length === 1 ? '' : 'S'} AVAILABLE
          </Text>

          <View
            style={{
              marginBottom: 24,
              borderBottomColor: colors.light2,
              borderBottomWidth: 1,
            }}
          />

          {!data?.report.pendingReport ? null : (
            <View>
              <Pressable
                android_ripple={{ color: colors.accent }}
                onPress={() =>
                  navigation.navigate('ReportEdit', {
                    reportId: data?.report.pendingReport?.id,
                  })
                }
                style={{ marginBottom: 24 }}
              >
                <Text
                  style={{
                    ...textStyles.h6,
                    textTransform: 'uppercase',
                    color: colors.primary,
                    marginBottom: 8,
                  }}
                >
                  {dayjs(data.report.pendingReport.created_at).format(
                    'ddd, MMM DD, YYYY'
                  )}
                  <Text
                    style={{
                      ...textStyles.h6,
                      textTransform: 'uppercase',
                      color: colors.accent,
                      marginBottom: 8,
                    }}
                  >
                    {'  '} (Pending)
                  </Text>
                </Text>
                <Text style={{ marginBottom: 8, color: colors.dark1 }}>
                  Report for{' '}
                  <Text style={{ color: colors.dark0 }}>
                    “{myProject.name}”
                  </Text>
                </Text>
              </Pressable>
            </View>
          )}

          {(data?.report.myReports?.reports || []).map((report) => (
            <Pressable
              key={report.id}
              android_ripple={{ color: colors.accent }}
              onPress={() =>
                navigation.navigate('ReportDetail', { reportId: report.id })
              }
              style={{ marginBottom: 24 }}
            >
              <Text
                style={{
                  ...textStyles.h6,
                  textTransform: 'uppercase',
                  color: colors.primary,
                  marginBottom: 8,
                }}
              >
                {dayjs(report.created_at).format('ddd, MMM DD, YYYY')}
              </Text>

              <Text style={{ marginBottom: 8, color: colors.dark1 }}>
                Report for{' '}
                <Text style={{ color: colors.dark0 }}>
                  “{report.project.name}”
                </Text>
              </Text>

              <Text style={{ color: colors.dark1 }}>
                EXECUTED:{' '}
                <Text style={{ color: colors.dark0 }}>
                  {Math.round(
                    ((report.reportUnits || []).reduce(
                      (p, c) => p + (c?.executed || 0),
                      0
                    ) /
                      (report.reportUnits || []).reduce(
                        (p, c) => p + (c?.planned || 0),
                        0
                      )) *
                      100
                  )}
                  %
                </Text>
              </Text>
            </Pressable>
          ))}
        </View>
      </Handle>
    </>
  );
};

export default MyReports;
