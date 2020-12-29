import React, { useState } from 'react';
import { Alert, Text, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import jwtDecoder from 'jwt-decode'
import Login from './LoginScreen'
import { login, loginProps } from '../app/authActions'
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AuthScreen = () => {
    const [isLoggedIn, setIsloggedIn] = useState(false)
    const [loginProps, setLoginProps] = useState({ email: '', password: '' })
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
    // const [tabIndex, setTabIndex] = useState(0)

  
    const performLogin = ({ navigation }: any, { email, password, succesCb, errorCb }: loginProps) => {
        const sucessCallback = (response: any) => {
            succesCb();
           
            // const decodedToken = jwtDecoder(response.token)
            AsyncStorage.setItem('Todo', JSON.stringify({
                token: response.token,
                // name: decodedToken.name,

            })).then(() => {
                navigation.navigate('Loading')
            })
            Alert.alert('Successfully Signed up!')
        }
        login({ email, password, sucessCallback, errorCb })
    }

        return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
            {!isKeyboardOpen}
            <Login type="login" submit={performLogin}/>
        </KeyboardAvoidingView>
    );
}

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    tabContainer: {
        flex: 0.5,
        width: 400,
        marginTop: 40
    },
    tabHeader: {
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginBottom: 40
    },
    tabContent: {
        flex: 1,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#D5CEE7',
        borderBottomWidth: 1,
    },
    activeTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#39235A',
        borderBottomWidth: 3,
    },
    tabHeaderText: {
        fontSize: 18,
        color: '#808389',
        alignSelf: 'center',
        marginBottom: 15
    },
    tabHeaderTextActive: {
        fontSize: 18,
        color: '#39235A',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginBottom: 15
    },
    titleContainer: {
        flex: 0.5,
        marginTop: 40,
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    },
    titleTextWrapper: {
        flex: 1,
        fontSize: 30,
        marginTop: 30
    },
    title: {
        fontSize: 50,
        textAlign: 'left',
        fontWeight: '900',
        color: '#39235A'
    },
    logoWrapper: {
        paddingHorizontal: 20,
        marginBottom: 40
    },
    logo: {
        height: 40,
        width: 134
    },
    koTabContainer: {
        width: 400,
        marginTop: 40,
        maxHeight: 400,
        flex: 1
    },
});