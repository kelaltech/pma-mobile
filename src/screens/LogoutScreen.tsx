
import React from 'react';
import { Text, View } from 'react-native';
import MenuButton from './components/Util/MenuButton';

const LogoutScreen = () => {
    // return TodoScreen with prop isPublic as false
    return (
        <View>
            <Text> Public TODOS </Text>
        </View>
    );
}

LogoutScreen.navigationOptions = ({ }) => ({
    headerTitle: 'Private Todos',
    headerLeft: (
        <MenuButton />
    )
});

export default LogoutScreen;