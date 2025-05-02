import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({question, answer}) => (
  <View style={styles.container}>
    <Text style={styles.question}>{question}</Text>
    <Text style={styles.answer}>{answer}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  question: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    fontSize: SIZES.medium,
  },
  answer: {
    marginTop: 5,
    color: COLORS.dark,
    fontSize: SIZES.medium,
  },
});

export default FAQItem;
