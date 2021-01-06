/* eslint-disable react-native/no-inline-styles */
import React, { PropsWithChildren } from 'react';
import {
  Pressable,
  PressableProps,
  Text,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { colors } from '../../../assets/styles/colors';
import { textStyles } from '../../../assets/styles/text-styles';

type ButtonProps = PropsWithChildren<{
  onPress?: PressableProps['onPress'];

  pressableProps?: PressableProps;
  textProps?: TextProps;
}>;

function Button({ onPress, pressableProps, textProps, children }: ButtonProps) {
  return (
    <Pressable
      {...pressableProps}
      onPress={(onPress ?? !pressableProps?.onPress) as any}
      style={[
        {
          paddingVertical: 8,
          paddingHorizontal: 24,
          borderRadius: 8,
          backgroundColor: colors.accent,
          elevation: 1,
        },
        (pressableProps?.style as ViewStyle) || {},
      ]}
      android_ripple={{
        color: colors.primary,
        ...pressableProps?.android_ripple,
      }}
    >
      <Text
        {...textProps}
        style={[
          {
            ...textStyles.h6,
            textAlign: 'center',
            color: colors.light1,
          },
          (textProps?.style as TextStyle) || {},
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export default Button;
