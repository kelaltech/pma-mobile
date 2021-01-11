import { StyleSheet } from 'react-native';
import { colors } from '../../assets/styles/colors';

export const addReportStyle = StyleSheet.create({
  topPart: {
    backgroundColor: '#0C1A59',
    height: 210,
    paddingTop: 48,
    paddingLeft: 24,
  },
  formContainer: {
    marginTop: -84,
    marginHorizontal: 24,
    backgroundColor: '#fff',
    height: 'auto',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  textInput: {
    backgroundColor: colors.light1,
    width: '45%',
    color: 'black',
    paddingLeft: 12,
    borderRadius: 8,
  },
});
