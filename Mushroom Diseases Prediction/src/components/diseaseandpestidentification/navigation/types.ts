import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    UploadPhoto: undefined;
    Camera: undefined;
    UploadVideo: undefined;
    VideoRecording: undefined;
    Treatment: { disease: string }; // Add this line
  };
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;