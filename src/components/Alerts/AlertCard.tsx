import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler'; // Import Swipeable
import {FONTS} from '../../utils/fontFamily';
const {width, height} = Dimensions.get('window');
const isTablet = width > 768;

const Alerts = () => {
  const [alertsData, setAlertsData] = useState([
    {
      id: 1,
      title: 'You’ve Been Invited!',
      timestamp: 'Just now',
      message:
        'Maria Lee has invited you to join her reservation at Mandolin Aegean Bistro on Sat. Apr 26 at 8:00 PM. Tap here to respond.',
      iconName: 'bell-ring-outline',
      iconColor: '#4CAF50',
      buttonText: 'Claim',
    },
    {
      id: 2,
      title: 'New Deal Available',
      timestamp: '2 minutes ago',
      message: 'Versailles just added a new 20% off dinner deal',
      iconName: 'bell-minus-outline',
      iconColor: '#4CAF50',
    },
    {
      id: 3,
      title: 'Reservation Reminder',
      timestamp: '5 minutes ago',
      message:
        "Don't forget your reservation at Joe's Stone Crab tomorrow at 7 PM",
      iconName: 'bell-ring-outline',
      iconColor: '#F44336',
    },
    {
      id: 4,
      title: 'Points Update',
      timestamp: '1 hour ago',
      message: 'You earned 100 points from your last visit to KYU',
      iconName: 'bell-plus-outline',
      iconColor: '#4CAF50',
    },
    {
      id: 5,
      title: 'Limited Time Offer',
      timestamp: '3 hour ago',
      message: 'Special weekend brunch at Zuma - 30% off for members',
      iconName: 'bell-minus-outline',
      iconColor: '#4CAF50',
    },
    {
      id: 6,
      title: 'Rewards Expiring Soom',
      timestamp: '1 day ago',
      message:
        'Your 500 points will expire in 7 days. Use them before they expire!',
      iconName: 'bell-plus-outline',
      iconColor: '#F44336',
    },
    {
      id: 7,
      title: 'New Restaurant Added',
      timestamp: '2 days ago',
      message: 'Carbone Miami is now available on your platform',
      iconName: 'bell-badge-outline',
      iconColor: '#4CAF50',
    },
    {
      id: 8,
      title: 'Happy Hour Alert',
      timestamp: '4 hours ago',
      message: 'Swan is offering 2-for-1 cocktails from 5-7 PM today',
      iconName: 'bell-minus-outline',
      iconColor: '#4CAF50',
    },
  ]);

  const renderIcon = (
    library: string,
    iconName: string,
    color: string,
    size: number,
  ) => {
    switch (library) {
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={size}
            color={color}
            style={styles.icon}
          />
        );
      default:
        return null;
    }
  };

  const renderRightActions = (item: any, swipeable: any) => {
    const handleDelete = () => {
      setAlertsData(alertsData.filter(alert => alert.id !== item.id));
    };
    // swipeable.close();

    return (
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const renderAlertCard = ({item}: any) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(item, this)
        }>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {renderIcon(
                'MaterialCommunityIcons',
                item.iconName,
                item.iconColor,
                isTablet ? wp('5%') : wp('6%'),
              )}
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            </View>
            {item.id === 1 && (
              <TouchableOpacity style={styles.actionButtonPrimary}>
                <Text style={styles.actionTextPrimary}>{item.buttonText}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.content}>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <FlatList
      data={alertsData}
      renderItem={renderAlertCard}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default Alerts;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: wp('3%'),
    backgroundColor: '#FFFFFF',
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
    borderWidth: 0.15,
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
  icon: {
    backgroundColor: 'white',
    padding: wp('2%'),
    borderRadius: 30,
    elevation: 2,
  },
  title: {
    fontSize: isTablet ? wp('4%') : wp('4%'),
    color: '#000000',
    fontFamily: FONTS.semiBold,
  },
  timestamp: {
    fontSize: isTablet ? wp('3%') : wp('3.5%'),
    fontFamily: FONTS.regular,
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
    fontFamily: FONTS.regular,
    color: '#000000',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    borderTopRightRadius: wp('2%'),
    borderBottomRightRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('30%'),
    height: '89.4%',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    fontWeight: 'bold',
  },
});
