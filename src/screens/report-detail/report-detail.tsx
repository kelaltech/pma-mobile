import React from 'react';
import { Text } from 'react-native';
import { useReportDetailQuery } from '../../../gen/apollo-types';
import Handle from '../_shared/handle/handle';
import Header from '../_shared/header/header';

const ReportDetail = ({ route }: any) => {
  const { reportId } = route.params;

  const { loading, error, data } = useReportDetailQuery({
    variables: { reportId },
  });

  return (
    <>
      <Header title="Reports" to />

      <Handle {...{ loading, error, data }}>
        <Text> Report id: {JSON.stringify(reportId)} </Text>
      </Handle>
    </>
  );
};

export default ReportDetail;
