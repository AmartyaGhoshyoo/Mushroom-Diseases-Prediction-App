import React from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

// Constants
import {COLORS} from '../constants';
import {BG_IMG, MUSHROOM_LIST} from '../data/constants';
import {Card} from '../components/Card';

type KnowMushroomsProps = NativeStackScreenProps<
  RootStackParamList,
  'KnowMushrooms'
>;

const KnowMushrooms = ({navigation, route}: KnowMushroomsProps) => {
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={MUSHROOM_LIST}
          numColumns={1}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Pressable
              onPress={() => navigation.navigate('MushroomList', item)}>
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

export default KnowMushrooms;

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
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
    color: COLORS.primary,
    paddingVertical: 5,
  },
});
