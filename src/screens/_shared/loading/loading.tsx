/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../../assets/styles/colors';
import { textStyles } from '../../../assets/styles/text-styles';

function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.light1,
      }}
    >
      <Text
        style={[
          textStyles.h6,
          { alignSelf: 'center', color: colors.secondary },
        ]}
      >
        Loading...
      </Text>
    </View>
  );
}

export default Loading;
