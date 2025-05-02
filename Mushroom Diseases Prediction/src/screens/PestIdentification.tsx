import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

// Constants
import {COLORS} from '../constants';
import {MUSHROOM_DATA} from '../data/constants';

type PestIdentificationProps = NativeStackScreenProps<
  RootStackParamList,
  'PestIdentification'
>;

const PestIdentification = ({navigation, route}: PestIdentificationProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={MUSHROOM_DATA}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default PestIdentification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
