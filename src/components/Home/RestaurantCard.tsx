import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  ScrollView,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {
  addClaim,
  updateSpots,
} from '../../store/redux-toolkit/reducers/claimSlice';
import {RootState} from '../../store/redux-toolkit/store';

const {width, height} = Dimensions.get('window');
const isTablet = width > 768;

type RootStackParamList = {
  Claims: {showToast?: boolean};
};

const RestaurantCard = () => {
  const flatListRef = useRef<FlatList<any> | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null,
  );
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  const [selectedTimes, setSelectedTimes] = useState({});
  const [spotsCount, setSpotsCount] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const restaurantSpots = useSelector(
    (state: RootState) => state.claims.restaurantSpots,
  );

  // State to trigger re-render when restaurantSpots changes
  const [restaurants, setRestaurants] = useState([
    {
      name: "Joe's Stone Crab",
      offer: '15% off stone crab claws',
      category: 'American',
      times: [
        {
          time: '5:00 PM',
          spots: restaurantSpots["Joe's Stone Crab"]?.['5:00 PM'] || 5,
        },
        {
          time: '6:00 PM',
          spots: restaurantSpots["Joe's Stone Crab"]?.['6:00 PM'] || 3,
        },
        {
          time: '7:00 PM',
          spots: restaurantSpots["Joe's Stone Crab"]?.['7:00 PM'] || 2,
        },
        {
          time: '8:00 PM',
          spots: restaurantSpots["Joe's Stone Crab"]?.['8:00 PM'] || 4,
        },
      ],
      profileImage:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      ],
      isCarousel: true,
    },
    {
      name: 'Jaguar Sun',
      offer: 'Half-priced signature cocktails',
      category: 'French',
      times: [
        {
          time: '5:00 PM',
          spots: restaurantSpots['Jaguar Sun']?.['5:00 PM'] || 4,
        },
        {
          time: '6:00 PM',
          spots: restaurantSpots['Jaguar Sun']?.['6:00 PM'] || 3,
        },
        {
          time: '7:00 PM',
          spots: restaurantSpots['Jaguar Sun']?.['7:00 PM'] || 2,
        },
        {
          time: '8:00 PM',
          spots: restaurantSpots['Jaguar Sun']?.['8:00 PM'] || 4,
        },
      ],
      profileImage:
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      image:
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      isCarousel: false,
    },
    {
      name: 'LPM Restaurant',
      offer: 'Prix fixe menu special',
      category: 'Italian',
      times: [
        {
          time: '5:00 PM',
          spots: restaurantSpots['LPM Restaurant']?.['5:00 PM'] || 5,
        },
        {
          time: '6:00 PM',
          spots: restaurantSpots['LPM Restaurant']?.['6:00 PM'] || 3,
        },
        {
          time: '7:00 PM',
          spots: restaurantSpots['LPM Restaurant']?.['7:00 PM'] || 2,
        },
        {
          time: '8:00 PM',
          spots: restaurantSpots['LPM Restaurant']?.['8:00 PM'] || 4,
        },
      ],
      profileImage:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      isCarousel: false,
    },
    {
      name: 'Jaguar Sun',
      offer: 'Half-priced signature cocktails',
      category: 'French',
      times: [
        {
          time: '5:00 PM',
          spots: restaurantSpots['Jaguar Sun']?.['5:00 PM'] || 4,
        },
        {
          time: '6:00 PM',
          spots: restaurantSpots['Jaguar Sun']?.['6:00 PM'] || 3,
        },
        {
          time: '7:00 PM',
          spots: restaurantSpots['Jaguar Sun']?.['7:00 PM'] || 2,
        },
        {
          time: '8:00 PM',
          spots: restaurantSpots['Jaguar Sun']?.['8:00 PM'] || 4,
        },
      ],
      profileImage:
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      image:
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      isCarousel: false,
    },
  ]);

  // Sync restaurants with restaurantSpots whenever it changes
  useEffect(() => {
    setRestaurants(prevRestaurants =>
      prevRestaurants.map(restaurant => ({
        ...restaurant,
        times: restaurant.times.map(slot => ({
          ...slot,
          spots: restaurantSpots[restaurant.name]?.[slot.time] ?? slot.spots,
        })),
      })),
    );
  }, [restaurantSpots]);

  // Auto-scroll for carousel
  useEffect(() => {
    let index = 0;
    if (expandedCardIndex !== 0) {
      const timer = setInterval(() => {
        if (
          flatListRef.current &&
          restaurants[0].images &&
          restaurants[0].images.length > 0
        ) {
          index = (index + 1) % restaurants[0].images.length;
          try {
            flatListRef.current.scrollToIndex({index, animated: true});
          } catch (error) {
            console.log('Error scrolling to index:', error);
            // Reset index if scroll fails (e.g., invalid index)
            index = 0;
          }
        }
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [expandedCardIndex]);

  useEffect(() => {
    if (expandedCardIndex !== null && scrollViewRef.current) {
      const yPosition = cardPositions[expandedCardIndex] || 0;
      scrollViewRef.current.scrollTo({
        y: yPosition,
        animated: true,
      });
    }
  }, [expandedCardIndex, cardPositions]);

  const onCardLayout = (index: number, event: LayoutChangeEvent) => {
    const {y} = event.nativeEvent.layout;
    setCardPositions(prev => {
      const newPositions = [...prev];
      newPositions[index] = y;
      return newPositions;
    });
  };

  const handleTimeSlotPress = (
    restaurant:
      | {
          name: string;
          offer: string;
          times: {time: string; spots: number}[];
          profileImage: string;
          images: string[];
          isCarousel: boolean;
          image?: undefined;
        }
      | {
          name: string;
          offer: string;
          times: {time: string; spots: number}[];
          profileImage: string;
          image: string;
          isCarousel: boolean;
          images?: undefined;
        },
    time: string,
    restaurantIndex: React.SetStateAction<number | null>,
  ) => {
    setSelectedTimes(prev => ({
      ...prev,
      [String(restaurantIndex)]: time,
    }));
    setExpandedCardIndex(restaurantIndex);
    setSpotsCount(1);
  };

  const RenderSelectedTimeCard = (
    time:
      | string
      | number
      | bigint
      | boolean
      | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | Promise<
          | string
          | number
          | bigint
          | boolean
          | React.ReactPortal
          | React.ReactElement<
              unknown,
              string | React.JSXElementConstructor<any>
            >
          | Iterable<React.ReactNode>
          | null
          | undefined
        >
      | null
      | undefined,
    restaurant: any,
    restaurantIndex: number,
    toggleExpansion: () => void,
  ) => {
    const handleIncrement = () => {
      if (spotsCount < 4) {
        setSpotsCount(prev => prev + 1);
      }
    };

    const currentSpots =
      restaurantSpots[restaurant.name]?.[time as string] || 0;
    if (currentSpots <= 0) {
      console.log('No spots available for claim');
      return; // Prevent claim if no spots are available
    }

    const handleDecrement = () => {
      if (spotsCount > 1) setSpotsCount(prev => prev - 1);
    };

    const handleClaim = () => {
      const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });

      // Get the current spots from Redux
      const currentSpots =
        restaurantSpots[restaurant.name]?.[time as string] || 0;
      if (currentSpots <= 0) {
        console.log('No spots available for claim');
        return; // Prevent claim if no spots are available
      }

      const newSpots = Math.max(currentSpots - 1, 0); // Deduct 1 spot per claim

      // Dispatch the claim with spotsCount as the party size
      dispatch(
        addClaim({
          id: `${Date.now()}`,
          restaurant_name: restaurant.name,
          location: '123 Main St, Miami, FL',
          time: typeof time === 'string' ? time : String(time ?? ''),
          slot: spotsCount, // Party size (1 to 4)
          current_date: currentDate,
          profileImage: restaurant.profileImage,
        }),
      );

      // Update the available spots in the Redux store
      console.log(
        'Claiming:',
        restaurant.name,
        time,
        'Old spots:',
        currentSpots,
        'New spots:',
        newSpots,
        'Party size:',
        spotsCount,
      );
      dispatch(
        updateSpots({
          restaurantName: restaurant.name,
          time: typeof time === 'string' ? time : String(time ?? ''),
          spots: newSpots,
        }),
      );

      // Reset UI state
      setSpotsCount(1);
      setSelectedTimes(prev => ({
        ...prev,
        [restaurantIndex]: null,
      }));
      toggleExpansion();
      setExpandedCardIndex(null);
      setTimeout(() => {
        navigation.navigate({name: 'Claims', params: {showToast: true}});
      }, 400); // Wait for animation (300ms)
    };

    return (
      <TouchableWithoutFeedback style={styles.selectedTimeCard}>
        <View style={styles.selectedTimeCardInner}>
          <View style={styles.timeRow}>
            <View style={styles.timeLeft}>
              <MaterialIcons
                name="access-time"
                size={isTablet ? hp('1.8%') : hp('2.5%')}
                color="#000000"
              />
              <Text style={styles.timeText}>{time}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setSelectedTimes(prev => ({
                  ...prev,
                  [restaurantIndex]: null,
                }));
                toggleExpansion();
                setExpandedCardIndex(null);
              }}
              style={styles.changeButton}>
              <MaterialIcons
                name="refresh"
                size={isTablet ? hp('2%') : hp('2.5%')}
                color="#000000"
              />
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spotsRow}>
            <View style={styles.spotsLeft}>
              <TouchableOpacity
                onPress={handleDecrement}
                style={styles.incrementDecrementButton}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.spotsCountText}>{spotsCount}</Text>
              <TouchableOpacity
                onPress={handleIncrement}
                style={styles.incrementDecrementButton}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.claimButton} onPress={handleClaim}>
              <Text style={styles.claimButtonText}>Claim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderImageItem = (
    {item}: {item: any},
    restaurantIndex: number,
    isExpanded: boolean,
    toggleExpansion: () => void,
    selectedTime: string | null,
  ) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          toggleExpansion();
        }}>
        <View style={[styles.carouselItem]}>
          <ImageBackground
            source={{uri: item}}
            style={styles.image}
            resizeMode="cover">
            <View style={styles.topOverlay}>
              <View style={styles.profileContainer}>
                <Image
                  source={{uri: restaurants[restaurantIndex].profileImage}}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
                <Text style={styles.profileName}>
                  {restaurants[restaurantIndex].name}
                </Text>
              </View>
              {isExpanded ? (
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryText}>
                    {restaurants[restaurantIndex].category}
                  </Text>
                </View>
              ) : null}
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <MaterialCommunityIcons
                    name="message-arrow-right-outline"
                    size={hp('2.5%')}
                    color={'white'}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons
                    name="favorite"
                    size={hp('2.5%')}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.timeOverlay}>
              {isExpanded && selectedTime ? (
                <>
                  <View style={styles.offerContainer}>
                    <Text style={styles.offerText}>
                      {restaurants[restaurantIndex].offer}
                    </Text>
                  </View>
                  {RenderSelectedTimeCard(
                    selectedTime,
                    restaurants[restaurantIndex],
                    restaurantIndex,
                    toggleExpansion,
                  )}
                </>
              ) : (
                <>
                  {restaurants[restaurantIndex].times.map((slot, slotIndex) => (
                    <React.Fragment key={slotIndex}>
                      <View
                        style={[
                          styles.offerContainer,
                          {bottom: isExpanded ? wp('15%') : wp('14.5%')},
                        ]}>
                        <Text style={styles.offerText}>
                          {restaurants[restaurantIndex].offer}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.timeSlot,
                          slot.spots === 0 && styles.timeSlotDisabled,
                        ]}
                        disabled={slot.spots === 0}
                        onPress={() => {
                          handleTimeSlotPress(
                            restaurants[restaurantIndex],
                            slot.time,
                            restaurantIndex,
                          );
                        }}>
                        <View style={styles.timeSlotContent}>
                          <MaterialIcons
                            name="access-time"
                            size={hp('2.9%')}
                            color={slot.spots === 0 ? '#888' : '#4CAF50'}
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
                            <Text
                              style={[
                                styles.spotsText,
                                slot.spots === 0 && styles.spotsTextDisabled,
                              ]}>
                              {slot.spots} spots
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </React.Fragment>
                  ))}
                </>
              )}
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSingleImage = (imageUrl: string, restaurantIndex: number) => {
    const COLLAPSED_HEIGHT = isTablet ? hp('25%') : hp('22%');
    const EXPANDED_HEIGHT = isTablet ? hp('60%') : hp('70%');
    const animatedHeight = useSharedValue(COLLAPSED_HEIGHT);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

    const toggleExpansion = () => {
      animatedHeight.value = withSpring(
        isExpanded ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT,
        {
          damping: 0,
          stiffness: 100,
        },
      );
      setIsExpanded(!isExpanded);
      setExpandedCardIndex(isExpanded ? null : restaurantIndex);
    };

    const animatedContainerStyle = useAnimatedStyle(() => ({
      width: '98%',
      height: animatedHeight.value,
      overflow: 'hidden',
    }));

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setSelectedRestaurant(restaurants[restaurantIndex]);
          setSelectedTime(null);
          toggleExpansion();
        }}>
        <Animated.View style={[animatedContainerStyle, styles.card]}>
          <ImageBackground
            source={{uri: imageUrl}}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'space-between',
            }}
            resizeMode="cover">
            <View style={styles.topOverlay}>
              <View style={styles.profileContainer}>
                <Image
                  source={{uri: restaurants[restaurantIndex].profileImage}}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
                <Text style={styles.profileName}>
                  {restaurants[restaurantIndex].name}
                </Text>
              </View>
              {isExpanded ? (
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryText}>
                    {restaurants[restaurantIndex].category}
                  </Text>
                </View>
              ) : null}
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <MaterialCommunityIcons
                    name="message-arrow-right-outline"
                    size={hp('2.5%')}
                    color={'white'}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons
                    name="favorite"
                    size={hp('2.5%')}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.timeOverlay}>
              {isExpanded && selectedTime ? (
                <>
                  <View style={styles.offerContainer}>
                    <Text style={styles.offerText}>
                      {restaurants[restaurantIndex].offer}
                    </Text>
                  </View>
                  {RenderSelectedTimeCard(
                    selectedTime!,
                    restaurants[restaurantIndex],
                    restaurantIndex,
                    toggleExpansion,
                  )}
                </>
              ) : (
                <>
                  {restaurants[restaurantIndex].times.map((slot, slotIndex) => (
                    <React.Fragment key={slotIndex}>
                      <View
                        style={[
                          styles.offerContainer,
                          {bottom: isExpanded ? wp('15%') : wp('14.5%')},
                        ]}>
                        <Text style={styles.offerText}>
                          {restaurants[restaurantIndex].offer}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.timeSlot,
                          slot.spots === 0 && styles.timeSlotDisabled,
                        ]}
                        disabled={slot.spots === 0}
                        onPress={() => {
                          handleTimeSlotPress(
                            restaurants[restaurantIndex],
                            slot.time,
                            restaurantIndex,
                          );
                          setSelectedTime(slot.time);
                          setSelectedRestaurant(restaurants[restaurantIndex]);
                          toggleExpansion();
                        }}>
                        <View style={styles.timeSlotContent}>
                          <MaterialIcons
                            name="access-time"
                            size={hp('2%')}
                            color={slot.spots === 0 ? '#888' : '#4CAF50'}
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
                            <Text
                              style={[
                                styles.spotsText,
                                slot.spots === 0 && styles.spotsTextDisabled,
                              ]}>
                              {slot.spots} spots
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </React.Fragment>
                  ))}
                </>
              )}
            </View>
          </ImageBackground>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderCarousel = (restaurant: any, restaurantIndex: number) => {
    const COLLAPSED_HEIGHT = isTablet ? hp('25%') : hp('22%');
    const EXPANDED_HEIGHT = isTablet ? hp('60%') : hp('70%');
    const animatedHeight = useSharedValue(COLLAPSED_HEIGHT);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const toggleExpansion = () => {
      animatedHeight.value = withSpring(
        isExpanded ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT,
        {
          damping: 0,
          stiffness: 100,
        },
      );
      setIsExpanded(!isExpanded);
      setExpandedCardIndex(isExpanded ? null : restaurantIndex);
      setSelectedTime(null);
    };

    const animatedContainerStyle = useAnimatedStyle(() => ({
      width: '98%',
      height: animatedHeight.value,
      overflow: 'hidden',
    }));

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          toggleExpansion();
        }}>
        <Animated.View style={[animatedContainerStyle, styles.card]}>
          <FlatList
            ref={flatListRef}
            data={restaurant.images}
            renderItem={({item}) =>
              renderImageItem(
                {item},
                restaurantIndex,
                isExpanded,
                toggleExpansion,
                selectedTime,
              )
            }
            horizontal
            pagingEnabled
            snapToInterval={wp('100%')}
            snapToAlignment="start"
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, idx) => idx.toString()}
            initialScrollIndex={0}
            getItemLayout={(data, index) => ({
              length: wp('100%'),
              offset: wp('100%') * index,
              index,
            })}
            style={styles.carousel}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}>
      {restaurants.map((restaurant, index) => (
        <View
          key={index}
          style={[styles.card]}
          onLayout={event => onCardLayout(index, event)}>
          {restaurant.isCarousel &&
          restaurant.images &&
          restaurant.images.length > 0
            ? renderCarousel(restaurant, index)
            : renderSingleImage(restaurant.image || '', index)}
        </View>
      ))}
    </ScrollView>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollContentContainer: {},
  card: {
    marginVertical: hp('0.5%'),
    marginHorizontal: wp('1%'),
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  image: {
    width: wp('100%'),
    height: '100%',
  },
  carousel: {
    width: wp('100%'),
  },
  carouselItem: {
    width: wp('100%'),
  },
  topOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: wp('3%'),
    top: hp('2%'),
    left: wp('2%'),
    right: wp('2%'),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconButton: {
    padding: wp('1.5%'),
    marginRight: wp('2.5%'),
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp('2%'),
    flexDirection: 'row',
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
    marginTop: hp('0.5%'),
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
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
    elevation: 2,
  },
  timeSlotDisabled: {
    backgroundColor: '#E0E0E0',
    opacity: 1,
  },
  timeSlotContent: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
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
    top: hp('0.8%'),
    backgroundColor: '#4CAF50',
    paddingVertical: hp('0.5%'),
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  spotsContainerDisabled: {
    backgroundColor: '#B0B0B0',
  },
  spotsText: {
    fontSize: isTablet ? wp('4%') : wp('3.5%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
  spotsTextDisabled: {
    color: '#FFFFFF',
  },
  spotsCountText: {
    fontSize: isTablet ? wp('4%') : wp('5%'),
    color: '#000000',
    fontWeight: 'bold',
  },
  offerContainer: {
    position: 'absolute',
    bottom: hp('11%'),
    paddingHorizontal: wp('3.5%'),
  },
  offerText: {
    fontSize: isTablet ? wp('3%') : wp('3.5%'),
    color: '#FFFFFF',
    backgroundColor: '#4CAF50',
    padding: wp('1.2%'),
    bottom: hp('3%'),
    borderRadius: 20,
  },
  categoryContainer: {
    position: 'absolute',
    top: hp('4.5%'),
    left: wp('12%'),
    paddingHorizontal: wp('3.5%'),
  },
  categoryText: {
    fontSize: isTablet ? wp('3%') : wp('3.5%'),
    color: '#FFFFFF',
    backgroundColor: '#4CAF50',
    paddingHorizontal: wp('3%'),
    borderRadius: 20,
  },
  selectedTimeCard: {
    marginTop: hp('8%'),
    width: '100%',
  },
  selectedTimeCardInner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '100%',
    paddingVertical: isTablet ? hp('1%') : hp('1%'),
    paddingHorizontal: wp('3%'),
    elevation: 2,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: isTablet ? hp('0.3%') : hp('0.5%'),
  },
  timeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isTablet ? wp('1.5%') : wp('2%'),
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dedfe0',
    borderRadius: 5,
    borderWidth: 1,
    padding: isTablet ? wp('1%') : wp('1.5%'),
    gap: isTablet ? wp('0.8%') : wp('1%'),
  },
  changeText: {
    fontSize: isTablet ? wp('3%') : wp('4%'),
    color: '#000000',
    fontWeight: 'bold',
  },
  spotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: isTablet ? hp('0.3%') : hp('0.5%'),
    marginTop: isTablet ? hp('0.5%') : hp('0.5%'),
  },
  spotsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isTablet ? wp('1.5%') : wp('2%'),
  },
  incrementDecrementButton: {
    width: isTablet ? wp('6%') : wp('8%'),
    height: isTablet ? wp('6%') : wp('8%'),
    borderRadius: isTablet ? wp('3%') : wp('4%'),
    backgroundColor: '#edeef0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 1},
  },
  buttonText: {
    fontSize: isTablet ? wp('4%') : wp('5%'),
    color: '#000000',
    fontWeight: 'bold',
  },
  claimButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: isTablet ? hp('0.8%') : hp('1%'),
    paddingHorizontal: isTablet ? wp('3%') : wp('4%'),
    alignItems: 'center',
  },
  claimButtonText: {
    fontSize: isTablet ? wp('3%') : wp('4%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
