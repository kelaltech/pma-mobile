import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Util/header/header'
const ProjectDetail = () => {
    return (
        <>
          <Header title="PMA"/>  

            <View style={{ backgroundColor: '#0C1A59', height: 210, paddingTop: 48, paddingLeft: 24}}>
              <Text style={{color: 'white', fontSize: 28, fontWeight: '700'}}>
                  Project: Roobee
              </Text>
          </View>

          <View style={{marginTop: -84, marginHorizontal: 24, backgroundColor: 'white', height: 'auto', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 32}}>
            <Text>
                Project Name: Roobee
            </Text>  
            <Text>
                    Location: Roobee
            </Text>  
            <View style={{
                borderBottomColor: '#EFF1F1',
                borderBottomWidth: 1,}}/>           
          </View>
        </>
    );
}

export default ProjectDetail;