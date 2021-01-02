import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';

const Header = (props: any) => {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#0C1A59', height: 75, paddingTop: 25 }}>
            <View>
                {props.to ? (
                    <Icon name="arrow-left" size={25} color="white" onPress={() => navigation.goBack()} />
                ) : <Text style={{ color: 'white' }}>Logo</Text>}
            </View>
            <Text style={{ fontSize: 20, color: 'white' }}> {props.title} </Text>
            <Text style={{ flexDirection: 'row', alignSelf: 'flex-end', fontSize: 20, color: 'white' }}> Site 2 </Text>
            <TouchableOpacity>
                <Text style={{ fontSize: 20, color: 'white' }}>LogOut </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Header;