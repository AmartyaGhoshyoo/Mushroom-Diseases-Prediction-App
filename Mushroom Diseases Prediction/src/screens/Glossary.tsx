import React from 'react';
import {View, FlatList, StyleSheet, ImageBackground} from 'react-native';
import GlossaryItem from '../components/GlossaryItem';
import {BASE_URL, BG_IMG, GLOSSARY_ITEMS} from '../data/constants';

const Glossary: React.FC = () => {
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={GLOSSARY_ITEMS}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <GlossaryItem term={item.term} explanation={item.explanation} />
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

export default Glossary;
