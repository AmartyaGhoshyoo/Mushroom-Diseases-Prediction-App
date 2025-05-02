import React from 'react';
import {StyleSheet, View} from 'react-native';

// Constants
import {COLORS} from '../constants';

type SeaparatorProps = {
  color?: string;
};

const Separator = ({color}: SeaparatorProps) => {
  return (
    <View
      style={[
        styles.separator,
        {backgroundColor: color || COLORS.gray2},
      ]}></View>
  );
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    height: 0.75,
    width: '100%',
    marginVertical: 1,
  },
});
