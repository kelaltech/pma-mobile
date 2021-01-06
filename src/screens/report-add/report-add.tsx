/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import {
  useReportAddMutation,
  useReportGetQuery,
} from '../../../gen/apollo-types';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';
import Button from '../_shared/button/button';
import Handle from '../_shared/handle/handle';
import Header from '../_shared/header/header';
import FileUploader from './components/file-uploader/file-uploader';
import PhotoUploader from './components/photo-uploader/photo-uploader';
import { addReportStyle } from './report-add-style';

const projectId = '7330da71-8e87-40a4-aba1-6a1fa0403abe'; //TODO GET PROJECT ID FROM GLOBAL STATE

const ReportAdd = () => {
  const { error, loading, data, refetch } = useReportGetQuery({
    variables: { projectId },
  });

  const sections = data?.section.getProject?.sections;

  const [] = useReportAddMutation();

  return (
    <>
      <Header title="Add Report" to />

      <Handle {...{ error, loading, data, refetch }}>
        <View style={addReportStyle.topPart}>
          <Text style={{ ...textStyles.h1, color: colors.light0 }}>
            {dayjs().format('ddd, MMM DD, YYYY')}
          </Text>
        </View>

        <View style={addReportStyle.formContainer}>
          {(sections || []).map((section) => (
            <View key={section?.id}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#5A5A5A',
                  paddingBottom: 12,
                }}
              >
                For {section?.name}
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

              {(section?.sectionItems || []).map((item) => (
                <View key={item?.id}>
                  <Text>{item?.name}</Text>

                  {(item?.units || []).map((unit) => (
                    <View key={unit?.id}>
                      <Text>
                        {unit?.name} [{unit?.unit}]:
                      </Text>
                      <Text>
                        Amount: {(unit?.quantity || 0) * (unit?.rate || 0)}
                      </Text>
                      <Text>To-Date: {unit?.toDate}</Text>
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

        <View style={{ margin: 24 }}>
          <Button
            pressableProps={{ style: { alignSelf: 'flex-end' } }}
            onPress={() => {}}
            // onPress={() => submitForm(submitData)}
          >
            Submit
          </Button>
        </View>
      </Handle>
    </>
  );
};

export default ReportAdd;
