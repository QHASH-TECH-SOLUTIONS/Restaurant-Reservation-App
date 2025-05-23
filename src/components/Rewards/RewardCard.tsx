import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FONTS} from '../../utils/fontFamily';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const RewardsScreen = () => {
  // State for accordion toggles
  const [expanded, setExpanded] = useState({
    restaurantStatus: false,
    availableRewards: false,
    specialGiveaways: false,
    birthdayGifts: false,
  });

  const toggleAccordion = section => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Data for FlatList
  const restaurantData = [
    {
      id: '1',
      name: 'Versailles Restaurant',
      reviews: 12,
      visits: 25,
      status: 'Foodie',
      statusColor: '#4CAF50',
    },
    {
      id: '2',
      name: 'Joe’s Stone Crab',
      reviews: 8,
      visits: 18,
      status: 'Elite',
      statusColor: '#FFD700',
    },
    {
      id: '3',
      name: 'Mandolin Aegean Bistro',
      reviews: 3,
      visits: 7,
      status: 'Regular',
      statusColor: '#000',
    },
    {
      id: '4',
      name: 'KYU',
      reviews: 2,
      visits: 3,
      status: 'New',
      statusColor: '#D3D3D3',
    },
    {
      id: '5',
      name: 'KYU',
      reviews: 2,
      visits: 3,
      status: 'New',
      statusColor: '#D3D3D3',
    },
    {
      id: '6',
      name: 'KYU',
      reviews: 2,
      visits: 3,
      status: 'New',
      statusColor: '#D3D3D3',
    },
  ];

  const renderRestaurantItem = ({item, index}: any) => (
    <View
      style={[
        styles.restaurantItem,
        index === restaurantData.length - 1 ? {} : styles.borderBottom,
      ]}>
      <View>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantDetails}>
          ★{'★'.repeat(item.reviews)}
        </Text>
        <Text style={styles.restaurantDetails}>
          {item.reviews} reviews • {item.visits} visits
        </Text>
      </View>
      <View style={[styles.statusBadge, {backgroundColor: item.statusColor}]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.visitSection}>
          <View style={styles.visitCard}>
            <View style={styles.visitCardInnerSection}>
              <Ionicons
                name="trophy-outline"
                size={24}
                color="#FFFFFF"
                style={styles.trophyIcon}
              />
              <View>
                <Text style={styles.visitNumber}>54 Visits</Text>
                <Text style={styles.visitText}>
                  7 rewards unlocked!{'\n'}community hero
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.goldButton}>
              <Text style={styles.goldButtonText}>Gold</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.donatedCard}>
            <View style={styles.cardInnerSection}>
              <MaterialCommunityIcons
                name="hand-heart"
                size={24}
                color="#FFFFFF"
                style={styles.heartIcon}
              />
              <View>
                <Text style={styles.donatedNumber}>54 Meals DONATED</Text>
                <Text style={styles.donatedText}>
                  Thank you for making a difference!{'\n'}community hero
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Hero</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Accordion Section */}
        <View style={styles.accordionSection}>
          {/* Restaurant Status */}
          <TouchableOpacity
            style={styles.accordionItem}
            onPress={() => toggleAccordion('restaurantStatus')}>
            <View style={styles.accordionHeader}>
              <Ionicons name="restaurant-outline" size={24} color="#4CAF50" />
              <Text style={styles.accordionTitle}>RESTAURANT STATUS</Text>
              <Ionicons
                name={
                  expanded.restaurantStatus ? 'chevron-down' : 'chevron-forward'
                }
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>
          {expanded.restaurantStatus && (
            <View style={styles.accordionContent}>
              <View style={styles.flatListContainer}>
                <FlatList
                  data={restaurantData}
                  renderItem={renderRestaurantItem}
                  keyExtractor={item => item.id}
                  scrollEnabled={true}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    backgroundColor: 'white',
                    // borderWidth: 1,
                  }}
                />
              </View>
            </View>
          )}

          {/* Available Rewards */}
          <TouchableOpacity
            style={styles.accordionItem}
            onPress={() => toggleAccordion('availableRewards')}>
            <View style={styles.accordionHeader}>
              <Ionicons name="star-outline" size={24} color="#4CAF50" />
              <Text style={styles.accordionTitle}>AVAILABLE REWARDS</Text>
              <Ionicons
                name={
                  expanded.availableRewards ? 'chevron-down' : 'chevron-forward'
                }
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>

          {/* Special Giveaways */}
          <TouchableOpacity
            style={styles.accordionItem}
            onPress={() => toggleAccordion('specialGiveaways')}>
            <View style={styles.accordionHeader}>
              <Ionicons name="gift-outline" size={24} color="#4CAF50" />
              <Text style={styles.accordionTitle}>SPECIAL GIVEAWAYS</Text>
              <Ionicons
                name={
                  expanded.specialGiveaways ? 'chevron-down' : 'chevron-forward'
                }
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>

          {/* Birthday Gifts */}
          <TouchableOpacity
            style={styles.accordionItem}
            onPress={() => toggleAccordion('birthdayGifts')}>
            <View style={styles.accordionHeader}>
              <Ionicons name="calendar-outline" size={24} color="#4CAF50" />
              <Text style={styles.accordionTitle}>BIRTHDAY GIFTS</Text>
              <Ionicons
                name={
                  expanded.birthdayGifts ? 'chevron-down' : 'chevron-forward'
                }
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="pricetag-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="checkmark-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="star-outline" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  visitSection: {
    paddingHorizontal: 15,
  },
  visitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
  },
  visitCardInnerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('41%'),
  },
  heartIcon: {
    backgroundColor: '#4CAF50',
    padding: wp('2%'),
    borderRadius: 20,
  },
  trophyIcon: {
    backgroundColor: '#FFFFFF33',
    padding: wp('2%'),
    borderRadius: 20,
  },
  visitNumber: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: '#FFFFFF',
  },
  visitText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FONTS.regular,
    color: '#FFFFFF',
  },
  goldButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    elevation: 4,
    paddingHorizontal: wp('3'),
  },
  goldButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },
  section: {
    paddingHorizontal: 15,
  },
  donatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2AA5451A',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
  },
  cardInnerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('62%'),
  },
  donatedNumber: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: '#2AA545',
  },
  donatedText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FONTS.regular,
    color: '#666',
  },
  heroButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingHorizontal: wp('3'),
  },
  heroButtonText: {
    fontSize: 14,
    fontFamily: FONTS.bold,
  },
  referSection: {
    width: wp('92%'),
    alignSelf: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'red',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: '#666',
    marginBottom: 10,
  },
  referStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '45%',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  shareCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 15,
  },
  shareText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  shareSubtitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  inviteButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  inviteButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  // Accordion Styles
  accordionSection: {
    marginHorizontal: 15,
    width: wp('92%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    // borderWidth: 1,
  },
  accordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f7f8fa',
  },
  accordionTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.medium,
    marginLeft: 10,
  },
  accordionContent: {
    // backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingVertical: 10,
  },
  flatListContainer: {
    maxHeight: hp('36%'),
    backgroundColor: 'white',
    elevation: 3,
    height: hp('30%'),
    borderRadius: 10,
    paddingBottom: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  restaurantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#d4d6d9',
    paddingVertical: 8,
  },
  restaurantName: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  restaurantDetails: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: '#666',
  },
  statusBadge: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: '#fff',
  },
});

export default RewardsScreen;
