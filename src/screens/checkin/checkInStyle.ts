import { StyleSheet } from 'react-native'

const checkInStyle = StyleSheet.create({
    titleContainer: {
        backgroundColor: '#0C1A59',
        height: 210,
        paddingTop: 48,
        paddingLeft: 24,
    },
    title: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold'
    },
    checkInBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: -84,
        marginHorizontal: 24,
        backgroundColor: 'white',
        height: 168,
        width: 168,
        borderRadius: 100,
        paddingHorizontal: 24,
        paddingVertical: 32
    },
    oldCheckIn: {
        marginTop: 48,
        marginHorizontal: 24,
        borderLeftColor: '#0C1A59',
        borderLeftWidth: 5,
        paddingLeft: 28
    }
})

export default checkInStyle