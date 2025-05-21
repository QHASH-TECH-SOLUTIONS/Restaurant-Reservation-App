import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const isTablet = width > 768;

type TimeSlot = {
  time: string;
  spots: number;
};

type Restaurant = {
  name: string;
  profileImage: string;
  times: TimeSlot[];
};

type CarouselItemProps = {
  item: string;
  restaurantIndex: number;
  restaurants: Restaurant[];
  handleTimeSlotPress: (restaurant: Restaurant, time: string) => void;
  styles: any;
  onToggleExpansion?: (index: number, expanded: boolean) => void; // Optional callback for expansion
};

const RenderImageItem: React.FC<CarouselItemProps> = ({
  item,
  restaurantIndex,
  restaurants,
  handleTimeSlotPress,
  styles,
  onToggleExpansion,
}) => {
  const flatListRef = useRef(null);

  const [isCarouselExpanded, setIsCarouselExpanded] = useState(false);

  useEffect(() => {
    let index = 0;
    if (!isCarouselExpanded && flatListRef.current) {
      const timer = setInterval(() => {
        if (restaurants[restaurantIndex]?.images?.length > 0) {
          index = (index + 1) % restaurants[restaurantIndex].images.length;
          // flatListRef.current.scrollToIndex({ index, animated: true }); // Uncomment if FlatList is passed
        }
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isCarouselExpanded, restaurantIndex, restaurants]);

  const toggleExpansion = () => {
    const newExpandedState = !isCarouselExpanded;
    setIsCarouselExpanded(newExpandedState);
    if (onToggleExpansion) {
      onToggleExpansion(restaurantIndex, newExpandedState);
    }
  };

  const restaurant = restaurants[restaurantIndex] || {
    name: 'Unknown',
    profileImage: '',
    times: [],
  };

  console.log('rest', restaurantIndex, restaurants);

  return (
    <TouchableOpacity onPress={toggleExpansion}>
      <View>
        <ImageBackground
          source={{uri: item}}
          style={styles.image}
          resizeMode="cover">
          <View style={styles.topOverlay}>
            <View style={styles.profileContainer}>
              <Image
                source={{uri: restaurant.profileImage}}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.profileName}>{restaurant.name}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons
                  name="message-arrow-right-outline"
                  size={hp('3%')}
                  color={'white'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons
                  name="favorite-border"
                  size={hp('3%')}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.timeOverlay}>
            {restaurant.times.map((slot, slotIndex) => (
              <TouchableOpacity
                key={slotIndex}
                style={[
                  styles.timeSlot,
                  slot.spots === 0 && styles.timeSlotDisabled,
                ]}
                disabled={slot.spots === 0}
                onPress={() => handleTimeSlotPress(restaurant, slot.time)}>
                <View style={styles.timeSlotContent}>
                  <MaterialIcons
                    name="access-time"
                    size={hp('2.9%')}
                    color={slot.spots === 0 ? '#4CAF50' : '#4CAF50'}
                  />
                  <Text
                    style={[
                      styles.timeText,
                      slot.spots === 0 && styles.timeTextDisabled,
                    ]}>
                    {slot.time}
                  </Text>
                  <View
                    style={[
                      styles.spotsContainer,
                      slot.spots === 0 && styles.spotsContainerDisabled,
                    ]}>
                    <Text style={styles.spotsText}>{slot.spots} spots</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default RenderImageItem;

const styles = StyleSheet.create({
  image: {
    width: wp('100%'),
    height: isTablet ? hp('25%') : hp('22%'),
  },
  topOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: hp('2%'),
    paddingHorizontal: wp('3%'),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  profileImage: {
    width: isTablet ? wp('8%') : wp('10%'),
    height: isTablet ? wp('8%') : wp('10%'),
    borderRadius: isTablet ? wp('4%') : wp('5%'),
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: isTablet ? wp('3%') : wp('3.5%'),
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: wp('1.5%'),
    marginRight: wp('2.5%'),
  },
  timeOverlay: {
    position: 'absolute',
    bottom: hp('2%'),
    flexDirection: 'row',
    paddingHorizontal: wp('3.5%'),
    gap: wp('3%'),
  },
  timeSlot: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: isTablet ? wp('15%') : wp('20%'),
    height: isTablet ? hp('7%') : hp('9%'),
  },
  timeSlotDisabled: {
    backgroundColor: '#E0E0E0',
  },
  timeSlotContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  timeText: {
    fontSize: isTablet ? wp('3%') : wp('4%'),
    color: '#000000',
    fontWeight: 'bold',
  },
  timeTextDisabled: {
    color: '#888',
  },
  spotsContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: hp('0.5%'),
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  spotsContainerDisabled: {
    backgroundColor: '#4CAF50',
  },
  spotsText: {
    fontSize: isTablet ? wp('4%') : wp('3.5%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
