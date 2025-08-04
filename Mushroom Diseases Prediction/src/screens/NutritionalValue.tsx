import React from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

// Constants
import {COLORS} from '../constants';
import {BASE_URL, BG_IMG, NUTRITIONAL_DATA} from '../data/constants';
import {Card} from '../components/Card';

type NutritionValueProps = NativeStackScreenProps<
  RootStackParamList,
  'NutritionalValue'
>;

const NutritionalValue = ({navigation, route}: NutritionValueProps) => {
  return (
    <ImageBackground
      source={{ uri: BG_IMG }}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(47, 79, 47, 0.8)" translucent />
      
      <View style={styles.overlay} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌿 Nutritional Value</Text>
        <Text style={styles.headerSubtitle}>
          Discover the health benefits of mushrooms
        </Text>
        <View style={styles.headerDecoration}>
          <Text style={styles.leafEmoji}>🌱</Text>
          <View style={styles.decorativeLine} />
          <Text style={styles.leafEmoji}>🌱</Text>
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          data={NUTRITIONAL_DATA}
          numColumns={1}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Pressable
              onPress={() => navigation.navigate('NutritionDetails', item)}
              style={styles.cardContainer}
            >
              <View style={styles.cardContent}>
                <Card
                  imageUrl={item.imageUrl}
                  customStyles={{cardImage: styles.cardImage}}
                  name={item.name}
                  id={item.id}
                />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <View style={styles.natureBadge}>
                    <Text style={styles.badgeText}>💚 Nutrition</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </ImageBackground>
  );
};

export default NutritionalValue;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(47, 79, 47, 0.4)',
  },
  header: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: {width: 0, height: 3},
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  headerDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  leafEmoji: {
    fontSize: 20,
  },
  decorativeLine: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginHorizontal: 15,
    borderRadius: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 30,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 8,
    shadowColor: '#2F4F2F',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  cardContent: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(34, 139, 34, 0.3)',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardTextContainer: {
    padding: 20,
    backgroundColor: 'rgba(248, 255, 248, 0.9)',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F4F2F',
    marginBottom: 12,
    textAlign: 'center',
  },
  natureBadge: {
    backgroundColor: '#228B22',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(85, 107, 47, 0.5)',
  },
  badgeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});