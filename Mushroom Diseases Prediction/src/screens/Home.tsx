import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

// Constants
import {BG_IMG, MENU_ITEMS} from '../data/constants';
import {COLORS} from '../constants';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: HomeProps): JSX.Element => (
  <ImageBackground
    source={{
      uri: BG_IMG,
    }}
    style={styles.background}>
    <View style={styles.container}>
      {MENU_ITEMS.map(item => (
        <View key={item.id} style={styles.menu}>
          <Text
            onPress={() =>
              navigation.push(item.route as keyof RootStackParamList)
            }
            style={styles.menuText}>
            {item.title}
          </Text>
        </View>
      ))}
    </View>
  </ImageBackground>
);

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  menu: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 24,
    color: COLORS.lightWhite,
    fontWeight: '500',
  },
});
