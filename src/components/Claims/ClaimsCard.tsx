import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Linking,
  Platform,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {RootState} from '../../store/redux-toolkit/store';
import {
  cancelClaim,
  updateSpots,
} from '../../store/redux-toolkit/reducers/claimSlice';
import {FONTS} from '../../utils/fontFamily';

const {width, height} = Dimensions.get('window');
const isTablet = width > 768;

type ClaimsRouteParams = {
  showToast?: boolean;
};

const Claims = () => {
  const claimsData = useSelector((state: RootState) => state.claims.claims);
  const restaurantSpots = useSelector(
    (state: RootState) => state.claims.restaurantSpots,
  );
  const dispatch = useDispatch();
  const lastClaimIdRef = useRef<string | null>(null);
  const prevClaimsLengthRef = useRef<number>(0);
  const route =
    useRoute<RouteProp<Record<string, ClaimsRouteParams>, string>>();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);

  // Log claimsData changes
  useEffect(() => {
    console.log('Updated claimsData:', claimsData);
  }, [claimsData]);

  useEffect(() => {
    if (route.params?.showToast) {
      Toast.show({
        type: 'success',
        text1: 'Reservation Claimed!',
        text2: 'Your reservation has been successfully confirmed!',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    }

    if (
      claimsData.length > 0 &&
      claimsData.length > prevClaimsLengthRef.current
    ) {
      const latestClaim = claimsData[claimsData.length - 1];
      if (latestClaim.id !== lastClaimIdRef.current) {
        Toast.show({
          type: 'success',
          text1: 'Reservation Claimed!',
          text2: `Reservation for ${latestClaim.slot} people at ${latestClaim.time} has been confirmed!`,
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
        lastClaimIdRef.current = latestClaim.id;
      }
    }

    prevClaimsLengthRef.current = claimsData.length;
  }, [claimsData, route.params?.showToast]);

  const handleCancelPress = (claimId: string) => {
    setSelectedClaimId(claimId);
    setModalVisible(true);
  };

  const confirmCancel = () => {
    if (selectedClaimId) {
      const claimToCancel = claimsData.find(
        item => item.id === selectedClaimId,
      );
      console.log('Canceling claim with id:', selectedClaimId);
      console.log('Claims before cancellation:', claimsData);
      if (claimToCancel) {
        // Increment the available spots for the restaurant and time
        const currentSpots =
          restaurantSpots[claimToCancel.restaurant_name]?.[
            claimToCancel.time
          ] || 0;
        const newSpots = currentSpots + 1; // Increment by 1 since each claim deducts 1 spot
        dispatch(
          updateSpots({
            restaurantName: claimToCancel.restaurant_name,
            time: claimToCancel.time,
            spots: newSpots,
          }),
        );

        // Dispatch the cancel action
        dispatch(cancelClaim({id: selectedClaimId}));

        // Show toast notification
        Toast.show({
          type: 'success',
          text1: 'Reservation Canceled!',
          text2: `Your reservation at ${claimToCancel.restaurant_name} for ${claimToCancel.current_date} at ${claimToCancel.time} has been canceled.`,
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
      setModalVisible(false);
      setSelectedClaimId(null);
    }
  };

  const dismissModal = () => {
    setModalVisible(false);
    setSelectedClaimId(null);
  };

  const renderClaimCard = ({item}: {item: any}) => {
    const handleLocationPress = async () => {
      if (
        !item.location ||
        typeof item.location !== 'string' ||
        item.location.trim() === ''
      ) {
        console.log('Invalid location:', item.location);
        Alert.alert('Error', 'No valid location data available.');
        return;
      }

      const encodedLocation = encodeURIComponent(item.location);
      const url = `https://maps.google.com/?q=${encodedLocation}`;

      try {
        await Linking.openURL(url);
        console.log('Successfully opened map URL');
      } catch (error) {
        console.error('Error opening map:', error);
        Alert.alert(
          'Error',
          'Unable to open map. Please ensure a browser or map application is installed.',
        );
      }
    };

    const handleCallPress = (number: string) => {
      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
      } else {
        phoneNumber = `telprompt:${number}`;
      }
      Linking.openURL(phoneNumber).catch(err =>
        console.error('Error opening phone dialer:', err),
      );
    };

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <Image
              source={{uri: item.profileImage}}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <Text style={styles.restaurantName}>{item.restaurant_name}</Text>
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
            <Text style={styles.detailText}>{item.current_date}</Text>
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
            <Text style={styles.detailText}>{item.slot} people</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleCallPress('+923364749474')}
            style={[styles.actionButton, styles.callButton]}>
            <MaterialIcons
              name="call"
              size={isTablet ? hp('2%') : hp('2.4%')}
              color="#4CAF50"
            />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.locationButton]}
            onPress={handleLocationPress}>
            <MaterialIcons
              name="location-on"
              size={isTablet ? hp('2%') : hp('2.4%')}
              color="#4CAF50"
            />
            <Text style={styles.actionText}>Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCancelPress(item.id)}
            style={[styles.actionButton, styles.cancelButton]}>
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={claimsData}
        renderItem={renderClaimCard}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyCard}>
              <Octicons
                name="verified"
                size={isTablet ? wp('10%') : wp('12%')}
                color="#666666"
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyTitle}>No reservations yet</Text>
              <Text style={styles.emptySubtitle}>
                When you claim restaurant reservation,{'\n'}
                they will appear here for easy access
              </Text>
              <TouchableOpacity
                style={styles.discoverContainer}
                onPress={() => navigation.navigate('Deals')}>
                <Ionicons
                  name="trophy-outline"
                  size={isTablet ? wp('3%') : wp('5%')}
                  color="#4CAF50"
                  style={styles.trophyIcon}
                />
                <Text style={styles.discoverText}>Discover Restaurants</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={dismissModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Cancel Reservation</Text>
            {selectedClaimId &&
              claimsData.find(item => item.id === selectedClaimId) && (
                <Text style={styles.modalMessage}>
                  Are you sure you want to cancel your reservation at{' '}
                  {
                    claimsData.find(item => item.id === selectedClaimId)
                      ?.restaurant_name
                  }{' '}
                  for{' '}
                  {
                    claimsData.find(item => item.id === selectedClaimId)
                      ?.current_date
                  }{' '}
                  at{' '}
                  {claimsData.find(item => item.id === selectedClaimId)?.time}?
                  This action cannot be undone.
                </Text>
              )}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalConfirmButton]}
                onPress={confirmCancel}>
                <Text style={styles.cancelButtonText}>Yes, Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={dismissModal}>
                <Text style={styles.keepButtonText}>Keep Reservation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Claims;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('3%'),
    gap: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
    elevation: 5,
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
    backgroundColor: '#F5F5F5',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp('2%'),
    paddingVertical: wp('10%'),
    borderWidth: 0.1,
    alignItems: 'center',
    width: isTablet ? wp('70%') : wp('90%'),
    justifyContent: 'space-between',
  },
  emptyIcon: {
    marginBottom: hp('2%'),
    backgroundColor: '#F8FAFB',
    padding: 20,
    borderRadius: 50,
  },
  emptyTitle: {
    fontSize: isTablet ? wp('4.5%') : wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    fontFamily: FONTS.bold,
  },
  emptySubtitle: {
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    color: '#666666',
    textAlign: 'center',
    lineHeight: hp('3%'),
    fontFamily: FONTS.medium,
  },
  discoverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
    width: wp('46'),
    // paddingHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
  discoverText: {
    color: '#4CAF50',
    fontSize: 15,
    fontFamily: FONTS.medium,
  },
  trophyIcon: {},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: wp('5%'),
    width: isTablet ? wp('80%') : wp('100%'),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: isTablet ? wp('4.5%') : wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#000000',
    fontFamily: FONTS.bold,
  },
  modalMessage: {
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    color: '#333333',
    textAlign: 'center',
    marginBottom: hp('3%'),
    fontFamily: FONTS.regular,
  },
  modalButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalButton: {
    width: '95%',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  modalCancelButton: {
    backgroundColor: '#E0E0E0',
  },
  modalConfirmButton: {
    backgroundColor: '#EF4444',
  },
  cancelButtonText: {
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
  keepButtonText: {
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    color: '#000000',
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
});
