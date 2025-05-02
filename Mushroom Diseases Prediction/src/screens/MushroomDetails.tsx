import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

// Constants
import {COLORS} from '../constants';
import {BG_IMG} from '../data/constants';

type MushroomDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'MushroomDetails'
>;

const MushroomDetails = ({navigation, route}: MushroomDetailsProps) => {
  const {id, name, imageUrl, description} = route.params;

  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>{name}</Text>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default MushroomDetails;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingVertical: 15,
  },
  image: {
    width: '100%',
    height: 300,
  },
  descriptionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  description: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'justify',
  },
});
