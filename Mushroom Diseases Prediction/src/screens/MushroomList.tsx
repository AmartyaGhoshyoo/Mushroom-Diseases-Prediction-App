import React from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

// Constants
import {COLORS} from '../constants';
import {BG_IMG} from '../data/constants';
import {Card} from '../components/Card';

type MushroomListProps = NativeStackScreenProps<
  RootStackParamList,
  'MushroomList'
>;

const MushroomList = ({navigation, route}: MushroomListProps) => {
  const {title, imageUrl, data, id} = route.params;
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Pressable
              onPress={() => navigation.navigate('MushroomDetails', item)}>
              <Card imageUrl={item.imageUrl} name={item.name} id={item.id} />
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};

export default MushroomList;

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: '100%',
    height: 180,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingTop: 5,
  },
});
