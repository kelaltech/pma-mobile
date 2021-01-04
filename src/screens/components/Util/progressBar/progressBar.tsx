import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

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
          {width: props.executed?.toString() + '%'},
        ]}
      />
      <View
        style={[style.plannedProgress, {left: props.planned?.toString() + '%'}]}
      />
    </View>
  );
};

export default ProgressBar;

const style = StyleSheet.create({
  container: {
    height: 26,
    width: '100%',
    backgroundColor: '#EFF1F1',
    borderColor: '#000',
    // borderWidth: 1,
    borderRadius: 15,
  },
  executedProgress: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#F59D31',
    borderRadius: 15,
  },
  plannedProgress: {
    position: 'absolute',
    width: 8,
    top: -5,
    bottom: -5,
    backgroundColor: '#0C1A59',
    borderRadius: 4,
  },
});
