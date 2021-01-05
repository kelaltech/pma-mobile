/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../assets/styles/colors';
import Header from '../_shared/header/header';

const MyReports = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header title="PMA" />
      <View
        style={{
          backgroundColor: '#0C1A59',
          height: 210,
          paddingTop: 48,
          paddingHorizontal: 24,
          flexDirection: 'row',
        }}
      >
        <Text
          style={{ color: 'white', flex: 1, fontSize: 28, fontWeight: '700' }}
        >
          Project: Roobee
        </Text>
        <TouchableOpacity>
          <Button
            onPress={() => navigation.navigate('AddReport')}
            title="+ Report"
            color={colors.secondary}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: -84,
          marginHorizontal: 24,
          backgroundColor: 'white',
          height: 'auto',
          borderRadius: 8,
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('ReportDetail', { reportId: 272 })}
        >
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#5A5A5A' }}>
            4 STATUS REPORTS AVAILABLE
          </Text>
          <View
            style={{
              borderBottomColor: '#EFF1F1',
              borderBottomWidth: 1,
            }}
          />
          {/* Make it a component or something TODO */}
          <View>
            <Text
              style={{ color: '#0C1A59', fontSize: 18, fontWeight: 'bold' }}
            >
              WED, DEC 23, 2020
            </Text>
            <Text>Report for “Project: Roobee” </Text>
            <Text>EXECUTED: 3.68%</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MyReports;
