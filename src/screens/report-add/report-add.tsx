/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  PermissionsAndroid,
  Image,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Header from '../_shared/header/header';
import FileUploader from './components/file-uploader/file-uploader';
import PhotoUploader from './components/photo-uploader/photo-uploader';
import {
  ReportCreateInput,
  useReportAddMutation,
} from '../../../gen/apollo-types';
// import useReportGetQuery from '../../../gen/apollo-types'
import { addReportStyle } from './report-add-style';

const AddReports = () => {
  const [submitForm] = useReportAddMutation();
  //TODO GET PROJECT ID FROM GLOBAL STATE
  // const { data } = useReportGetQuery({ variables: { projectId } })

  const [submitData, setSubmitData] = useState<ReportCreateInput[]>([]);
  return (
    <>
      <Header title="Add Report" to />
      <ScrollView>
        <View style={addReportStyle.topPart}>
          <Text style={{ color: 'white', fontSize: 28, fontWeight: '700' }}>
            {new Date().getMonth()} {new Date().getDate()},{' '}
            {new Date().getFullYear()}
          </Text>
        </View>

        <View style={addReportStyle.formContainer}>
          {[
            /*data*/
          ].map((section: any, key: any) => (
            <View key={key}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#5A5A5A',
                  paddingBottom: 12,
                }}
              >
                For {section.name}
              </Text>
              <View
                style={{
                  borderBottomColor: '#EFF1F1',
                  borderBottomWidth: 2,
                }}
              />
              <Text style={{ paddingVertical: 12 }}> Photos </Text>
              <PhotoUploader />
              <FileUploader />
              {section.sectionItems.map((items: any, key2: number) => (
                <View key={key2}>
                  <Text>{items.name}</Text>
                  {items.units.map((each: any, key3: number) => (
                    <View key={key3}>
                      <Text>
                        Report Metric Name {each.name} : {each.unit}{' '}
                      </Text>
                      <Text> Amount {each.quantity * each.rate} </Text>
                      <Text> Todate {each.toDate} </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <TextInput placeholder={'Planned'} />
                        <TextInput
                          placeholder={'Executed'}
                          onChange={() => {}}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
        <Button
          onPress={() => {}}
          // onPress={() => submitForm(submitData)}
          title="Submit"
          color="#F59D31"
        />
      </ScrollView>
    </>
  );
};

export default AddReports;
