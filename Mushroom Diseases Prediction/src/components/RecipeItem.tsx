import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';
import {RootStackParamList} from '../App';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BG_IMG} from '../data/constants';
import {COLORS} from '../constants';

type RecipeItemProps = NativeStackScreenProps<RootStackParamList, 'RecipeItem'>;

const RecipeItem = ({route}: RecipeItemProps) => {
  const {title, imageUrl, ingredients, steps} = route.params;

  const renderHeader = () => (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={[styles.subtitle]}>Ingredients</Text>
    </View>
  );

  const renderFooter = () => (
    <View>
      <Text style={styles.subtitle}>Steps</Text>
      <FlatList
        data={steps}
        renderItem={({item, index}: any) => (
          <View style={styles.numberedListItem}>
            <Text style={styles.number}>{index + 1}</Text>
            <Text style={styles.text}>{item}</Text>
          </View>
        )}
        keyExtractor={(item: any, index: number) => index.toString()}
      />
    </View>
  );

  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <FlatList
          style={styles.container}
          data={ingredients}
          renderItem={({item}: any) => (
            <View style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.text}>{item}</Text>
            </View>
          )}
          keyExtractor={(item: any, index: number) => index.toString()}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: COLORS.primaryDark,
  },
  ph: {
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  numberedListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 3,
  },
  bullet: {
    fontSize: 18,
    marginRight: 5,
    color: COLORS.dark,
  },
  number: {
    fontSize: 14,
    marginRight: 5,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  text: {
    fontSize: 14,
    color: COLORS.dark,
  },
});

export default RecipeItem;
