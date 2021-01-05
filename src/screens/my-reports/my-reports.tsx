/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useMyReportsQuery } from '../../../gen/apollo-types';
import { colors } from '../../assets/styles/colors';
import Header from '../_shared/header/header';
import Handle from '../_shared/handle/handle';
import { textStyles } from '../../assets/styles/text-styles';
import dayjs from 'dayjs';
import Button from '../_shared/button/button';

const projectId = '7330da71-8e87-40a4-aba1-6a1fa0403abe'; // TODO: get from global context

const MyReports = () => {
  const navigation = useNavigation();

  const { loading, error, data, refetch } = useMyReportsQuery({
    variables: { projectId },
  });

  return (
    <Handle
      {...{ loading, error, data, refreshing: loading, onRefresh: refetch }}
    >
      <Header title="PMA" />

      <View
        style={{
          backgroundColor: '#0C1A59',
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
          <Button onPress={() => navigation.navigate('AddReport')}>
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
          {data?.report.myReports.length || 0} STATUS REPORT
          {data?.report.myReports.length === 1 ? '' : 'S'} AVAILABLE
        </Text>

        <View
          style={{
            marginBottom: 24,
            borderBottomColor: colors.light2,
            borderBottomWidth: 1,
          }}
        />

        {(data?.report.myReports || []).map((report) => (
          <Pressable
            key={report.id}
            android_ripple={{ color: colors.accent }}
            onPressOut={() =>
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
                  (report.reportUnits || []).reduce(
                    (p, c) => (p += c?.executed || 0),
                    0
                  ) / (report.reportUnits?.length || 1)
                )}
                %
              </Text>
            </Text>
          </Pressable>
        ))}
      </View>
    </Handle>
  );
};

export default MyReports;
