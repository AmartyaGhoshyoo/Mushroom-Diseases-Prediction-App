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

const { width, height } = Dimensions.get('window'); // Get the screen width and height

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('Camera')}>
          <Image
            source={require('./../../assets/img.png')}
            style={styles.fullImage}
          />
          <Text style={styles.sectionText}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('UploadPhoto')}>
          <Image
            source={require('./../../assets/imgupload.jpg')}
            style={styles.fullImage}
          />
          <Text style={styles.sectionText}>Image Uploader</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('VideoRecording')}>
          <Image
            source={require('./../../assets/record.jpg')}
            style={styles.fullImage}
          />
          <Text style={styles.sectionText}>Video Recording</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.section}
          onPress={() => navigation.navigate('UploadVideo')}>
          <Image
            source={require('./../../assets/videoupload.jpg')}
            style={styles.fullImage}
          />
          <Text style={styles.sectionText}>Video Uploader</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensure the ScrollView expands to fit the content
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  section: {
    width: width * 0.5, // Each section takes exactly 50% of the screen width
    height: height * 0.5, // Each section takes exactly 50% of the screen height
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderWidth: 0.5, // Add a thin border to separate sections
    borderColor: '#ddd',
  },
  fullImage: {
    width: '100%',
    height: '85%',
    resizeMode: 'cover',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;