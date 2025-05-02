import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UploadVideo from './UploadVideo';
import Camera from './Camera';
import HomeScreen from './HomeScreen';
import UploadPhoto from './UploadPhoto';
import VideoRecording from './VideoRecording';
import TreatmentScreen from './TreatmentScreen'; // Add this line

const DiseaseAndPestNavigatorStack = createNativeStackNavigator();

function DiseaseAndPestStackScreen() {
  return (
    <NavigationContainer independent={true}>
      <DiseaseAndPestNavigatorStack.Navigator>
        <DiseaseAndPestNavigatorStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            title: 'Diseases Identification - Home',
          }}
        />
        <DiseaseAndPestNavigatorStack.Screen
          name="UploadPhoto"
          component={UploadPhoto}
          options={{
            headerShown: true,
            title: 'Diseases Identification - UploadPhoto',
          }}
        />
        <DiseaseAndPestNavigatorStack.Screen
          name="Camera"
          component={Camera}
          options={{
            headerShown: true,
            title: 'Diseases Identification - Camera',
          }}
        />
        <DiseaseAndPestNavigatorStack.Screen
          name="UploadVideo"
          component={UploadVideo}
          options={{
            headerShown: true,
            title: 'Diseases Identification - UploadVideo',
          }}
        />
        <DiseaseAndPestNavigatorStack.Screen
          name="VideoRecording"
          component={VideoRecording}
          options={{
            headerShown: true,
            title: 'Diseases Identification - Video Recording',
          }}
        />
        <DiseaseAndPestNavigatorStack.Screen
          name="Treatment"
          component={TreatmentScreen}
          options={{
            headerShown: true,
            title: 'Treatment',
          }}
        />
      </DiseaseAndPestNavigatorStack.Navigator>
    </NavigationContainer>
  );
}

export default DiseaseAndPestStackScreen;