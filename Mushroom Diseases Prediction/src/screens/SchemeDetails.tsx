import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../App';
import {COLORS} from '../constants';
import {ClickableLink} from '../components/ClickableLink';
import {BASE_URL, BG_IMG} from '../data/constants';

type SchemeDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'SchemeDetails'
>;

const SchemeDetails = ({route}: SchemeDetailsProps) => {
  const {name, ministry, sector, eligibility, about, benefit, link} =
    route.params;
  return (
    <ImageBackground
      source={{
        uri: BG_IMG,
      }}
      style={styles.background}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.heading2}>{name}</Text>
            <View style={styles.box}>
              <Text style={styles.subHeading}>Ministry/Department:</Text>
              <Text style={styles.bodyText}>{ministry}</Text>
              <Text style={styles.subHeading}>Sector covered:</Text>
              <Text style={styles.bodyText}>{sector}</Text>
              <Text style={styles.subHeading}>Eligibility criteria:</Text>
              <Text style={styles.bodyText}>{eligibility}</Text>
              <Text style={styles.subHeading}>About:</Text>
              {about.map((ele, index) => (
                <Text style={styles.bodyText} key={index}>
                  {ele}
                </Text>
              ))}
              <Text style={styles.subHeading}>Benefits:</Text>
              {benefit.map((ele, index) => (
                <Text style={styles.bodyText} key={index}>
                  {ele}
                </Text>
              ))}
              <Text style={styles.subHeading}>Link:</Text>
              <ClickableLink url={link} children={link} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SchemeDetails;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  safeAreaContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  box: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 4,
    width: '100%',
  },
  headingBox: {
    alignItems: 'flex-start',
    width: '100%',
    paddingBottom: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingVertical: 8,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingVertical: 8,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.info,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  bodyText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: COLORS.dark,
    paddingHorizontal: 10,
  },
});
