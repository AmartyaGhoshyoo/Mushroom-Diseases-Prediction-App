import React from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  Pressable,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';
// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
// Constants
import {BG_IMG, MENU_ITEMS} from '../data/constants';
import {COLORS} from '../constants';

const {width, height} = Dimensions.get('window');

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: HomeProps): JSX.Element => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="rgba(34, 68, 34, 0.8)" translucent />
    <ImageBackground
      source={{uri: BG_IMG}}
      style={styles.background}
    >
      {/* Forest green overlay */}
      <View style={styles.overlay} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>Mushroom Mentor</Text>
            <View style={styles.leafAccent}>
              <Text style={styles.leafEmoji}>🍄</Text>
            </View>
          </View>
          <Text style={styles.appSubtitle}>
  Learn and explore the world of mushrooms
          </Text>
        </View>

        {/* Menu Section */}
        <View style={styles.menuContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Discover</Text>
            <View style={styles.sectionLine} />
          </View>
          
          <View style={styles.menuGrid}>
            {MENU_ITEMS.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => navigation.push(item.route as keyof RootStackParamList)}
                style={({pressed}) => [
                  styles.menuCard,
                  pressed && styles.menuCardPressed,
                  index % 2 === 0 ? styles.cardLeft : styles.cardRight
                ]}
                android_ripple={{ 
                  color: 'rgba(72, 187, 120, 0.3)', 
                  borderless: false 
                }}
              >
                {/* Nature-inspired background pattern */}
                <View style={styles.cardPattern} />
                
                <View style={styles.menuContent}>
                  <View style={[
                    styles.menuIconContainer,
                    { backgroundColor: getIconBackground(index) }
                  ]}>
                    <Text style={styles.menuIcon}>
                      {getMenuIcon(item.title)}
                    </Text>
                  </View>
                  
                  <View style={styles.textContainer}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>
                      {getMenuDescription(item.title)}
                    </Text>
                  </View>
                </View>
                
                {/* Green accent border */}
                <View style={styles.cardAccent} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Bottom nature decoration */}
        <View style={styles.bottomDecoration}>
          <Text style={styles.bottomEmoji}>🌿</Text>
          <Text style={styles.bottomEmoji}>🍄</Text>
          <Text style={styles.bottomEmoji}>🌿</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  </>
);

// Helper functions
const getMenuIcon = (title: string): string => {
  const iconMap: {[key: string]: string} = {
    'Know your mushroom': '🍄',
    'Production Technology': '⚙️',
    'Disease Identification': '🤖',
    'Nutritional & Medicinal': '👩🏻‍⚕️🥗🍽️',
    'Government Schemes': '💚',
    'Mushroom Recipes': '👨‍🍳',
    'FAQs': '💭🤔',
    'Glossary': '🌟',

    'Contact Team': '🤳',

  };
  return iconMap[title] || '🍄';
};

const getMenuDescription = (title: string): string => {
  const descMap: {[key: string]: string} = {
    'Know your mushroom': 'Explore mushroom species',
    'Production Technology': 'Learn cultivation methods',
    'Disease Identification': 'AI-powered diagnosis',
    'Nutritional & Medicinal': 'Health benefits and uses',
    'Government Schemes': 'Support for mushroom farmers',
    'Mushroom Recipes': 'Delicious mushroom dishes',
    'FAQs': 'Common questions answered',
    'Glossary': 'Mushroom terminology',
    'Contact Team': 'Get in touch with us',

  };
  return descMap[title]
};

const getIconBackground = (index: number): string => {
  const colors = [
    'rgba(72, 187, 120, 0.2)',   // Green
    'rgba(56, 178, 172, 0.2)',   // Teal
    'rgba(104, 211, 145, 0.2)',  // Light green
    'rgba(45, 55, 72, 0.1)',     // Dark
    'rgba(132, 204, 22, 0.2)',   // Lime
    'rgba(34, 197, 94, 0.2)',    // Emerald
  ];
  return colors[index % colors.length];
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(22, 101, 52, 0.6)', // Deep forest green
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight ,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F0FDF4', // Very light green
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: {width: 0, height: 3},
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  leafAccent: {
    marginLeft: 8,
    transform: [{rotate: '15deg'}],
  },
  leafEmoji: {
    fontSize: 28,
  },
  appSubtitle: {
    fontSize: 17,
    color: 'rgba(240, 253, 244, 0.9)', // Light green tint
    textAlign: 'center',
    fontWeight: '400',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
    maxWidth: width * 0.85,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  decorativeElements: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  decorativeEmoji: {
    fontSize: 20,
    opacity: 0.8,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ECFDF5', // Very light green
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  sectionLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(72, 187, 120, 0.6)',
    marginLeft: 16,
    borderRadius: 1,
  },
  menuGrid: {
    gap: 14,
  },
  menuCard: {
    backgroundColor: 'rgba(248, 250, 252, 0.95)', // Almost white with slight tint
    borderRadius: 20,
    padding: 18,
    elevation: 6,
    shadowColor: '#166534', // Dark green shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(72, 187, 120, 0.3)',
    overflow: 'hidden',
    position: 'relative',
  },
  cardLeft: {
    marginRight: 8,
  },
  cardRight: {
    marginLeft: 8,
  },
  menuCardPressed: {
    transform: [{scale: 0.97}],
    elevation: 10,
    shadowOpacity: 0.35,
  },
  cardPattern: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(72, 187, 120, 0.08)',
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  menuIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(72, 187, 120, 0.3)',
  },
  menuIcon: {
    fontSize: 26,
  },
  textContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937', // Dark gray
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#059669', // Medium green
    fontWeight: '500',
    fontStyle: 'italic',
  },
  cardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#10B981', // Emerald green
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bottomDecoration: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    gap: 24,
  },
  bottomEmoji: {
    fontSize: 24,
    opacity: 0.7,
  },
});