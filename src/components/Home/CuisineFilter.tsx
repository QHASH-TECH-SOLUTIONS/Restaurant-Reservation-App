import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

const {width} = Dimensions.get('window');
const isTablet = width > 768; // Detect if the device is a tablet
type RootStackParamList = {
  Search: undefined;
  // add other routes here if needed
};

const CuisineFilter = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cuisines: any[] = [
    {name: 'Italian', icon: 'pizza', library: 'MaterialCommunityIcons'},
    {name: 'Asian', icon: 'rice', library: 'MaterialCommunityIcons'},
    {name: 'Seafood', icon: 'fish', library: 'MaterialCommunityIcons'},
    {name: 'Mexican', icon: 'taco', library: 'MaterialCommunityIcons'},
    {name: 'Cafe', icon: 'coffee', library: 'MaterialCommunityIcons'},
    {name: 'American', icon: 'hamburger', library: 'MaterialCommunityIcons'},
    {name: 'International', icon: 'earth', library: 'MaterialCommunityIcons'},
  ];

  const renderIcon = (
    library: string,
    iconName: string,
    color: string,
    size: number,
  ) => {
    switch (library) {
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      case 'FontAwesome':
        return <FontAwesome name={iconName} size={size} color={color} />;
      case 'Entypo':
        return <Entypo name={iconName} size={size} color={color} />;
      case 'FontAwesome6':
        return <FontAwesome6 name={iconName} size={size} color={color} />;
      default:
        return null;
    }
  };

  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <FeatherIcon
            name="search"
            size={isTablet ? hp('2%') : hp('2.5%')}
            color="gray"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartIcon}>
          <MaterialIcons
            name="favorite"
            size={isTablet ? hp('2%') : hp('2.5%')}
            color="#4CAF50"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        {cuisines.map((cuisine, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              selectedCuisine === cuisine.name && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedCuisine(cuisine.name)}>
            {renderIcon(
              cuisine.library,
              cuisine.icon,
              selectedCuisine === cuisine.name ? '#FFFFFF' : '#4CAF50',
              isTablet ? hp('1.8%') : hp('2.2%'),
            )}
            <Text
              style={[
                styles.filterText,
                selectedCuisine === cuisine.name && styles.selectedFilterText,
              ]}>
              {cuisine.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CuisineFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('0.5%'),
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('3%'),
  },
  heartIcon: {
    marginLeft: wp('4%'),
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
  },
  filterButton: {
    flexDirection: 'row',
    paddingHorizontal: isTablet ? wp('1.5%') : wp('2%'),
    paddingVertical: isTablet ? hp('0.6%') : hp('0.8%'),
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: wp('2%'),
    borderWidth: 1,
    borderColor: '#edebeb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterText: {
    fontSize: isTablet ? wp('2.5%') : wp('3.5%'),
    color: 'gray',
    textAlign: 'center',
    marginLeft: wp('1%'),
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
});
