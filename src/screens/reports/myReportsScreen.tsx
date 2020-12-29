import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Util/header/header'

const MyReports = ({ navigation }: any) => {
    return (
        <>      
            <Header title="PMA"/>      
            <View style={{ backgroundColor: '#0C1A59', height: 210, paddingTop: 48, paddingLeft: 24, flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 28, fontWeight: '700' }}>
                    Project: Roobee
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddReport')}>
                    <Text style={{ color: 'white', fontSize: 18}}> + Report</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: -84, marginHorizontal: 24, backgroundColor: 'white', height: 'auto', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 32 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ReportDetail', {reportId: 272})}>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#5A5A5A' }}>
                        4 STATUS REPORTS AVAILABLE
                    </Text>
                    <View style={{
                        borderBottomColor: '#EFF1F1',
                        borderBottomWidth: 1,
                    }} />
                    {/* Make it a component or something TODO */}
                    <View>
                        <Text style={{ color: '#0C1A59', fontSize: 18, fontWeight: 'bold' }} >WED, DEC 23, 2020</Text>
                        <Text>Report for “Project: Roobee” </Text>
                        <Text>EXECUTED: 3.68%</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
            
        </>
    );
}

export default MyReports;