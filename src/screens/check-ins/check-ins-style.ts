import { StyleSheet } from 'react-native';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';

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
    fontWeight: 'bold',
  },
  checkInButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -168 / 2,
    marginHorizontal: 24,
    padding: 24,
    width: 168,
    height: 168,
    borderRadius: 168 / 2,
    backgroundColor: colors.light0,
    elevation: 1,
  },
  checkInButtonIcon: {
    width: 48,
    height: 48,
  },
  checkInsContainer: {
    marginVertical: 48,
    marginHorizontal: 24,
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
    paddingLeft: 24,
  },
  checkInCardTitle: {
    marginBottom: 8,
    ...textStyles.h6,
    color: colors.dark0,
  },
  checkInCardDescriptionView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkInCardDescriptionText: {
    ...textStyles.small,
    color: colors.dark1,
  },
});

export default checkInStyle;
