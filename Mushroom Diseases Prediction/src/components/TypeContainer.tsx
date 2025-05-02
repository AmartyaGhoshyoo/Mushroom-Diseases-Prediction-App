import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Constants
import {COLORS} from '../constants';
import {Card} from './Card';
import {urlToName} from '../utils';

type TypeContainerProps = CultivationTech;

const TypeContainer = ({name, desc, types, imageUri}: TypeContainerProps) => {
  return (
    <View style={styles.container}>
      {name && <Text style={styles.heading}>{name}</Text>}
      {imageUri?.map(image => {
        const label = urlToName(image);
        return (
          Boolean(image) && (
            <Card
              imageUrl={image}
              name={label[0].toUpperCase() + label.slice(1)}
              id={+image}
              key={image}
              customStyles={{
                cardImage: {
                  width: 350,
                  height: 180,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
                cardText: {
                  fontSize: 15,
                  color: COLORS.info,
                  fontWeight: 'normal',
                },
              }}
            />
          )
        );
      })}
      <View style={styles.textBox}>
        {desc?.map((el, index) => (
          <Text key={index} style={styles.desc}>
            {el}
          </Text>
        ))}
      </View>
      {types?.map((el, index) => (
        <TypeContainer
          name={el.name}
          desc={el?.desc}
          types={el?.types}
          imageUri={el?.imageUri}
          key={index}
        />
      ))}
    </View>
  );
};

export default TypeContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.info,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: 300,
  },
  textBox: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    width: 375,
  },
  desc: {
    textAlign: 'justify',
    flex: 1,
    color: COLORS.dark,
  },
});
