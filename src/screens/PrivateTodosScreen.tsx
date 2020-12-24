
import React from 'react';
import { Text, View } from 'react-native';
// import MenuButton from './components/Util/MenuButton';

const PrivateTodosScreen = () => {
    // return TodoScreen with prop isPublic as false
    return (
        <View>
            <Text>
                Private Screen TODO
            </Text>
        </View>
    );
}

PrivateTodosScreen.navigationOptions = ({  }) => ({
    headerTitle: 'Private Todos',
    // headerLeft: (
    //     <MenuButton/>
    // )
});

export default PrivateTodosScreen;