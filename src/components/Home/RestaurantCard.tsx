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
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const isTablet = width > 768;

const RestaurantCard = () => {
  const flatListRef = useRef<FlatList>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(
    null,
  );
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [spotsCount, setSpotsCount] = useState<number>(1);
  const [activeToggle, setActiveToggle] = useState('frshbites'); // 'frshbites' or 'frshdeals'
  const navigation = useNavigation();
  const restaurants = [
    {
      name: "Joe's Stone Crab",
      offer: '15% off stone crab claws',
      times: [
        {time: '5:00 PM', spots: 5},
        {time: '6:00 PM', spots: 3},
        {time: '7:00 PM', spots: 2},
        {time: '8:00 PM', spots: 4},
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
      times: [
        {time: '5:00 PM', spots: 4},
        {time: '6:00 PM', spots: 3},
        {time: '7:00 PM', spots: 0},
        {time: '8:00 PM', spots: 4},
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
      times: [
        {time: '5:00 PM', spots: 5},
        {time: '6:00 PM', spots: 3},
        {time: '7:00 PM', spots: 2},
        {time: '8:00 PM', spots: 4},
      ],
      profileImage:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      isCarousel: false,
    },
  ];

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (
        flatListRef.current &&
        restaurants[0].images &&
        restaurants[0].images.length > 0
      ) {
        index = (index + 1) % restaurants[0].images.length;
        flatListRef.current.scrollToIndex({index, animated: true});
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (expandedCardIndex !== null && scrollViewRef.current) {
      const yPosition = cardPositions[expandedCardIndex] || 0;
      scrollViewRef.current.scrollTo({
        y: yPosition,
        animated: true,
      });
    }
  }, [expandedCardIndex, cardPositions]);

  const onCardLayout = (index: number, event: any) => {
    const {y} = event.nativeEvent.layout;
    setCardPositions(prev => {
      const newPositions = [...prev];
      newPositions[index] = y;
      return newPositions;
    });
  };

  const handleTimeSlotPress = (restaurant: any, time: string) => {
    setSelectedRestaurant(restaurant);
    setSelectedTime(time);
    setSpotsCount(1);
    setModalVisible(true);
  };

  const renderImageItem = ({item}: any, restaurantIndex: number) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedRestaurant(restaurants[restaurantIndex]);
        setSelectedTime(null);
        setModalVisible(true);
      }}>
      <View style={styles.carouselItem}>
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
            {restaurants[restaurantIndex].times.map((slot, slotIndex) => (
              <TouchableOpacity
                key={slotIndex}
                style={[
                  styles.timeSlot,
                  slot.spots === 0 && styles.timeSlotDisabled,
                ]}
                disabled={slot.spots === 0}
                onPress={() =>
                  handleTimeSlotPress(restaurants[restaurantIndex], slot.time)
                }>
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

  const renderSingleImage = (imageUrl: string, restaurantIndex: number) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedRestaurant(restaurants[restaurantIndex]);
        setSelectedTime(null);
        setModalVisible(true);
      }}>
      <ImageBackground
        source={{uri: imageUrl}}
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
          {restaurants[restaurantIndex].times.map((slot, slotIndex) => (
            <TouchableOpacity
              key={slotIndex}
              style={[
                styles.timeSlot,
                slot.spots === 0 && styles.timeSlotDisabled,
              ]}
              disabled={slot.spots === 0}
              onPress={() =>
                handleTimeSlotPress(restaurants[restaurantIndex], slot.time)
              }>
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
    </TouchableOpacity>
  );

  const renderExpandedCard = () => {
    if (!selectedRestaurant) return null;

    const handleIncrement = () => {
      if (spotsCount < 4) setSpotsCount(prev => prev + 1);
    };

    const handleDecrement = () => {
      if (spotsCount > 0) setSpotsCount(prev => prev - 1);
    };

    const handleClaim = () => {
      setSpotsCount(1);
      navigation.navigate<any>('Claims');
      setModalVisible(false);
    };

    const renderSelectedTimeCard = (time: string) => (
      <View style={styles.selectedTimeCard}>
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
              onPress={() => setSelectedTime(null)}
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
      </View>
    );

    return (
      <View style={styles.modalContent}>
        <ImageBackground
          source={{
            uri: selectedRestaurant.isCarousel
              ? selectedRestaurant.images[0]
              : selectedRestaurant.image,
          }}
          style={styles.fullScreenImage}
          resizeMode="cover">
          <View style={styles.expandedTopOverlay}>
            <View style={styles.profileContainer}>
              <Image
                source={{uri: selectedRestaurant.profileImage}}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <Text style={styles.profileName}>{selectedRestaurant.name}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconButton}>
                {/* <MaterialIcons name="share" size={hp('3%')} color="#FFFFFF" /> */}
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
          <View
            style={{
              position: 'absolute',
              bottom: selectedTime
                ? isTablet
                  ? hp('14.5%')
                  : hp('13.5%')
                : isTablet
                ? hp('10%')
                : hp('9%'),
              paddingHorizontal: selectedTime ? wp('5%') : wp('3%'),
            }}>
            <Text style={styles.offerText}>{selectedRestaurant.offer}</Text>
          </View>
          {selectedTime ? (
            renderSelectedTimeCard(selectedTime)
          ) : (
            <View style={styles.fullScreenTimeOverlay}>
              {selectedRestaurant.times.map((slot: any, slotIndex: number) => (
                <TouchableOpacity
                  key={slotIndex}
                  style={[
                    styles.timeSlot,
                    slot.spots === 0 && styles.timeSlotDisabled,
                  ]}
                  disabled={slot.spots === 0}
                  onPress={() => setSelectedTime(slot.time)}>
                  <View style={styles.timeSlotContent}>
                    <MaterialIcons
                      name="access-time"
                      size={isTablet ? hp('2%') : hp('2.9%')}
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
          )}
        </ImageBackground>
      </View>
    );
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.scrollContentContainer}>
        {restaurants.map((restaurant, index) => (
          <View
            key={index}
            style={styles.card}
            onLayout={event => onCardLayout(index, event)}>
            {restaurant.isCarousel &&
            restaurant.images &&
            restaurant.images.length > 0 ? (
              <FlatList
                ref={flatListRef}
                data={restaurant.images}
                renderItem={({item}) => renderImageItem({item}, index)}
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
            ) : (
              renderSingleImage(restaurant.image || '', index)
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.upperToggleContainer}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeToggle === 'frshbites' && styles.activeToggleButton,
            ]}
            onPress={() => setActiveToggle('frshbites')}>
            <Text
              style={[
                styles.toggleText,
                {color: activeToggle === 'frshbites' ? 'white' : 'black'},
              ]}>
              frshbites
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeToggle === 'frshdeals' && styles.activeToggleButton,
            ]}
            onPress={() => setActiveToggle('frshdeals')}>
            <Text
              style={[
                styles.toggleText,
                {color: activeToggle === 'frshdeals' ? 'white' : 'black'},
              ]}>
              frshdeals
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        // backdropColor="red"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedRestaurant(null);
          setSelectedTime(null);
          setSpotsCount(1);
        }}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => {
              setModalVisible(false);
              setSelectedRestaurant(null);
              setSelectedTime(null);
              setSpotsCount(1);
            }}
          />
          {renderExpandedCard()}
        </View>
      </Modal>
    </>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  scrollContentContainer: {
    paddingBottom: hp('20%'),
  },
  card: {
    marginVertical: hp('1%'),
    marginHorizontal: wp('2%'),
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  image: {
    width: wp('100%'),
    height: isTablet ? hp('25%') : hp('22%'),
  },
  fullScreenImage: {
    width: wp('100%'),
    height: isTablet ? hp('60%') : hp('70%'),
  },
  carousel: {
    width: wp('100%'),
    height: isTablet ? hp('25%') : hp('22%'),
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
  expandedTopOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: wp('3%'),
    top: hp('2%'),
    left: wp('2%'),
    right: wp('2%'),
    zIndex: 10,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: wp('1.5%'),
    marginRight: wp('2.5%'),
  },
  profileContainer: {
    alignItems: 'center',
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
  fullScreenTimeOverlay: {
    position: 'absolute',
    bottom: hp('2%'),
    flexDirection: 'row',
    paddingHorizontal: wp('3.5%'),
    gap: wp('3%'),
    width: '100%',
  },
  offerContainer: {
    position: 'absolute',
    bottom: isTablet ? hp('10%') : hp('9%'),
    paddingHorizontal: wp('3%'),
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
    backgroundColor: '#4CAF50',
  },
  spotsText: {
    fontSize: isTablet ? wp('4%') : wp('3.5%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
  spotsCountText: {
    fontSize: isTablet ? wp('4%') : wp('5%'),
    color: '#000000',
    fontWeight: 'bold',
  },
  spotsTextDisabled: {
    color: '#888',
  },
  textContainer: {
    padding: wp('3%'),
    backgroundColor: '#FFFFFF',
  },
  offerText: {
    fontSize: isTablet ? wp('3%') : wp('3.5%'),
    color: '#FFFFFF',
    backgroundColor: '#4CAF50',
    padding: wp('1.2%'),
    bottom: hp('3%'),
    borderRadius: 20,
  },
  favoriteIcon: {
    position: 'absolute',
    top: hp('2%'),
    right: wp('2%'),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: wp('1.5%'),
  },
  modalContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: wp('96%'),
    height: isTablet ? hp('60%') : hp('80%'),
    overflow: 'hidden',
    borderRadius: 15,
  },
  selectedTimeCard: {
    position: 'absolute',
    bottom: hp('2%'),
    paddingHorizontal: wp('3.5%'),
    width: '96%',
    alignItems: 'center',
  },
  selectedTimeCardInner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '96%',
    paddingVertical: isTablet ? hp('1%') : hp('1.5%'),
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
  upperToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp('8%'),
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingVertical: hp('1.5%'),
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 50,
    width: wp('60%'), // Adjusted width to accommodate text
    height: hp('5%'),
    // alignItems: 'center',
    justifyContent: 'center',
    gap: wp('1%'),
    paddingHorizontal: wp('1%'),
    marginVertical: wp('3%'),
  },
  toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('4.7%'),
    width: wp('29%'), // Adjusted width to fit text
    borderRadius: 50,
  },
  activeToggleButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
  },
  toggleText: {
    fontSize: isTablet ? wp('3%') : wp('3.5%'),
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingVertical: hp('1.5%'),
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: -1},
  },
  bottomToggleButton: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1.5%'),
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: wp('2%'),
  },
  bottomToggleButtonActive: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1.5%'),
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    marginHorizontal: wp('2%'),
  },
  bottomToggleText: {
    fontSize: isTablet ? wp('4%') : wp('4.5%'),
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
});
