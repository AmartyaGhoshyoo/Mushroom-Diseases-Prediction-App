import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {COLORS} from '../constants';
import {BG_IMG, GOVERNMENT_SCHEMES} from '../data/constants';

type GovernmentSchemesProps = NativeStackScreenProps<
  RootStackParamList,
  'GovernmentSchemes'
>;

const GovernmentSchemes = ({navigation}: GovernmentSchemesProps) => {
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Government Schemes</Text>
        <View style={styles.box}>
          {GOVERNMENT_SCHEMES.map((govScheme, index) => (
            <View style={styles.headingBox} key={index}>
              <Text style={styles.heading2}>{govScheme.title}</Text>
              {govScheme.schemes.map((scheme, index) => (
                <Pressable
                  onPress={() => navigation.navigate('SchemeDetails', scheme)}>
                  <Text style={styles.subHeading}>{scheme.name}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

export default GovernmentSchemes;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  box: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 4,
    width: '100%',
  },
  headingBox: {
    alignItems: 'flex-start',
    width: '100%',
    paddingBottom: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingVertical: 8,
  },
  heading2: {
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
});
