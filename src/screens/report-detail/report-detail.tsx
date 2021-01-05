/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useReportDetailQuery } from '../../../gen/apollo-types';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';
import Handle from '../_shared/handle/handle';
import Header from '../_shared/header/header';

const ReportDetail = ({ route }: any) => {
  const { reportId } = route.params;

  const { loading, error, data, refetch } = useReportDetailQuery({
    variables: { reportId },
  });

  const report = data?.report.byId;
  const reportUnits = report?.reportUnits;

  return (
    <>
      <Header title="Reports" to />

      <Handle
        {...{ loading, error, data, refreshing: loading, onRefresh: refetch }}
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
            {dayjs(report?.created_at).format('MMM DD, YYYY')}
          </Text>
        </View>

        {(report?.project.sections || []).map((section) => (
          <View
            key={section?.id}
            style={{
              marginTop: -(108 - 24),
              marginHorizontal: 24,
              marginBottom: 24,
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
                ...textStyles.h3,
                color: colors.dark0,
              }}
            >
              {section?.name}
            </Text>

            <View
              style={{
                marginBottom: 24,
                borderBottomColor: colors.light2,
                borderBottomWidth: 1,
              }}
            />

            {(section?.sectionItems || []).map((item, i) => (
              <View key={item?.id}>
                <Text
                  style={{
                    marginBottom: 24,
                    ...textStyles.h6,
                    textTransform: 'uppercase',
                    color: colors.dark0,
                  }}
                >
                  {i + 1}. {item?.name}
                </Text>

                <ScrollView horizontal style={{ width: '100%' }}>
                  <View style={{ width: 984 }}>
                    <View
                      style={{
                        width: 984,
                        flexDirection: 'row',
                        marginBottom: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 288,
                        }}
                      >
                        DESCRIPTION
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 42,
                        }}
                      >
                        UNIT
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 70,
                        }}
                      >
                        QTY
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 70,
                        }}
                      >
                        RATE
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 70,
                        }}
                      >
                        AMOUNT
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 70,
                        }}
                      >
                        TO-DATE
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 70,
                        }}
                      >
                        PLANNED
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 70,
                        }}
                      >
                        EXECUTED
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 0,
                          width: 42,
                        }}
                      >
                        %
                      </Text>
                    </View>

                    {(item?.units || []).map((unit) => {
                      const reportUnit = reportUnits?.find(
                        (u) => u?.unit?.id === unit?.id
                      );

                      return (
                        <View
                          key={unit?.id}
                          style={{
                            width: 984,
                            flexDirection: 'row',
                            marginBottom: 12,
                          }}
                        >
                          <Text
                            style={{
                              color: colors.dark1,
                              marginRight: 24,
                              ...textStyles.small,
                              width: 288,
                            }}
                          >
                            {unit?.name}
                          </Text>
                          <Text
                            style={{
                              color: colors.dark1,
                              marginRight: 24,
                              ...textStyles.small,
                              width: 42,
                            }}
                          >
                            {unit?.unit}
                          </Text>
                          <Text
                            style={{
                              color: colors.dark1,
                              marginRight: 24,
                              ...textStyles.small,
                              width: 70,
                            }}
                          >
                            {unit?.quantity}
                          </Text>
                          <Text
                            style={{
                              color: colors.dark1,
                              marginRight: 24,
                              ...textStyles.small,
                              width: 70,
                            }}
                          >
                            {unit?.rate}
                          </Text>
                          <Text
                            style={{
                              color: colors.dark1,
                              marginRight: 24,
                              ...textStyles.small,
                              width: 70,
                            }}
                          >
                            {(unit?.quantity || 0) * (unit?.rate || 0)}
                          </Text>
                          <Text
                            style={{
                              color: colors.dark1,
                              marginRight: 24,
                              ...textStyles.small,
                              width: 70,
                            }}
                          >
                            {unit?.toDate}
                          </Text>
                          <Text
                            style={{
                              color: colors.dark1,
                              marginRight: 24,
                              ...textStyles.small,
                              width: 70,
                            }}
                          >
                            {reportUnit?.planned}
                          </Text>
                          <Text
                            style={{
                              color: colors.dark1,
                              marginRight: 24,
                              ...textStyles.small,
                              width: 70,
                            }}
                          >
                            {reportUnit?.executed}
                          </Text>
                          <Text
                            style={{
                              color: colors.dark1,
                              marginRight: 0,
                              ...textStyles.small,
                              width: 42,
                            }}
                          >
                            {((reportUnit?.executed || 0) /
                              (reportUnit?.planned || 1)) *
                              100}
                          </Text>
                        </View>
                      );
                    })}

                    <View
                      style={{
                        marginBottom: 12,
                        borderBottomColor: colors.light2,
                        borderBottomWidth: 1,
                      }}
                    />

                    <View
                      style={{
                        width: 984,
                        flexDirection: 'row',
                        marginBottom: 24,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 288,
                        }}
                      >
                        TOTAL CARRIED TO SUMMARY
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24 + 24 + 24 + 24,
                          width: 42 + 70 + 70 + 70,
                        }}
                      />
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 70,
                        }}
                      >
                        {item?.units?.reduce((p, c) => p + (c?.toDate || 0), 0)}
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 70,
                        }}
                      >
                        {item?.units?.reduce((p, c) => {
                          const reportUnit = reportUnits?.find(
                            (u) => u?.unit?.id === c?.id
                          );
                          return p + (reportUnit?.planned || 0);
                        }, 0)}
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 24,
                          width: 70,
                        }}
                      >
                        {item?.units?.reduce((p, c) => {
                          const reportUnit = reportUnits?.find(
                            (u) => u?.unit?.id === c?.id
                          );
                          return p + (reportUnit?.executed || 0);
                        }, 0)}
                      </Text>
                      <Text
                        style={{
                          color: colors.dark0,
                          ...textStyles.small,
                          marginRight: 0,
                          width: 42,
                        }}
                      >
                        {((item?.units?.reduce((p, c) => {
                          const reportUnit = reportUnits?.find(
                            (u) => u?.unit?.id === c?.id
                          );
                          return p + (reportUnit?.executed || 0);
                        }, 0) || 0) /
                          (item?.units?.reduce((p, c) => {
                            const reportUnit = reportUnits?.find(
                              (u) => u?.unit?.id === c?.id
                            );
                            return p + (reportUnit?.planned || 0);
                          }, 0) || 1)) *
                          100}
                        %
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            ))}
          </View>
        ))}

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
          <Text
            style={{
              marginBottom: 24,
              ...textStyles.h3,
              color: colors.dark0,
            }}
          >
            GRAND TOTAL
          </Text>

          <View
            style={{
              marginBottom: 24,
              borderBottomColor: colors.light2,
              borderBottomWidth: 1,
            }}
          />

          <Text
            style={{
              ...textStyles.large,
              color: colors.dark1,
              marginBottom: 24,
            }}
          >
            AMOUNT:{' '}
            <Text style={{ color: colors.dark0 }}>
              ETB{' '}
              {report?.project.sections?.reduce(
                (p0, c0) =>
                  p0 +
                  (c0?.sectionItems?.reduce(
                    (p1, c1) =>
                      p1 +
                      (c1?.units?.reduce(
                        (p2, c2) => p2 + (c2?.quantity || 0) * (c2?.rate || 0),
                        0
                      ) || 0),
                    0
                  ) || 0),
                0
              ) || 0}
            </Text>
          </Text>
          <Text
            style={{
              ...textStyles.large,
              color: colors.dark1,
              marginBottom: 24,
            }}
          >
            TO-DATE:{' '}
            <Text style={{ color: colors.dark0 }}>
              ETB{' '}
              {report?.project.sections?.reduce(
                (p0, c0) =>
                  p0 +
                  (c0?.sectionItems?.reduce(
                    (p1, c1) =>
                      p1 +
                      (c1?.units?.reduce(
                        (p2, c2) => p2 + (c2?.toDate || 0),
                        0
                      ) || 0),
                    0
                  ) || 0),
                0
              ) || 0}
            </Text>
          </Text>
          <Text
            style={{
              ...textStyles.large,
              color: colors.dark1,
              marginBottom: 24,
            }}
          >
            PLANNED:{' '}
            <Text style={{ color: colors.dark0 }}>
              ETB {reportUnits?.reduce((p, c) => p + (c?.planned || 0), 0) || 0}
            </Text>
          </Text>
          <Text
            style={{
              ...textStyles.large,
              color: colors.dark1,
              marginBottom: 24,
            }}
          >
            EXECUTED:{' '}
            <Text style={{ color: colors.dark0 }}>
              ETB{' '}
              {reportUnits?.reduce((p, c) => p + (c?.executed || 0), 0) || 0}
            </Text>
          </Text>
          <Text
            style={{
              ...textStyles.large,
              color: colors.dark1,
              marginBottom: 24,
            }}
          >
            EXECUTED IN %:{' '}
            <Text style={{ color: colors.dark0 }}>
              {Math.round(
                ((reportUnits?.reduce((p, c) => p + (c?.executed || 0), 0) ||
                  0) /
                  (reportUnits?.reduce((p, c) => p + (c?.planned || 0), 0) ||
                    1)) *
                  100
              ) || 0}
              %
            </Text>
          </Text>
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
          <Text
            style={{
              marginBottom: 8,
              ...textStyles.h3,
              color: colors.dark0,
            }}
          >
            Photos
          </Text>
          <Text
            style={{
              marginBottom: 24,
              ...textStyles.small,
              color: colors.dark1,
            }}
          >
            <Text style={{ color: colors.dark0 }}>
              {report?.photos?.length || 0}
            </Text>{' '}
            PHOTO ATTACHMENT
            {report?.photos?.length === 1 ? '' : 'S'} FOUND
          </Text>

          <View
            style={{
              marginBottom: 24,
              borderBottomColor: colors.light2,
              borderBottomWidth: 1,
            }}
          />

          {/* TODO: continue here... */}
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
          <Text
            style={{
              marginBottom: 8,
              ...textStyles.h3,
              color: colors.dark0,
            }}
          >
            Documents
          </Text>
          <Text
            style={{
              marginBottom: 24,
              ...textStyles.small,
              color: colors.dark1,
            }}
          >
            <Text style={{ color: colors.dark0 }}>
              {report?.files?.length || 0}
            </Text>{' '}
            DOCUMENT ATTACHMENT
            {report?.files?.length === 1 ? '' : 'S'} FOUND
          </Text>

          <View
            style={{
              marginBottom: 24,
              borderBottomColor: colors.light2,
              borderBottomWidth: 1,
            }}
          />

          {(report?.files || []).map((file, i) => (
            <Pressable
              key={file?.id}
              android_ripple={{ color: colors.light2 }}
              style={{
                marginBottom: i - 1 < (report?.files?.length || 0) ? 16 : 0,
              }}
              onPress={() => {
                Linking.openURL(file?.url!);
              }}
            >
              <Text style={{ ...textStyles.small, color: colors.primary }}>
                {file?.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </Handle>
    </>
  );
};

export default ReportDetail;
