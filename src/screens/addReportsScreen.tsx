import React from 'react';
import { View, Text, Button, Alert, PermissionsAndroid } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Header from './components/Util/header/header'
const AddReports = () => {

    const openCamera = async () => {
        // console.log('opened ')
        try {
            const cameraGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            const storeGranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                title: "Store Image Permission",
                message: "App needs access to your Files ",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
            );
            if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED && storeGranted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                launchCamera({ mediaType: 'photo', saveToPhotos: true }, (res: any) => { console.log(res.uri) })
            } else {
                console.log("Camera permission denied");
            }
        }
        catch (err) {
            console.warn(err);
        }

    }

    return (
        <>
            <Header title="Add Report" />
            <View style={{ backgroundColor: '#0C1A59', height: 210, paddingTop: 48, paddingLeft: 24, flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 28, fontWeight: '700' }}>
                    Thu, Dec 20, 2012
                </Text>

            </View>

            <View style={{ marginTop: -84, marginHorizontal: 24, backgroundColor: 'white', height: 'auto', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 32 }}>
                <Text style={{ fontSize: 14, fontWeight: '400', color: '#5A5A5A' }}>
                    For “Project Roobee” in “Lot 1: Bale, East Bale Robe”
                </Text>
                <View style={{
                    borderBottomColor: '#EFF1F1',
                    borderBottomWidth: 1,
                }} />
                <Text> Photos </Text>
                <Button
                    onPress={openCamera}
                    title="+ Add Photo"
                    color="#F59D31"
                />
            </View>
        </>
    );
}

export default AddReports;