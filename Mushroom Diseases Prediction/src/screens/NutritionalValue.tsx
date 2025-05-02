import React from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

// Constants
import {COLORS} from '../constants';
import {BASE_URL, BG_IMG, NUTRITIONAL_DATA} from '../data/constants';
import {Card} from '../components/Card';

type NutritionValueProps = NativeStackScreenProps<
  RootStackParamList,
  'NutritionalValue'
>;

const NutritionalValue = ({navigation, route}: NutritionValueProps) => {
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={NUTRITIONAL_DATA}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Pressable
              onPress={() => navigation.navigate('NutritionDetails', item)}>
              <Card name={item.name} id={item.id} imageUrl={item.imageUrl} />
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};

export default NutritionalValue;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingVertical: 15,
  },
});
