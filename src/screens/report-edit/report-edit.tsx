/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';

const ReportEdit = () => {
  const route = useRoute<
    RouteProp<{ ReportEdit: { reportId: string } }, 'ReportEdit'>
  >();
  const { reportId } = route.params;
  return (
    <>
      <Text> Edit Report {reportId}</Text>
    </>
  );
};

export default ReportEdit;
