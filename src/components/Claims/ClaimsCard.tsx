import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';
import { dialCall, openMap } from '../../constants/data';
const {width, height} = Dimensions.get('window');
const isTablet = width > 768;

const Claims = () => {
  const claimsData = [
    {
      id: '1',
      name: 'Restaurant Name',
      profileImage:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      date: '5/4/2025',
      time: '5:00 PM',
      people: 2,
    },
    {
      id: '2',
      name: 'Restaurant Name',
      profileImage:
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      date: '5/6/2025',
      time: '7:00 PM',
      people: 2,
    },
    {
      id: '3',
      name: 'Restaurant Name',
      profileImage:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      date: '5/6/2025',
      time: '7:00 PM',
      people: 2,
    },
    {
      id: '4',
      name: 'Restaurant Name',
      profileImage:
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      date: '5/6/2025',
      time: '7:00 PM',
      people: 2,
    },
  ];




// const openMap = (lat: number, lng: number, label: string = 'Location') => {
//   const latLng = `${lat},${lng}`;
//   let url = '';

//   if (Platform.OS === 'ios') {
//     // Apple Maps
//     url = `http://maps.apple.com/?ll=${latLng}&q=${label}`;
//   } else {
//     // Android (Google Maps)
//     url = `geo:0,0?q=${latLng}(${label})`;
//   }

//   Linking.canOpenURL(url)
//     .then((supported) => {
//       if (supported) {
//         return Linking.openURL(url);
//       } else {
//         Alert.alert('Error', 'Maps not supported on this device');
//       }
//     })
//     .catch((err) => Alert.alert('Error', err.message));
// };

  const renderClaimCard = ({item}: any) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Image
            source={{uri: item.profileImage}}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.restaurantName}>{item.name}</Text>
        </View>
        <TouchableOpacity style={styles.inviteButton}>
          <Feather
            style={{transform: [{rotate: '360deg'}]}}
            name="send"
            size={isTablet ? hp('1.8%') : hp('2.2%')}
            color="#FFFFFF"
          />
          <Text style={styles.inviteText}>Invite</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <MaterialIcons
            name="calendar-today"
            size={isTablet ? hp('1.8%') : hp('2.2%')}
            color="#4CAF50"
          />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons
            name="access-time"
            size={isTablet ? hp('1.8%') : hp('2.2%')}
            color="#4CAF50"
          />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons
            name="people"
            size={isTablet ? hp('1.8%') : hp('2.2%')}
            color="#4CAF50"
          />
          <Text style={styles.detailText}>{item.people} people</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        // onPress={() => {Linking.openURL('tel:+92 336-4749474');}}
        onPress={() => {dialCall('+92 336-4749474')}}

        style={[styles.actionButton, styles.callButton]}>
          <MaterialIcons
            name="call"
            size={isTablet ? hp('2%') : hp('2.4%')}
            color="#4CAF50"
          />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {openMap(37.7749, -122.4194)}}
        style={[styles.actionButton, styles.locationButton]}>
          <MaterialIcons
            name="location-on"
            size={isTablet ? hp('2%') : hp('2.4%')}
            color="#4CAF50"
          />
          <Text style={styles.actionText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={claimsData}
      renderItem={renderClaimCard}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default Claims;

const styles = StyleSheet.create({
  listContainer: {
    padding: wp('3%'),
  },
  card: {
    backgroundColor: '#FFFFFF', // White background for details and buttons
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: wp('1.5%'),
    shadowOffset: {width: 0, height: hp('0.5%')},
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('3%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
    backgroundColor: '#F5F5F5', // Light gray shade for header
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isTablet ? wp('2%') : wp('3%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.8%'),
  },
  profileImage: {
    width: isTablet ? wp('8%') : wp('10%'),
    height: isTablet ? wp('8%') : wp('10%'),
    borderRadius: isTablet ? wp('4%') : wp('5%'),
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  restaurantName: {
    fontSize: isTablet ? wp('3.5%') : wp('4.2%'),
    color: '#000000',
    fontWeight: 'bold',
  },
  inviteButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    borderRadius: wp('1.5%'),
    paddingVertical: isTablet ? hp('0.8%') : hp('1%'),
    paddingHorizontal: isTablet ? wp('3%') : wp('4%'),
    alignItems: 'center',
    gap: wp('1%'),
    marginHorizontal: wp('2%'),
  },
  inviteText: {
    fontSize: isTablet ? wp('3.2%') : wp('3.8%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isTablet ? wp('4%') : wp('6%'),
    marginBottom: hp('2%'),
    borderBottomWidth: wp('0.2%'),
    borderBottomColor: '#E0E0E0',
    paddingBottom: hp('2%'),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isTablet ? wp('1%') : wp('1.5%'),
  },
  detailText: {
    fontSize: isTablet ? wp('3%') : wp('3.5%'),
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isTablet ? wp('4%') : wp('6%'),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1%'),
    gap: isTablet ? wp('0.5%') : wp('1%'),
    borderWidth: wp('0.2%'),
    borderColor: '#E0E0E0',
    borderRadius: wp('1%'),
    marginBottom: hp('3%'),
  },
  callButton: {
    width: isTablet ? wp('15%') : wp('18%'),
  },
  locationButton: {
    width: isTablet ? wp('18%') : wp('22%'),
  },
  cancelButton: {
    width: isTablet ? wp('15%') : wp('18%'),
  },
  actionText: {
    fontSize: isTablet ? wp('3%') : wp('4%'),
    color: '#000000',
    fontWeight: '500',
  },
});
