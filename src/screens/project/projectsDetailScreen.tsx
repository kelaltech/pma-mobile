import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Util/header/header';
import project from './projectDetailStyle';
import ProgressBar from '../components/Util/progressBar/progressBar';
import { ScrollView } from 'react-native-gesture-handler';

const ProjectDetail = () => {
  return (
    <>
      <Header title="PMA" />
      <ScrollView>
        <View style={project.titleContainer}>
          <Text style={project.title}>Project: Roobee</Text>
        </View>

        <View style={project.container}>
          <ProgressBar planned={75} executed={69} />

          {/* name & location */}
          <View style={{ paddingVertical: 12 }}>
            <View style={[project.diplayRow, { paddingTop: 20 }]}>
              <Text style={project.name}>Project Name:</Text>
              <Text>Roobee</Text>
            </View>
            <View style={[project.diplayRow, { paddingTop: 20 }]}>
              <Text style={project.name}>Location:</Text>
              <Text>Roobee</Text>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: '#EFF1F1',
              borderBottomWidth: 2,
              paddingBottom: 12,
            }}
          />

          {/* Contractor info */}
          <View style={{ paddingVertical: 12 }}>
            <View style={[project.diplayRow, { paddingTop: 20 }]}>
              <Text style={project.name}>Contractor:</Text>
              <Text>Girma G/silase</Text>
            </View>
            <View style={[project.diplayRow, { paddingTop: 20 }]}>
              <Text style={project.name}>Contract Signature Date:</Text>
              <Text>Oct 19, 2020</Text>
            </View>
            <View style={[project.diplayRow, { paddingTop: 20 }]}>
              <Text style={project.name}>
                Contract Value Main Agreement (Before VAT):
              </Text>
              <Text>ETB 31,540,469.12</Text>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: '#EFF1F1',
              borderBottomWidth: 2,
              paddingBottom: 12,
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ProjectDetail;
