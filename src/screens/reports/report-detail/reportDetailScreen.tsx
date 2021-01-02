import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Util/header/header'


const ReportDetail = ({ route }: any) => {
    const { reportId } = route.params
    return (
        <>
            <Header title="Reports" to="MyReports" />
            <Text> Report id:  {JSON.stringify(reportId)} </Text>
        </>
    );
}

export default ReportDetail;