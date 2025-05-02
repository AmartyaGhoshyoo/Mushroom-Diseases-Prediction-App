import React from 'react';
import {
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

// Constants
import {COLORS} from '../constants';
import TypeContainer from '../components/TypeContainer';
import {BG_IMG} from '../data/constants';

type CultivationTechProps = NativeStackScreenProps<
  RootStackParamList,
  'CultivationTech'
>;

const CultivationTech = ({navigation, route}: CultivationTechProps) => {
  const {name, imageUri, desc, types} = route.params;

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
          </View>

          <TypeContainer
            name={''}
            imageUri={imageUri}
            desc={desc}
            types={types}
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CultivationTech;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeAreaContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 20,
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
});
