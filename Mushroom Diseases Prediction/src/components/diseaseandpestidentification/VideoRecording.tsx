import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  View,
  Text,
  Modal,
  ImageBackground,
  Platform,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import { ExternalConfig } from './ExternalConfig';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { RootStackParamList } from './navigation/types'; // Import RootStackParamList
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Import NativeStackNavigationProp

const CaptureAndUploadVideo: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // Initialize navigation
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [processedVideoPath, setProcessedVideoPath] = useState<string | null>(null);
  const [detectedClasses, setDetectedClasses] = useState<string[]>([]); // Add detectedClasses state
  const [loading, setLoading] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadedFilePath, setDownloadedFilePath] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Record Video from Camera
  const handleRecordVideo = () => {
    launchCamera({ mediaType: 'video', cameraType: 'back' }, result => {
      if (result.didCancel) {
        console.log('User cancelled video recording');
      } else if (result.errorCode) {
        console.log('Camera Error:', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setRecordedVideo(asset.uri || null);
        setProcessedVideoPath(null);
        setDownloadedFilePath(null);
        setDetectedClasses([]); // Reset detected classes
        uploadAndProcessVideo(asset);
      }
    });
  };

  // Upload and Process Video
  const uploadAndProcessVideo = async (asset: any) => {
    if (!asset.uri) {
      Alert.alert('Error', 'No URI found for the recorded video.');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: asset.uri,
      type: asset.type || 'video/mp4',
      name: asset.fileName || 'recorded_video.mp4',
    } as any);

    setLoading(true);

    try {
      const response = await fetch(ExternalConfig.video_url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const processedVideoUrl = data.url;
      setProcessedVideoPath(processedVideoUrl + '?timestamp=' + new Date().getTime());
      setDetectedClasses(Array.from(new Set(data.detected_classes as string[]))); // Set detected classes
    } catch (error) {
      console.error('Error uploading the video:', error);
      Alert.alert('Error', 'Failed to upload or process the video.');
    } finally {
      setLoading(false);
    }
  };

  // Download and Save Video to Gallery
  const downloadVideoToGallery = async () => {
    if (!processedVideoPath) {
      Alert.alert('Error', 'No video available to download.');
      return;
    }

    setDownloading(true);

    const sanitizedVideoPath = processedVideoPath.split('?')[0];
    const fileName = `${new Date().getTime()}_${sanitizedVideoPath.split('/').pop()}`;
    const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;

    try {
      const result = await RNFS.downloadFile({
        fromUrl: sanitizedVideoPath,
        toFile: downloadDest,
      }).promise;

      if (result.statusCode === 200) {
        if (Platform.OS === 'android' && Number(Platform.Version) >= 30) {
          Alert.alert('Success', 'Video downloaded! Check your downloads folder.');
        } else {
          await RNFS.moveFile(downloadDest, `${RNFS.PicturesDirectoryPath}/${fileName}`);
          Alert.alert('Success', 'Video saved to gallery!');
        }
        setDownloadedFilePath(downloadDest);
      } else {
        Alert.alert('Error', 'Failed to download the video.');
      }
    } catch (error) {
      console.error('Error downloading the video:', error);
      Alert.alert('Error', 'Failed to download the video.');
    } finally {
      setDownloading(false);
    }
  };

  const closeVideoModal = () => setIsModalVisible(false);

  // Function to handle navigation to the Treatment screen
  const handleTreatmentPress = (disease: string) => {
    navigation.navigate('Treatment', { disease }); // Navigate to Treatment screen with disease parameter
  };

  return (
    <ImageBackground
      source={require('./../../assets/backgrounds.jpg')}
      style={styles.background}
      imageStyle={{ marginRight: -50 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleRecordVideo}>
          <Text style={styles.buttonText}>Record Video</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#FFFFFF" style={styles.spinner} />}

        {processedVideoPath && (
          <>
            <View style={styles.videoContainer}>
              <Video
                source={{ uri: processedVideoPath }}
                style={styles.video}
                controls
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={downloadVideoToGallery}>
              <Text style={styles.buttonText}>Download Video</Text>
            </TouchableOpacity>
          </>
        )}

        {downloading && <ActivityIndicator size="large" color="#FFFFFF" style={styles.spinner} />}

        {downloadedFilePath && (
          <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.buttonText}>View Downloaded Video</Text>
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

        <Modal visible={isModalVisible} transparent={true} onRequestClose={closeVideoModal}>
          <View style={styles.modalContainer}>
            {downloadedFilePath && (
              <Video
                source={{ uri: `file://${downloadedFilePath}` }}
                style={styles.modalVideo}
                controls
                resizeMode="contain"
              />
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeVideoModal}>
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
  videoContainer: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: { width: '100%', height: '100%' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalVideo: { width: '90%', height: '90%', borderRadius: 10 },
  button: {
    backgroundColor: '#DC143C',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  closeButton: {
    backgroundColor: '#DC143C',
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

export default CaptureAndUploadVideo;