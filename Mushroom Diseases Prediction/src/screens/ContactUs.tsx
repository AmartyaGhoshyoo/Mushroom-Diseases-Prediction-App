import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {BASE_URL, BG_IMG, CONTACT_ITEMS} from '../data/constants';
import ContactUsItem from '../components/ContactUsItem';
import {handleEmailPress} from '../utils';

const ContactUsScreen: React.FC = () => {
  const email = 'mentor.mushroom@gmail.com';

  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={CONTACT_ITEMS}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ContactUsItem
              name={item.name}
              contact={item.contact}
              email={item.email}
              designation={item.designation}
            />
          )}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleEmailPress(email)}>
          <Text style={styles.buttonText}>Get in touch</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.primaryDark,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.lightWhite,
    fontSize: SIZES.large,
  },
});

export default ContactUsScreen;
