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
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}

        />
        <DiseaseAndPestNavigatorStack.Screen
          name="UploadPhoto"
          component={UploadPhoto}
   options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}

        />
        <DiseaseAndPestNavigatorStack.Screen
          name="Camera"
          component={Camera}
  options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}

        />
        <DiseaseAndPestNavigatorStack.Screen
          name="UploadVideo"
          component={UploadVideo}
  options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}

        />
        <DiseaseAndPestNavigatorStack.Screen
          name="VideoRecording"
          component={VideoRecording}
  options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}

        />
        <DiseaseAndPestNavigatorStack.Screen
          name="Treatment"
          component={TreatmentScreen}
  options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}

        />
      </DiseaseAndPestNavigatorStack.Navigator>
    </NavigationContainer>
  );
}

export default DiseaseAndPestStackScreen;