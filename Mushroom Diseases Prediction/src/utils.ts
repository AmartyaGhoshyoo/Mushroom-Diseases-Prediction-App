import {Alert, Linking} from 'react-native';

export const handleEmailPress = (email: string) => {
  const mailtoUrl = `mailto:${email}`;
  Linking.openURL(mailtoUrl).catch(err =>
    Alert.alert(
      'Error',
      'An error occurred while trying to open the email client.',
      err,
    ),
  );
};

export const urlToName = (url: string) => {
  return url.split('/').slice(-1)[0].split('.')[0].split('-').join(' ');
};
