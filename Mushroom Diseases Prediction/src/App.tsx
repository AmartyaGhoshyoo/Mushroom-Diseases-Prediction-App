import React from 'react';
import {StatusBar} from 'react-native';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Home from './screens/Home';
import MushroomDetails from './screens/MushroomDetails';
import KnowMushrooms from './screens/KnowMushrooms';
// import PestIdentification from './screens/PestIdentification'; # Changes

// Constants
import {COLORS} from './constants';
import NutritionalValue from './screens/NutritionalValue';
import ProductionTech from './screens/ProductionTech';
import GovernmentSchemes from './screens/GovernmentSchemes';
import Recipes from './screens/Recipes';
import Glossary from './screens/Glossary';
import ContactUs from './screens/ContactUs';
import NutritionDetails from './screens/NutritionDetails';
import SchemeDetails from './screens/SchemeDetails';
import CultivationTech from './screens/CultivationTech';
import SplashScreen from './screens/SplashScreen';
import FAQScreen from './screens/FAQScreen';
import DiseaseAndPestStackScreen from './components/diseaseandpestidentification/DiseaseAndPestNavigator';
import RecipeItem from './components/RecipeItem';
import MushroomList from './screens/MushroomList';
import ProductionTechList from './screens/ProductionTechList';

export type RootStackParamList = {
  SplashScreen: undefined;
  Home: undefined;
  KnowMushrooms: undefined;
  MushroomList: MushroomList;
  MushroomDetails: Mushroom;
  CultivationTech: CultivationStep;
  ProductionTechList: ProductionTechList;
  ProductionTech: ProductionTech;
  PestIdentification: undefined;
  NutritionalValue: undefined;
  NutritionDetails: Mushroom;
  GovernmentSchemes: GovernmentScheme;
  SchemeDetails: Scheme;
  Recipes: undefined;
  RecipeItem: RecipeItems;
  FAQs: undefined;
  Glossary: undefined;
  ContactUs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightWhite} />
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
  options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}
        />
        <Stack.Screen
          name="KnowMushrooms"
          component={KnowMushrooms}
  options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}
        />
        <Stack.Screen
          name="MushroomList"
          component={MushroomList}
          options={{
            title: 'List of Mushrooms',
          }}
        />
        <Stack.Screen
          name="MushroomDetails"
          component={MushroomDetails}
          options={{
            title: 'Mushroom Details',
          }}
        />
        <Stack.Screen
          name="ProductionTechList"
          component={ProductionTechList}
  options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}
        />
        <Stack.Screen
          name="ProductionTech"
          component={ProductionTech}
  options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}
        />
        <Stack.Screen
          name="CultivationTech"
          component={CultivationTech}
          options={{
            title: 'Cultivation Tech',
          }}
        />
        <Stack.Screen
          name="PestIdentification"
          component={DiseaseAndPestStackScreen}
          options={{
            title: 'Pest Identification',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NutritionalValue"
          component={NutritionalValue}
  options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}
        />
        <Stack.Screen
          name="NutritionDetails"
          component={NutritionDetails}
  options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}
        />
        <Stack.Screen
          name="GovernmentSchemes"
          component={GovernmentSchemes}
          options={{
            title: 'Government Schemes',
          }}
        />
        <Stack.Screen
          name="SchemeDetails"
          component={SchemeDetails}
          options={{
            title: 'Schemes Details',
          }}
        />
        <Stack.Screen
          name="Recipes"
          component={Recipes}
    options={{
    headerTransparent: true,
    headerTitle: '', // Remove title
    headerBackTitleVisible: false,
    headerTintColor: 'white', // Make back button white
  }}
        />
        <Stack.Screen
          name="RecipeItem"
          component={RecipeItem}
          options={{
            title: 'Mushroom Recipes',
          }}
        />
        <Stack.Screen
          name="FAQs"
          component={FAQScreen}
          options={{
            title: 'FAQs',
          }}
        />
        <Stack.Screen
          name="Glossary"
          component={Glossary}
          options={{
            title: 'Glossary',
          }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            title: 'Contact Team',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
