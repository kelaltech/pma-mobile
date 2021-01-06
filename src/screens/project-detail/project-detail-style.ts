import { StyleSheet } from 'react-native';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';

const project = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#0C1A59',
    height: 210,
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  title: {
    overflow: 'hidden',
    ...textStyles.h1,
    color: colors.light0,
  },
  container: {
    marginTop: -(108 - 24),
    marginHorizontal: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    height: 'auto',
    borderRadius: 8,
    backgroundColor: colors.light0,
  },
  displayRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  name: {
    ...textStyles.small,
    color: colors.dark1,
    paddingRight: 8,
  },
  value: {
    ...textStyles.small,
    color: colors.dark0,
  },
});

export default project;
