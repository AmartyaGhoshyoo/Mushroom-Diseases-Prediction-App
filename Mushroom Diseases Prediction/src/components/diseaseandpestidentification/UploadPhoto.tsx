import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  View,
  Platform,
  Text,
  Modal,
  Image,
  ImageBackground,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { ExternalConfig } from './ExternalConfig';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { RootStackParamList } from './navigation/types'; // Import RootStackParamList
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import NativeStackNavigationProp

const UploadImage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Initialize navigation
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImagePath, setProcessedImagePath] = useState<string | null>(null);
  const [detectedClasses, setDetectedClasses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadedFilePath, setDownloadedFilePath] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleImageSelect = () => {
    launchImageLibrary({ mediaType: 'photo' }, result => {
      if (result.didCancel) {
        console.log('User cancelled image selection');
      } else if (result.errorCode) {
        console.log('Gallery Error:', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedImage(asset.uri || null);
        setProcessedImagePath(null);
        setDownloadedFilePath(null);
        setDetectedClasses([]);
        uploadAndProcessImage(asset);
      }
    });
  };

  const uploadAndProcessImage = async (asset: any) => {
    if (!asset.uri) {
      Alert.alert('Error', 'No URI found for the selected image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || 'selected_image.jpg',
    } as any);

    setLoading(true);

    try {
      console.log('Uploading selected image to server...');
      const response = await fetch(ExternalConfig.upload_url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const processedImageUrl = data.url;
      setProcessedImagePath(processedImageUrl + '?timestamp=' + new Date().getTime());
      setDetectedClasses(Array.from(new Set(data.detected_classes as string[])));
    } catch (error) {
      console.error('Error uploading the file:', error);
      Alert.alert('Error', 'Failed to upload or process the image.');
    } finally {
      setLoading(false);
    }
  };

  const downloadImageToGallery = async () => {
    if (!processedImagePath) {
      Alert.alert('Error', 'No image available to download.');
      return;
    }

    setDownloading(true);

    const sanitizedImagePath = processedImagePath.split('?')[0];
    const fileName = `${new Date().getTime()}_${sanitizedImagePath.split('/').pop()}`;
    const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    try {
      const result = await RNFS.downloadFile({
        fromUrl: sanitizedImagePath,
        toFile: downloadDest,
      }).promise;

      if (result.statusCode === 200) {
        if (Platform.OS === 'android' && Number(Platform.Version) >= 30) {
          Alert.alert('Success', 'Image downloaded! Check your downloads folder.');
        } else {
          await RNFS.moveFile(downloadDest, `${RNFS.PicturesDirectoryPath}/${fileName}`);
          Alert.alert('Success', 'Image saved to gallery!');
        }
        setDownloadedFilePath(downloadDest);
      } else {
        Alert.alert('Error', 'Failed to download the image.');
      }
    } catch (error) {
      console.error('Error downloading the image:', error);
      Alert.alert('Error', 'Failed to download the image.');
    } finally {
      setDownloading(false);
    }
  };

  const closeImageModal = () => setIsModalVisible(false);

  // Function to handle navigation to the Treatment screen
  const handleTreatmentPress = (disease: string) => {
    navigation.navigate('Treatment', { disease }); // Navigate to Treatment screen with disease parameter
  };

  return (
    <ImageBackground source={require('./../../assets/backgroundssss.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleImageSelect}>
          <Text style={styles.buttonText}>Select Image from Gallery</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#FFFFFF" style={styles.spinner} />}

        {processedImagePath && (
          <>
            <View style={styles.imageContainer}>
              <Image source={{ uri: processedImagePath }} style={styles.image} />
            </View>
            <TouchableOpacity style={styles.button} onPress={downloadImageToGallery}>
              <Text style={styles.buttonText}>Download Image</Text>
            </TouchableOpacity>
          </>
        )}

        {downloading && <ActivityIndicator size="large" color="#FFFFFF" style={styles.spinner} />}

        {downloadedFilePath && (
          <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.buttonText}>View Downloaded Image</Text>
          </TouchableOpacity>
        )}

        {detectedClasses.length > 0 && (
          <View style={styles.detectionContainer}>
            <Text style={styles.detectionTitle}>Detected Diseases:</Text>
            {detectedClasses.map((item, index) => (
              <View key={index}>
                <Text style={styles.detectionText}>
                  {index + 1}. {item}
                </Text>
                <TouchableOpacity style={styles.treatmentButton} onPress={() => handleTreatmentPress(item)}>
                  <Text style={styles.treatmentButtonText}>Treatment</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <Modal visible={isModalVisible} transparent={true} onRequestClose={closeImageModal}>
          <View style={styles.modalContainer}>
            {downloadedFilePath && (
              <Image source={{ uri: `file://${downloadedFilePath}` }} style={styles.modalImage} />
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  closeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  spinner: { marginTop: 20 },
  detectionContainer: { marginTop: 20, paddingHorizontal: 20 },
  detectionTitle: { fontWeight: 'bold', fontSize: 16, color: '#FFFFFF' },
  detectionText: { fontSize: 14, marginTop: 5, color: '#FFFFFF' },
  treatmentButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  treatmentButtonText: { color: '#FFFFFF', fontSize: 14 },
});

export default UploadImage;