import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {COLORS} from '../constants';
import {BG_IMG, OYSTER_PRODUCTION_TECH} from '../data/constants';
import Flowchart from '../components/Flowchart';
import {Card} from '../components/Card';

type ProductionTechProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductionTech'
>;

const ProductionTech = ({navigation, route}: ProductionTechProps) => {
  const {
    name,
    introduction,
    imageUri,
    requiredMaterials,
    cultivationTech,
    problems,
    flowChart,
  } = route.params;
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.heading}>{name}</Text>
            <Image source={{uri: imageUri}} style={styles.image} />

            <View style={styles.textBox}>
              {introduction.map((el, index) => (
                <Text key={index} style={styles.text}>
                  {el}
                </Text>
              ))}
            </View>

            <View style={styles.box}>
              <Text style={styles.heading2}>Materials required</Text>
            </View>
            <FlatList
              data={requiredMaterials}
              numColumns={1}
              keyExtractor={item => item.material.toString()}
              scrollEnabled={false}
              renderItem={({item}) => (
                <Card
                  imageUrl={item.materialUri}
                  name={item.material}
                  id={+item.material}
                  customStyles={{
                    cardImage: {
                      width: '100%',
                      height: 180,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      resizeMode: 'cover',
                    },
                    cardText: {
                      fontSize: 15,
                      color: COLORS.primaryDark,
                      fontWeight: 'normal',
                    },
                  }}
                />
              )}
            />

            <View style={styles.box}>
              <Text style={styles.heading2}>Cultivation Technology</Text>
              <View style={styles.textBox}>
                {cultivationTech?.map((el, index) => (
                  <Pressable
                    key={index}
                    onPress={() => navigation.navigate('CultivationTech', el)}>
                    <Text style={styles.subHeading}>{el.name}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.box}>
              {problems && (
                <>
                  <Text style={styles.heading2}>
                    Possible problems in mushroom cultivation
                  </Text>
                  <View style={styles.textBox}>
                    {problems?.map((el, index) => (
                      <Text key={index} style={styles.text}>
                        {el}
                      </Text>
                    ))}
                  </View>
                </>
              )}
            </View>

            {flowChart && (
              <Flowchart
                flowchart={flowChart}
                heading={name.toLocaleLowerCase()}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ProductionTech;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  box: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 6,
    width: '100%',
  },
  textBox: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    width: '100%',
  },
  safeAreaContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  headingBox: {
    alignItems: 'flex-start',
    width: '100%',
    paddingBottom: 12,
    paddingHorizontal: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingVertical: 8,
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    paddingVertical: 6,
    alignItems: 'flex-start',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'normal',
    color: COLORS.info,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  image: {
    width: '100%',
    height: 200,
  },
  text: {
    textAlign: 'justify',
    paddingTop: 4,
    color: COLORS.dark,
  },
});
