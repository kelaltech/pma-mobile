
import React from 'react';
import { Text, View } from 'react-native';

const Signup = (props: any) => {
    // return TodoScreen with prop isPublic as false
    return (
        <View>
            <Text> Signup TODOS </Text>
        </View>
    );
}

Signup.navigationOptions = ({ }) => ({
    headerTitle: 'Private Todos',

});

export default Signup;