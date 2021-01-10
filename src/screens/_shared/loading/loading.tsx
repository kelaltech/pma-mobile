/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../../assets/styles/colors';
import { textStyles } from '../../../assets/styles/text-styles';

function Loading() {
  const [visible, setVisible] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.light1,
      }}
    >
      {!visible ? null : (
        <Text
          style={[textStyles.h6, { alignSelf: 'center', color: colors.accent }]}
        >
          Loading...
        </Text>
      )}
    </View>
  );
}

export default Loading;
