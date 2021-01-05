import { TextStyle } from 'react-native';

export const fontFamilyHeading = 'Heebo';
export const fontFamilyBody = 'Heebo';

export const textStyles: { [name: string]: TextStyle } = {
  h1: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 36 * 1.5,
  },
  h2: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32 * 1.5,
  },
  h3: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 28 * 1.5,
  },
  h4: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 24 * 1.5,
  },
  h5: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20 * 1.5,
  },
  h6: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  large: {
    fontFamily: fontFamilyBody,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 18 * 1.5,
  },
  medium: {
    fontFamily: fontFamilyBody,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  small: {
    fontFamily: fontFamilyBody,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 14 * 1.5,
  },
};
