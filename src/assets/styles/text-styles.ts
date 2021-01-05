import { TextStyle } from 'react-native';

export const fontFamilyHeading = 'Heebo';
export const fontFamilyBody = 'Heebo';

export const textStyles = {
  h1: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 36 * 1.5,
  } as TextStyle,
  h2: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 32 * 1.5,
  } as TextStyle,
  h3: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 28 * 1.5,
  } as TextStyle,
  h4: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 24 * 1.5,
  } as TextStyle,
  h5: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20 * 1.5,
  } as TextStyle,
  h6: {
    fontFamily: fontFamilyHeading,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16 * 1.5,
  } as TextStyle,
  large: {
    fontFamily: fontFamilyBody,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 18 * 1.5,
  } as TextStyle,
  medium: {
    fontFamily: fontFamilyBody,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 16 * 1.5,
  } as TextStyle,
  small: {
    fontFamily: fontFamilyBody,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 14 * 1.5,
  } as TextStyle,
} as const;
