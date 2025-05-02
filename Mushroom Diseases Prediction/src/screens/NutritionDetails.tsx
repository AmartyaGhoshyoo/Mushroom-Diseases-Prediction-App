import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {COLORS, SIZES} from '../constants';
import Table from '../components/Table';
import {BASE_URL, BG_IMG} from '../data/constants';

type NutritionDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'NutritionDetails'
>;

const NutritionDetails = ({route}: NutritionDetailsProps) => {
  const {name, imageUrl, description, nutritionalValue = []} = route.params;
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.heading}>{name}</Text>
            <Image source={{uri: imageUrl}} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.subHeading}>100g of {name} contains:</Text>
            </View>
            <Table
              data={nutritionalValue}
              header={{
                name: 'Nutrient',
                value: 'Quantity',
              }}
              backgroundColor={COLORS.secondary}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NutritionDetails;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  heading: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingVertical: 15,
  },
  subHeading: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingVertical: 15,
  },
  image: {
    width: '100%',
    height: 300,
  },
  textContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
  description: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'justify',
  },
});
