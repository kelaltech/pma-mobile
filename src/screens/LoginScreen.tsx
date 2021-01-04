import React, { useState } from 'react';
import { Alert, Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';

const LoginScreen = (props: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        if (!email || !password) {
            Alert.alert('Email or password cannot be empty');
            return;
        }
        const successCallback = () => {
            setLoading(false)
        };
        const errorCallback = (e: any) => {
            setLoading(false)
            Alert.alert(e.title, e.message);
        }
        setLoading(true)
        props.submit(email.toLowerCase(), password, successCallback, errorCallback)
    }


    return (
        <View style={loginStlye.container}>
            <Image source={require('../assets/image/ECO.png')} style={loginStlye.img} />
            <View style={loginStlye.textboxWrapper}>
                <Text style={{ color: '#5A5A5A', fontSize: 14 }}> Username</Text>
                <TextInput
                    style={loginStlye.textbox}
                    placeholderTextColor="#808389"
                    value={email}
                    onChangeText={(val) => {
                        setEmail(val)
                    }}
                />
                <View style={{ paddingTop: 24 }} />
                <Text style={{ color: '#5A5A5A', fontSize: 14 }}> Password</Text>
                <TextInput
                    style={loginStlye.textbox}
                    secureTextEntry={true}
                    placeholderTextColor="#808389"
                    value={password}
                    onChangeText={(pass) => {
                        setPassword(pass)
                    }}
                />
            </View>
            <View style={loginStlye.logBtn}>
                <Button
                    onPress={handleSubmit}
                    title="Login"
                    disabled={loading}
                    color='#F59D31'
                />
            </View>
        </View>
    );
}

export default LoginScreen;

const loginStlye = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '89%',
        alignSelf: 'center',
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingVertical: 48
    },
    img: {
        width: 120,
        height: 120,
        alignSelf: 'center'
    },
    textboxWrapper: {
        paddingVertical: 48,
    },
    textbox: {
        backgroundColor: '#EFF1F1',
        height: 36,
        borderRadius: 6
    },
    logBtn: {
        borderRadius: 8,
        backgroundColor: 'red'
    }
})
