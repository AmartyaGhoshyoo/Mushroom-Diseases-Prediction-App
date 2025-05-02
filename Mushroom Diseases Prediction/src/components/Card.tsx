import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

// Constants
import {COLORS} from '../constants';

type CardProps = {
  imageUrl: string;
  name: string;
  id?: number;
  customStyles?: {
    card?: {};
    cardImage?: {};
    cardText?: {};
  };
};

export const Card = ({
  imageUrl,
  name,
  id,
  customStyles,
}: CardProps): JSX.Element => {
  console.log(imageUrl);

  return (
    <View style={[styles.card, customStyles?.card]} key={id}>
      <Image
        source={{uri: imageUrl}}
        style={customStyles?.cardImage || styles.cardImage}
      />
      <Text style={customStyles?.cardText || styles.cardText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    gap: 10,
    margin: 10,
    paddingBottom: 10,
  },
  cardImage: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    fontSize: 15,
    color: COLORS.primaryDark,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
});
