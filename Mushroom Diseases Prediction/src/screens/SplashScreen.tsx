import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
// Constants
import { COLORS, SIZES } from '../constants';
import { BG_IMG, CAU_IMG, LOGO_IMG, NITM_IMG } from '../data/constants';

const { width, height } = Dimensions.get('window');

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen = ({ navigation }: SplashScreenProps): JSX.Element => {
  // Animation values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const bottomContainerOpacity = useRef(new Animated.Value(0)).current;
  const bottomContainerTranslateY = useRef(new Animated.Value(50)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const backgroundOverlay = useRef(new Animated.Value(0.7)).current;
  
  // Floating animation for logo
  const logoFloat = useRef(new Animated.Value(0)).current;

  // Icon animations (keeping only floating and scaling, removing glow)
  const cauFloat = useRef(new Animated.Value(0)).current;
  const nitmFloat = useRef(new Animated.Value(0)).current;
  const cauScale = useRef(new Animated.Value(1)).current;
  const nitmScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Sequential animations
    const animationSequence = Animated.sequence([
      // Logo entrance
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotation, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      
      // Title entrance
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      
      // Button entrance
      Animated.parallel([
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      
      // Bottom container entrance
      Animated.parallel([
        Animated.timing(bottomContainerOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bottomContainerTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]);

    // Background overlay animation
    const overlayAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundOverlay, {
          toValue: 0.4,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundOverlay, {
          toValue: 0.7,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    );

    // Logo floating animation
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(logoFloat, {
          toValue: -10,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(logoFloat, {
          toValue: 10,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // CAU icon floating animation
    const cauFloatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cauFloat, {
          toValue: -8,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(cauFloat, {
          toValue: 8,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // NITM icon floating animation (different timing for variety)
    const nitmFloatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(nitmFloat, {
          toValue: 8,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(nitmFloat, {
          toValue: -8,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // CAU scale breathing animation
    const cauScaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cauScale, {
          toValue: 1.05,
          duration: 2200,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(cauScale, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ])
    );

    // NITM scale breathing animation
    const nitmScaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(nitmScale, {
          toValue: 1.08,
          duration: 2400,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(nitmScale, {
          toValue: 1,
          duration: 2400,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ])
    );

    // Start animations
    animationSequence.start();
    overlayAnimation.start();
    
    // Start floating animation after initial animations
    setTimeout(() => {
      floatingAnimation.start();
    }, 1500);

    // Start icon animations after bottom container appears
    setTimeout(() => {
      cauFloatingAnimation.start();
      nitmFloatingAnimation.start();
      cauScaleAnimation.start();
      nitmScaleAnimation.start();
    }, 2500);

    return () => {
      animationSequence.stop();
      overlayAnimation.stop();
      floatingAnimation.stop();
      cauFloatingAnimation.stop();
      nitmFloatingAnimation.stop();
      cauScaleAnimation.stop();
      nitmScaleAnimation.stop();
    };
  }, []);

  const handleExplorePress = () => {
    // Add button press animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Home');
    });
  };

  const logoRotationInterpolate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      {/* Animated overlay */}
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: backgroundOverlay.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(144,238,144,0)', 'rgba(144,238,144,0.4)'],
            }),
          },
        ]}
      />
      
      {/* Floating particles effect */}
      <View style={styles.particlesContainer}>
        {[...Array(8)].map((_, index) => (
          <FloatingParticle key={index} delay={index * 200} />
        ))}
      </View>

      <View style={styles.parentContainer}>
        {/* Logo and title section */}
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [
                  { scale: logoScale },
                  { rotate: logoRotationInterpolate },
                  { translateY: logoFloat },
                ],
              },
            ]}>
            <Image
              source={{
                uri: LOGO_IMG,
              }}
              style={styles.logo}
            />
            {/* Glow effect */}
            <View style={styles.logoGlow} />
          </Animated.View>
          
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslateY }],
              },
            ]}>
            <Text style={styles.text}>Guide to mushroom cultivation</Text>
            <View style={styles.titleUnderline} />
          </Animated.View>
        </View>

        {/* Explore button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonOpacity,
              transform: [{ scale: buttonScale }],
            },
          ]}>
          <TouchableOpacity style={styles.button} onPress={handleExplorePress}>
            <Text style={styles.buttonText}>Explore</Text>
            <View style={styles.buttonGlow} />
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom institutions section */}
        <Animated.View
          style={[
            styles.container,
            {
              opacity: bottomContainerOpacity,
              transform: [{ translateY: bottomContainerTranslateY }],
            },
          ]}>
          <View style={styles.rowContainer}>
            {/* CAU Image without glow effects */}
            <Animated.View
              style={[
                styles.imageContainer,
                {
                  transform: [
                    { translateY: cauFloat },
                    { scale: cauScale }
                  ],
                },
              ]}>
              <Image source={{ uri: CAU_IMG }} style={[styles.image, styles.cau]} />
            </Animated.View>

            {/* NITM Image without glow effects */}
            <Animated.View
              style={[
                styles.imageContainer,
                {
                  transform: [
                    { translateY: nitmFloat },
                    { scale: nitmScale }
                  ],
                },
              ]}>
              <Image source={{ uri: NITM_IMG }} style={styles.image} />
            </Animated.View>
          </View>
          <Text style={styles.title}>
            Developed jointly by College of PG Studies in Agricultural Sciences
            (CAU-I), Umiam, Meghalaya{'\n'} and{'\n'}
            National Institute of Technology Meghalaya
          </Text>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

// Floating particle component
const FloatingParticle = ({ delay }: { delay: number }) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(Math.random() * width)).current;
  
  // Store the initial X position
  const initialX = useRef(Math.random() * width).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration: 6000 + Math.random() * 4000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.6,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(translateX, {
            toValue: initialX + (Math.random() - 0.5) * 100,
            duration: 3000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        translateY.setValue(height);
        opacity.setValue(0);
        // Reset translateX to a new random position for next animation
        const newX = Math.random() * width;
        translateX.setValue(newX);
        animate();
      });
    };

    animate();
  }, [delay, translateY, opacity, translateX, initialX]);

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          opacity,
          transform: [{ translateY }, { translateX }],
        },
      ]}
    />
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#81C784', // Light Green particles
    borderRadius: 2,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    zIndex: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  logoContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginVertical: 32,
    zIndex: 2,
  },
  logoGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    backgroundColor: '#4CAF50', // Light Green
    borderRadius: 110,
    opacity: 0.3,
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleUnderline: {
    width: 100,
    height: 3,
    backgroundColor: '#388E3C', // Medium Green
    marginTop: 10,
    borderRadius: 2,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 130,
    height: 130,
    zIndex: 3,
  },
  cau: {
    width: 175,
  },
  text: {
    fontSize: SIZES.large || 20,
    fontWeight: '600',
    color: 'rgba(9, 105, 9, 0.8)', // White text
    textAlign: 'center',
    textShadowColor: 'rgba(144, 238, 144, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  title: {
    fontSize: SIZES.medium || 16,
    fontWeight: '500',
    color: '#2E7D32', // Dark Green
    textAlign: 'center',
    lineHeight: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    textShadowColor: 'rgba(46, 125, 50, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    position: 'relative',
  },
  button: {
    backgroundColor: '#1B5E20', // Deep Green
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    borderRadius: 25,
  },
  buttonText: {
    color: COLORS.white || '#FFFFFF',
    fontSize: SIZES.large || 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(27, 94, 32, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});