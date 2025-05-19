import { Alert, Linking, Platform } from "react-native";

// Map Functionality 
export const openMap = (lat: number, lng: number, label: string = 'Location') => {
  const latLng = `${lat},${lng}`;
  let url = '';

  if (Platform.OS === 'ios') {
    // Apple Maps
    url = `http://maps.apple.com/?ll=${latLng}&q=${label}`;
  } else {
    // Android (Google Maps)
    url = `geo:0,0?q=${latLng}(${label})`;
  }

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Maps not supported on this device');
      }
    })
    .catch((err) => Alert.alert('Error', err.message));
};

// Calling Functionality
export const dialCall = (number: string): void => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {

    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }
  Linking.openURL(phoneNumber);
};
