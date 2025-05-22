import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const isTablet = width > 768;

const Alerts = () => {
  const alertsData = [
    {
      id: '1',
      title: 'You’ve Been Invited!',
      timestamp: 'Just now',
      message:
        'Maria Lee has invited you to join her reservation at Mandolin Aegean Bistro on Sat. Apr 26 at 8:00 PM. Tap here to respond.',
      icon: 'notifications',
      iconColor: '#4CAF50',
      buttonText: 'Claim',
    },
    {
      id: '2',
      title: 'New Deal Available',
      timestamp: '2 minutes ago',
      message: 'Versailles just added a new 20% off dinner deal',
      icon: 'notifications',
      iconColor: '#4CAF50',
      buttonText: 'View',
    },
    {
      id: '3',
      title: 'Reservation Reminder',
      timestamp: '5 minutes ago',
      message:
        "Don't forget your reservation at Joe's Stone Crab tomorrow at 7 PM",
      icon: 'notifications',
      iconColor: '#F44336',
      buttonText: 'Dismiss',
    },
    {
      id: '4',
      title: 'Points Update',
      timestamp: '1 hour ago',
      message: 'You earned 100 points from your last visit to KYU',
      icon: 'notifications-plus',
      iconColor: '#4CAF50',
      buttonText: 'View',
    },
  ];

  const renderAlertCard = ({item}: any) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons
            name={item.icon}
            size={isTablet ? hp('2.5%') : hp('3%')}
            color={item.iconColor}
          />
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.actionButtonPrimary}>
          <Text style={styles.actionTextPrimary}>{item.buttonText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={alertsData}
      renderItem={renderAlertCard}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default Alerts;

const styles = StyleSheet.create({
  listContainer: {
    padding: wp('3%'),
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderWidth: 0.3,
    borderColor: 'red',
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('4%'),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isTablet ? wp('2%') : wp('3%'),
  },
  title: {
    fontSize: isTablet ? wp('4%') : wp('4.5%'),
    color: '#000000',
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: isTablet ? wp('3%') : wp('3.5%'),
    color: '#666666',
  },
  actionButtonPrimary: {
    backgroundColor: '#4CAF50',
    borderRadius: wp('1.5%'),
    paddingVertical: isTablet ? hp('0.8%') : hp('1%'),
    paddingHorizontal: isTablet ? wp('3%') : wp('4%'),
    alignItems: 'center',
  },
  actionTextPrimary: {
    fontSize: isTablet ? wp('3.2%') : wp('3.8%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: '#FFFFFF',
    padding: wp('4%'),
  },
  message: {
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    color: '#000000',
  },
});
