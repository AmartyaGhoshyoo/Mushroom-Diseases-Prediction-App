import React from 'react';
import {View, FlatList, StyleSheet, ImageBackground} from 'react-native';
import FAQItem from '../components/FAQItem';
import {BASE_URL, BG_IMG, FAQ_ITEMS} from '../data/constants';

const FAQScreen: React.FC = () => {
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={FAQ_ITEMS}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <FAQItem question={item.question} answer={item.answer} />
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
});

export default FAQScreen;
