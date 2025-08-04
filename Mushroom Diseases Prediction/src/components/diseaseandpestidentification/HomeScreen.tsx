import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from './navigation/types';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>🤖Experience our AI</Text>
        <Text style={styles.headerSubtitle}>Smart mushroom identification powered by AI</Text>
      </View>

      {/* Grid Container - Now Single Column */}
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('Camera')}
          activeOpacity={0.8}>
          <View style={styles.imageContainer}>
            <Image
              source={require('./../../assets/disease/camera_image.png')}
              style={styles.fullImage}
            />
            <View style={styles.overlay} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>📸 Capture Images </Text>
            <Text style={styles.sectionSubtitle}>Capture mushrooms instantly</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('UploadPhoto')}
          activeOpacity={0.8}>
          <View style={styles.imageContainer}>
            <Image
              source={require('./../../assets/disease/upload.png')}
              style={styles.fullImage}
            />
            <View style={styles.overlay} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>🖼️ Upload Images</Text>
            <Text style={styles.sectionSubtitle}>Upload from gallery</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('VideoRecording')}
          activeOpacity={0.8}>
          <View style={styles.imageContainer}>
            <Image
              source={require('./../../assets/disease/recoding.png')}
              style={styles.fullImage}
            />
            <View style={styles.overlay} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>🎥 Record Video</Text>
            <Text style={styles.sectionSubtitle}>Video Recording</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('UploadVideo')}
          activeOpacity={0.8}>
          <View style={styles.imageContainer}>
            <Image
              source={require('./../../assets/disease/upload_video.png')}
              style={styles.fullImage}
            />
            <View style={styles.overlay} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>📹 Upload Videos</Text>
            <Text style={styles.sectionSubtitle}>Upload video files</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#0d1b0f',
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    backgroundColor: '#1a3d23',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7dd87d',
    textAlign: 'center',
    fontWeight: '500',
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  section: {
    width: width * 0.9, // Changed from 0.42 to 0.9 for single column
    height: height * 0.25,
    marginBottom: 16, // Changed from margin: 8 to marginBottom: 16
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    backgroundColor: '#1a3d23',
    borderWidth: 2,
    borderColor: '#16a34a',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(63, 255, 134, 0.7)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(26, 61, 35, 0.95)',
    borderTopWidth: 2,
    borderTopColor: '#22c55e',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#7dd87d',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default HomeScreen;