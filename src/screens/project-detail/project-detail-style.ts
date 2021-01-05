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
    marginTop: -84,
    marginHorizontal: 24,
    backgroundColor: 'white',
    height: 'auto',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  displayRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  name: {
    color: '#5A5A5A',
    fontSize: 14,
    paddingHorizontal: 12,
  },
});

export default project;
