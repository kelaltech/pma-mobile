import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Header from './components/Util/header/header'
import Geolocation from '@react-native-community/geolocation';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CheckIn = () => {

    return (
        <>
            <Header title="Check in" />
            <View style={{ backgroundColor: '#0C1A59', height: 210, paddingTop: 48, paddingLeft: 24, flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 28, fontWeight: '700' }}>
                    My check-ins
                </Text>
            </View>
            <View style={{ alignItems: 'center', alignSelf: 'center', marginTop: -84, marginHorizontal: 24, backgroundColor: 'white', height: 200, width: 200, borderRadius: 100, paddingHorizontal: 24, paddingVertical: 32 }}>
                <TouchableOpacity onPress={() => Geolocation.getCurrentPosition(info => console.log(info))}>
                    <View style={{ alignItems: 'center', alignSelf: 'center', backgroundColor: 'white' }}>
                        <Icon name="map-marker-alt" size={60} color="#F59D31" />
                        <Text style={{ fontSize: 20 }}>CHECK-IN RIGHT HERE</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 24, borderLeftColor: '#0C1A59', borderLeftWidth: 5 }}>
                <Text> Previous Text </Text>
            </View>
        </>
    );
}

export default CheckIn;