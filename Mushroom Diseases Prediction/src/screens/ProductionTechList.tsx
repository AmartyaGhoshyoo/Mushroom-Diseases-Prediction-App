import React from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  Text,
} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

// Constants
import {COLORS} from '../constants';
import {BG_IMG, PRODUCTION_TECH_LIST} from '../data/constants';
import {Card} from '../components/Card';

type ProductionTechListProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductionTechList'
>;

const ProductionTechList = ({navigation, route}: ProductionTechListProps) => {
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Production Techniques</Text>
        <FlatList
          data={PRODUCTION_TECH_LIST}
          numColumns={1}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Pressable
              onPress={() => navigation.navigate('ProductionTech', item.data)}>
              <Card
                imageUrl={item.imageUrl}
                customStyles={{cardImage: styles.cardImage}}
                name={item.title}
                id={item.id}
              />
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};

export default ProductionTechList;

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingTop: 5,
  },
});
