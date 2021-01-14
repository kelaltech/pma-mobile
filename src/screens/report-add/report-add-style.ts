import { StyleSheet } from 'react-native';
import { colors } from '../../assets/styles/colors';
import { textStyles } from '../../assets/styles/text-styles';

export const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.primary,
    height: 'auto',
    minHeight: 350,
    paddingTop: 48,
    paddingHorizontal: 24,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    ...textStyles.h1,
    color: colors.light0,
  },
  card: {
    marginTop: -224,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: colors.light0,
  },
  hr: {
    borderBottomColor: colors.light2,
    borderBottomWidth: 1,
  },
  dualFields: {
    flexDirection: 'row',
  },
  dualFieldsSeparator: {
    alignSelf: 'center',
    paddingHorizontal: 8,
    ...textStyles.large,
    color: colors.dark1,
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 8,
    ...textStyles.medium,
    lineHeight: 24,
    backgroundColor: colors.light2,
    elevation: 1,
  },
});
