import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {handleEmailPress} from '../utils';

const ContactUsItem: React.FC<ContactUs> = ({
  name,
  designation,
  contact,
  email,
}) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <Text style={[styles.text, styles.designation]}>{designation}</Text>
    {contact && (
      <Text style={[styles.text, styles.contact]}>+91 {contact}</Text>
    )}
    <TouchableOpacity onPress={() => handleEmailPress(email)}>
      <Text style={[styles.text, styles.email]}>{email}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    fontSize: SIZES.medium,
  },
  text: {
    marginTop: 5,
    color: COLORS.dark,
    fontSize: SIZES.medium,
  },
  designation: {
    color: COLORS.dark,
    fontWeight: '500',
  },
  contact: {
    color: COLORS.primaryDark,
  },
  email: {
    color: COLORS.primary2,
  },
});

export default ContactUsItem;
