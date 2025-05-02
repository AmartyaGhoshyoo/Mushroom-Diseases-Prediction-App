import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

interface GlossaryItemProps {
  term: string;
  explanation: string;
}

const GlossaryItem: React.FC<GlossaryItemProps> = ({term, explanation}) => (
  <View style={styles.container}>
    <Text style={styles.term}>{term}</Text>
    <Text style={styles.explanation}>{explanation}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  term: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    fontSize: SIZES.medium,
  },

  explanation: {
    marginTop: 5,
    color: COLORS.dark,
    fontSize: SIZES.medium,
  },
});

export default GlossaryItem;
