import React, { useState } from 'react';
import { Alert, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

const LoginScreen = (props: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = () => {
        if (!emailRegex.test(email.toLowerCase())) {
            Alert.alert('Invalid email', 'Please enter a valid email address');
            return;
        }
        if (!email || !password) {
            Alert.alert('Email or password cannot be empty');
            return;
        }
        const successCallback = () => {
            if (props.type === 'login') {
                setEmail('')
                setPassword('')
            }
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
        <View style={styles.container}>
            <View style={styles.textboxWrapper}>
                <View style={styles.labelWrapper}>
                    <Icon
                        name="mail-outline"
                        size={14}
                        style={styles.labelIcon}
                    />
                    <Text style={styles.labelText}> Email </Text>
                </View>
                <TextInput
                    style={styles.textbox}
                    placeholder="Email"
                    placeholderTextColor="#808389"
                    value={email}
                    onChangeText={(val) => {
                        setEmail(val)
                    }}
                />
            </View>
            <View style={styles.textboxWrapper}>
                <View style={styles.labelWrapper}>
                    <Icon
                        name="lock-outline"
                        size={13}
                        style={styles.labelIcon}
                    />
                    <Text style={styles.labelText}> Password </Text>
                </View>
                <TextInput
                    style={styles.textbox}
                    placeholder="Password"
                    placeholderTextColor="#808389"
                    secureTextEntry
                    value={password}
                    onChangeText={(pass)=>{
                        setPassword(pass)
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleSubmit}
                disabled={loading}
            >
                {
                    loading ?
                        <Text> Loading </Text>
                        :
                        <Text style={{ color: 'white', fontWeight: 'bold' }} >Log in</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    textboxWrapper: {
        height: 60,
        width: 340,
        fontSize: 50,
        marginBottom: 20
    },
    textbox: {
        backgroundColor: '#D5CEE7',
        borderRadius: 7,
        padding: 5,
        paddingHorizontal: 10,
        fontSize: 13,
        height: 40,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 340,
        backgroundColor: '#39235A',
        marginBottom: 30,
        borderRadius: 20
    },
    labelWrapper: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center'
    },
    labelText: {
        fontSize: 13,
    },
    labelIcon: {
        marginRight: 5
    }
})
