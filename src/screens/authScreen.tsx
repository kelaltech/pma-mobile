import React, { useState } from 'react';
import { Alert, Text, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import jwtDecoder from 'jwt-decode'
import Login from './LoginScreen'
import { signup, login, signupProps, loginProps } from '../app/authActions'
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AuthScreen = () => {
    const [isLoggedIn, setIsloggedIn] = useState(false)
    const [loginProps, setLoginProps] = useState({ email: '', password: '' })
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
    const [tabIndex, setTabIndex] = useState(0)

    const performSignup = ({ email, password, succesCb, errorCb }: signupProps) => {
        const sucessCallback = () => {
            succesCb();
            setTabIndex(0)
            setLoginProps({ email: email, password: password })
            Alert.alert('Successfully Signed up!')
        }
        signup({ email, password, succesCb, errorCb })
    }

    const performLogin = ({ navigation }: any, { email, password, succesCb, errorCb }: loginProps) => {
        const sucessCallback = (response: any) => {
            succesCb();
            setTabIndex(0)
            const decodedToken = jwtDecoder(response.token)
            AsyncStorage.setItem('Todo', JSON.stringify({
                token: response.token,
                // name: decodedToken.name,

            })).then(() => {
                navigation.navigate('Loading')
            })
            Alert.alert('Successfully Signed up!')
        }
        login({ email, password, succesCb, errorCb })
    }

    const tabs = () => {
        const displayTab = tabIndex === 0 ? <Login type={'login'} submit={performLogin} {...loginProps} /> : <Login type={'signup'} submit={performSignup} />
        let loginTabStyle, signupTabStyle, loginTabTextStyle, signupTabTextStyle;
        if (tabIndex === 0) {
            loginTabStyle = styles.activeTab;
            signupTabStyle = styles.tab;
            loginTabTextStyle = styles.tabHeaderTextActive;
            signupTabTextStyle = styles.tabHeaderText
        } else {
            signupTabStyle = styles.activeTab;
            loginTabStyle = styles.tab;
            loginTabTextStyle = styles.tabHeaderText;
            signupTabTextStyle = styles.tabHeaderTextActive;
        }

        return (
            <View
                style={isKeyboardOpen ? styles.koTabContainer : styles.tabContainer}
            >
                <View style={styles.tabHeader}>
                    <TouchableOpacity style={loginTabStyle} onPress={() => setTabIndex(0)}>
                        <Text style={loginTabTextStyle}>LOG IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={signupTabStyle} onPress={() => setTabIndex(1)}>
                        <Text style={signupTabTextStyle}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.tabContent}
                >
                    {displayTab}
                </View>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
            {!isKeyboardOpen}
            {tabs()}
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