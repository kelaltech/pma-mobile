import React from 'react';
import { Text } from 'react-native';
import Header from '../_shared/header/header';

const ReportDetail = ({ route }: any) => {
  const { reportId } = route.params;
  return (
    <>
      <Header title="Reports" to />
      <Text> Report id: {JSON.stringify(reportId)} </Text>
    </>
  );
};

export default ReportDetail;
