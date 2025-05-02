import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Pressable,
  Text,
} from 'react-native';
import {BG_IMG, RECIPE_ITEMS} from '../data/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {Card} from '../components/Card';

type RecipeScreenProps = NativeStackScreenProps<RootStackParamList, 'Recipes'>;

const RecipeScreen = ({navigation}: RecipeScreenProps) => {
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={RECIPE_ITEMS}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Pressable onPress={() => navigation.navigate('RecipeItem', item)}>
              <Card
                imageUrl={item.imageUrl}
                customStyles={{cardImage: styles.cardImage}}
                name={item.title}
                id={item.id}
              />
            </Pressable>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default RecipeScreen;
