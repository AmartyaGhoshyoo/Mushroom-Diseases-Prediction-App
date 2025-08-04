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
  StatusBar,
} from 'react-native';
import { ImageSourcePropType } from 'react-native';


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
      source={{ uri: BG_IMG }}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(47, 79, 47, 0.8)" translucent />
      
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.mainTitle}>🌿 {name}</Text>
            <View style={styles.headerDecoration}>
              <Text style={styles.leafEmoji}>🌱</Text>
              <View style={styles.decorativeLine} />
              <Text style={styles.leafEmoji}>🌱</Text>
            </View>
          </View>

          {/* Main Image */}
          <View style={styles.imageContainer}>
            <Image source={imageUri as ImageSourcePropType} style={styles.mainImage} />
          </View>

          {/* Introduction Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📖</Text>
              <Text style={styles.sectionTitle}>Introduction</Text>
            </View>
            <View style={styles.sectionContent}>
              {introduction.map((text, index) => (
                <Text key={index} style={styles.bodyText}>
                  {text}
                </Text>
              ))}
            </View>
          </View>

          {/* Required Materials Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🧰</Text>
              <Text style={styles.sectionTitle}>Materials Required</Text>
            </View>
            <View style={styles.sectionContent}>
              <FlatList
                data={requiredMaterials}
                numColumns={1}
                keyExtractor={item => item.material.toString()}
                scrollEnabled={false}
                renderItem={({item}) => (
                  <View style={styles.materialCard}>
                    <Card
                      imageUrl={item.materialUri}
                      name={item.material}
                      id={+item.material}
                      customStyles={{
                        cardImage: styles.materialImage,
                        cardText: styles.materialText,
                      }}
                    />
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.materialSeparator} />}
              />
            </View>
          </View>

          {/* Cultivation Technology Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🔬</Text>
              <Text style={styles.sectionTitle}>Cultivation Technology</Text>
            </View>
            <View style={styles.sectionContent}>
              {cultivationTech?.map((tech, index) => (
                <Pressable
                  key={index}
                  onPress={() => navigation.navigate('CultivationTech', tech)}
                  style={styles.techButton}
                >
                  <Text style={styles.techButtonText}>🍄 {tech.name}</Text>
                  <Text style={styles.techButtonArrow}>→</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Problems Section */}
          {problems && (
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>⚠️</Text>
                <Text style={styles.sectionTitle}>Possible Problems in Cultivation</Text>
              </View>
              <View style={styles.sectionContent}>
                {problems.map((problem, index) => (
                  <View key={index} style={styles.problemItem}>
                    <Text style={styles.problemBullet}>•</Text>
                    <Text style={styles.problemText}>{problem}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Flowchart Section */}
          {flowChart && (
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📊</Text>
                <Text style={styles.sectionTitle}>Production Flowchart</Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.flowchartContainer}>
                  <Flowchart
                    flowchart={flowChart}
                    heading={name.toLowerCase()}
                  />
                </View>
              </View>
            </View>
          )}

          <View style={styles.bottomSpacing} />
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(47, 79, 47, 0.4)',
  },
  safeAreaContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: {width: 0, height: 3},
    textShadowRadius: 6,
    letterSpacing: 0.5,
  },
  headerDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  leafEmoji: {
    fontSize: 16,
  },
  decorativeLine: {
    width: 50,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginHorizontal: 12,
    borderRadius: 1,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#2F4F2F',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  mainImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  sectionCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 6,
    shadowColor: '#2F4F2F',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#228B22',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(85, 107, 47, 0.3)',
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  sectionContent: {
    backgroundColor: 'rgba(248, 255, 248, 0.95)',
    padding: 16,
  },
  bodyText: {
    fontSize: 16,
    color: '#2F4F2F',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 12,
  },
  materialCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(240, 255, 240, 0.9)',
    elevation: 3,
    shadowColor: '#2F4F2F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  materialImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  materialText: {
    fontSize: 16,
    color: '#2F4F2F',
    fontWeight: '600',
    textAlign: 'center',
    padding: 12,
  },
  materialSeparator: {
    height: 12,
  },
  techButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#228B22',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#2F4F2F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  techButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    flex: 1,
  },
  techButtonArrow: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  problemItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  problemBullet: {
    fontSize: 18,
    color: '#DC3545',
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 2,
  },
  problemText: {
    fontSize: 16,
    color: '#2F4F2F',
    lineHeight: 22,
    flex: 1,
    textAlign: 'justify',
  },
  flowchartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 139, 34, 0.3)',
  },
  bottomSpacing: {
    height: 30,
  },
});