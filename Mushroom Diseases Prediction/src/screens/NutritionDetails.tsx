import React from 'react';
import {
  Image,
  ImageBackground,
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
import {COLORS, SIZES} from '../constants';
import Table from '../components/Table';
import {BASE_URL, BG_IMG} from '../data/constants';

type NutritionDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'NutritionDetails'
>;

const NutritionDetails = ({route}: NutritionDetailsProps) => {
  const {name, imageUrl, description, nutritionalValue = []} = route.params;

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
            <Text style={styles.subtitle}>Nutritional Information</Text>
            <View style={styles.headerDecoration}>
              <Text style={styles.leafEmoji}>🌱</Text>
              <View style={styles.decorativeLine} />
              <Text style={styles.leafEmoji}>🌱</Text>
            </View>
          </View>

          {/* Main Image */}
          <View style={styles.imageContainer}>
            <Image source={imageUrl as ImageSourcePropType} style={styles.mainImage} />
            <View style={styles.imageLabel}>
              <Text style={styles.imageLabelText}>🍄 Fresh & Natural</Text>
            </View>
          </View>

          {/* Description Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📝</Text>
              <Text style={styles.sectionTitle}>About This Mushroom</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.descriptionText}>{description}</Text>
              <View style={styles.healthBadge}>
                <Text style={styles.healthBadgeText}>💚 Rich in Nutrients</Text>
              </View>
            </View>
          </View>

          {/* Nutrition Facts Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📊</Text>
              <Text style={styles.sectionTitle}>Nutrition Facts (per 100g)</Text>
            </View>
            <View style={styles.sectionContent}>
              {/* Nutrition Grid - Responsive */}
              <View style={styles.nutritionGrid}>
                {nutritionalValue.map((item, index) => (
                  <View key={index} style={styles.nutritionCard}>
                    <Text style={styles.nutrientName}>{item.name}</Text>
                    <View style={styles.nutrientValueContainer}>
                      <Text style={styles.nutrientValue}>{item.value}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Health Benefits Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🌟</Text>
              <Text style={styles.sectionTitle}>Health Benefits</Text>
            </View>
            <View style={styles.sectionContent}>
              <View style={styles.benefitsContainer}>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>💪</Text>
                  <Text style={styles.benefitText}>Rich in protein and essential amino acids</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>🛡️</Text>
                  <Text style={styles.benefitText}>Boosts immune system naturally</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>❤️</Text>
                  <Text style={styles.benefitText}>Supports heart health</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>🧠</Text>
                  <Text style={styles.benefitText}>Contains brain-healthy nutrients</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NutritionDetails;

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
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
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
    position: 'relative',
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
    height: 250,
    resizeMode: 'cover',
  },
  imageLabel: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#228B22',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  imageLabelText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
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
  descriptionText: {
    fontSize: 16,
    color: '#2F4F2F',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 16,
  },
  healthBadge: {
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  healthBadgeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  nutritionCard: {
    width: '48%',
    minWidth: 140, // Minimum width to prevent cards getting too small
    backgroundColor: 'rgba(240, 255, 240, 0.9)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 139, 34, 0.3)',
  },
  nutrientName: {
    fontSize: 13,
    color: '#2F4F2F',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    flexWrap: 'wrap', // Allow text to wrap if too long
    minHeight: 32, // Consistent height for nutrient names
  },
  nutrientValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  nutrientValue: {
    fontSize: 16,
    color: '#228B22',
    fontWeight: 'bold',
    textAlign: 'center',
    flexShrink: 1, // Allow text to shrink if needed
  },
  nutrientUnit: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  tableContainer: {
    backgroundColor: '#F8FFF8',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 139, 34, 0.3)',
  },
  benefitsContainer: {
    paddingVertical: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(240, 255, 240, 0.5)',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#2F4F2F',
    flex: 1,
    lineHeight: 22,
  },
  bottomSpacing: {
    height: 30,
  },
});