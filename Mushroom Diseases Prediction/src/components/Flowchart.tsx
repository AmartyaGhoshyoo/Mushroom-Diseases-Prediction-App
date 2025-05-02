import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants';

type FlowchartProps = {
  heading: string;
  flowchart: string[];
};

const Flowchart = ({heading, flowchart}: FlowchartProps) => {
  const len = flowchart.length - 1;
  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>Flow chart for {heading}</Text>
      {flowchart.map((el, index) => (
        <View key={index} style={styles.box}>
          <Text style={styles.text}>{el}</Text>
          {index < len && <Text style={styles.arrow}>￬</Text>}
        </View>
      ))}
    </View>
  );
};

export default Flowchart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  box: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
    width: '100%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingVertical: 6,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'normal',
    color: COLORS.info,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  text: {
    fontSize: 14,
    color: COLORS.gray,
  },
  arrow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
});
