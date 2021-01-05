import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../assets/styles/colors';

type ProgressProps = {
  planned?: Number;
  executed?: Number;
};

const ProgressBar = (props: ProgressProps) => {
  return (
    <View style={style.container}>
      <View
        style={[
          style.executedProgress,
          { width: props.executed?.toString() + '%' },
        ]}
      />
      <View
        style={[
          style.plannedProgress,
          { left: props.planned?.toString() + '%' },
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const style = StyleSheet.create({
  container: {
    height: 26,
    width: '100%',
    backgroundColor: colors.light2,
    borderColor: colors.dark0,
    borderRadius: 15,
  },
  executedProgress: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.secondary,
    borderRadius: 15,
  },
  plannedProgress: {
    position: 'absolute',
    width: 8,
    top: -5,
    bottom: -5,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});
