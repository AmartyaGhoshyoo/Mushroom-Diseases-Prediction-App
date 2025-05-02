import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

// Constants
import {COLORS, SIZES} from '../constants';
import {BG_IMG, CAU_IMG, LOGO_IMG, NITM_IMG} from '../data/constants';

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen = ({navigation}: SplashScreenProps): JSX.Element => {
  const handleExplorePress = () => {
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Image
            source={{
              uri: LOGO_IMG,
            }}
            style={styles.logo}
          />
          <Text style={styles.text}>Guide to mushroom cultivation</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleExplorePress}>
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Image source={{uri: CAU_IMG}} style={[styles.image, styles.cau]} />
            <Image source={{uri: NITM_IMG}} style={styles.image} />
          </View>
          <Text style={styles.title}>
            Developed jointly by College of PG Studies in Agricultural Sciences
            (CAU-I), Umiam, Meghalaya{'\n'} and{'\n'}
            National Institute of Technology Meghalaya
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  logo: {
    width: 200,
    height: 200,
    marginVertical: 32,
  },
  image: {
    width: 130,
    height: 130,
  },
  cau: {
    width: 175,
  },
  text: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.primary2,
  },
  green: {
    color: COLORS.primaryDark,
  },
  gray: {
    color: COLORS.gray,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: '500',
    color: COLORS.dark,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
});
