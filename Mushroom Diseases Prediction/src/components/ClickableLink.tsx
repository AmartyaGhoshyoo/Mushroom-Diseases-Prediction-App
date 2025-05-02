import {Linking, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants';
import {useState} from 'react';

type ClickableLinkProps = {
  url: string;
  children: any;
};

export const ClickableLink = ({url, children}: ClickableLinkProps) => {
  const handlePress = () => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.linkText]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: COLORS.primary2,
    textDecorationLine: 'underline',
    paddingHorizontal: 10,
  },
  copiedText: {
    color: COLORS.primary,
  },
});
