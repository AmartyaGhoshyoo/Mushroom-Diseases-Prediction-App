import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Constants
import { COLORS } from '../constants';
import { Card } from './Card';
// Import the same type used in your navigation/route params
// import { CultivationStep } from '../types'; // Adjust path as needed

// Temporary interface that matches your CultivationStep exactly
interface CultivationStep {
  name?: string;
  desc?: string[];
  types?: CultivationStep[];
  imageUri?: string | Array<string | { img: string; label: string } | undefined>;
}

type TypeContainerProps = CultivationStep;

const TypeContainer = ({ name, desc, types, imageUri }: TypeContainerProps) => {
  // Filter out undefined values to match the expected type
  const cleanImageUri = Array.isArray(imageUri) 
    ? (imageUri.filter(item => item !== undefined && item !== null) as Array<string | { img: string; label: string }>)
    : imageUri;

  return (
    <View style={styles.container}>
      {name && <Text style={styles.heading}>{name}</Text>}
      {(Array.isArray(cleanImageUri) ? cleanImageUri : [cleanImageUri]).map((imageObj, index) => {
        if (!imageObj) return null;
        
        const isWrapped = typeof imageObj === 'object' && 'img' in imageObj;
        const image = isWrapped ? imageObj.img : imageObj as string;
        const label = isWrapped ? imageObj.label : 'Image';
        
        // Generate a unique key combining image and index
        const uniqueKey = `${typeof image === 'string' ? image : 'img'}-${index}`;
        
        return (
          Boolean(image) && (
            <Card
              imageUrl={image}
              name={label.charAt(0).toUpperCase() + label.slice(1)}
              id={typeof image === 'string' && !isNaN(Number(image)) ? Number(image) : index}
              key={uniqueKey}
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
                  fontWeight: 'normal' as const,
                },
              }}
            />
          )
        );
      })}
      
      <View style={styles.textBox}>
        {desc?.map((el: string, index: number) => (
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