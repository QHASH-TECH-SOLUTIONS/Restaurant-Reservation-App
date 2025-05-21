import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const isTablet = width > 768;

const NUM_COLUMNS_CUISINES = 3;
const NUM_COLUMNS_ALLERGIES = 2;

const Filters = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeAllergy, setActiveAllergy] = useState<string | null>(null);
  const [heatLevelIndex, setHeatLevelIndex] = useState(1); // Default to Spicy (index 1)
  const [activeIcon, setActiveIcon] = useState('location'); // 'location' or 'deal'
  const navigation = useNavigation();

  const progress = useSharedValue(33.33); // Default to 33.33% (Spicy)
  const min = useSharedValue(0);
  const max = useSharedValue(100);

  const cuisines = [
    {name: 'Italian', icon: 'food-fork-drink'},
    {name: 'Asian', icon: 'rice'},
    {name: 'Seafood', icon: 'fish'},
    {name: 'Mexican', icon: 'taco'},
    {name: 'Cafe', icon: 'coffee'},
    {name: 'American', icon: 'hamburger'},
    {name: 'International', icon: 'earth'},
  ];

  const allergies = [
    {name: 'Vegetarian', icon: 'leaf'},
    {name: 'Vegan', icon: 'seed'},
    {name: 'Gluten Free', icon: 'barley-off'},
    {name: 'Nut Free', icon: 'peanut-off'},
  ];

  const heatLevels = ['Mild', 'Spicy', 'Hot'];

  const handleSliderValueChange = (value: number) => {
    const step = 100 / (heatLevels.length - 1);
    const newIndex = Math.round(value / step);
    const clampedIndex = Math.min(Math.max(newIndex, 0), heatLevels.length - 1);
    setHeatLevelIndex(clampedIndex);
    progress.value = clampedIndex * step;
  };

  const renderTrack = () => (
    <LinearGradient
      colors={['#FF9800', '#FF5722']} // Gradient from orange to red
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradientTrack}
    />
  );

  const renderCuisineItem = ({item}: {item: {name: string; icon: string}}) => (
    <TouchableOpacity
      style={[
        styles.cuisineButton,
        activeCategory === item.name && styles.activeCuisineButton,
      ]}
      onPress={() =>
        setActiveCategory(activeCategory === item.name ? null : item.name)
      }>
      <Icon
        name={item.icon}
        size={isTablet ? wp('6%') : wp('6%')}
        color={activeCategory === item.name ? '#FFFFFF' : '#666666'}
      />
      <Text
        style={[
          styles.cuisineText,
          activeCategory === item.name && styles.activeCuisineText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderAllergyItem = ({item}: {item: {name: string; icon: string}}) => (
    <TouchableOpacity
      style={[
        styles.allergyButton,
        activeAllergy === item.name && styles.activeAllergyButton,
      ]}
      onPress={() =>
        setActiveAllergy(activeAllergy === item.name ? null : item.name)
      }>
      <Icon
        name={item.icon}
        size={isTablet ? wp('6%') : wp('7%')}
        color={activeAllergy === item.name ? '#FFFFFF' : '#666666'}
      />
      <Text
        style={[
          styles.allergyText,
          activeAllergy === item.name && styles.activeAllergyText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name={'arrow-back-outline'}
            size={wp('6%')}
            color={'#000000'}
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeIcon === 'location' && styles.activeToggleButton,
              ]}
              onPress={() => setActiveIcon('location')}>
              <Ionicons
                name="location-outline"
                size={wp('5%')}
                color={activeIcon === 'location' ? '#4CAF50' : '#666666'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeIcon === 'deal' && styles.activeToggleButton,
              ]}
              onPress={() => setActiveIcon('deal')}>
              <Ionicons
                name="pricetag-outline"
                size={wp('5%')}
                color={activeIcon === 'deal' ? '#4CAF50' : '#666666'}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={
              activeIcon === 'location'
                ? 'Enter address'
                : 'What are you craving?'
            }
            style={styles.inputField}
            placeholderTextColor={'#666666'}
          />
          <Ionicons
            name="search"
            size={wp('5%')}
            color={'#666666'}
            style={styles.inputIcon}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Cuisines</Text>
        <FlatList
          data={cuisines}
          renderItem={renderCuisineItem}
          keyExtractor={item => item.name}
          horizontal={false}
          scrollEnabled
          numColumns={NUM_COLUMNS_CUISINES}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allergies & Restrictions</Text>
        <FlatList
          data={allergies}
          renderItem={renderAllergyItem}
          keyExtractor={item => item.name}
          horizontal={false}
          scrollEnabled
          numColumns={NUM_COLUMNS_ALLERGIES}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferred Heat Level</Text>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            progress={progress}
            minimumValue={min}
            maximumValue={max}
            // step={100 / (heatLevels.length - 1)} // Step size for 3 values
            onValueChange={handleSliderValueChange}
            renderTrack={renderTrack}
            // renderBubble={() => null} // Disable bubble for cleaner look
            // minimumTrackTintColor="#FF5722"
            // maximumTrackTintColor="#E0E0E0"
            renderThumb={() => <View style={styles.thumb} />}
            thumbWidth={25}
            sliderHeight={10}
          />
          <View style={styles.sliderLabel}>
            <Icon name="chili-hot" size={wp('6%')} color="#FF5722" />
            <Text style={styles.sliderText}>{heatLevels[heatLevelIndex]}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? hp('3%') : hp('5%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 1},
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('5%'),
    marginLeft: wp('2%'),
    borderRadius: 25,
    backgroundColor: '#E8ECEF',
    paddingHorizontal: wp('0.5%'),
  },
  inputField: {
    flex: 1,
    fontSize: isTablet ? wp('4%') : wp('4.5%'),
    color: '#333333',
    paddingHorizontal: wp('4%'),
  },
  inputIcon: {
    marginHorizontal: wp('4%'),
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 100,
    width: wp('17%'),
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('3.5%'),
    width: wp('7%'),
  },
  activeToggleButton: {
    backgroundColor: 'white',
    borderRadius: 100,
  },
  section: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#FFFFFF',
    marginVertical: hp('1%'),
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 1},
  },
  sectionTitle: {
    fontSize: isTablet ? wp('4.5%') : wp('5%'),
    color: '#333',
    fontWeight: '600',
    marginBottom: hp('1.5%'),
  },
  filterContainer: {},
  cuisineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    paddingHorizontal: wp('3%'),
    margin: wp('1%'),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    minWidth: wp('25%'),
  },
  activeCuisineButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  cuisineText: {
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    color: '#666',
    marginLeft: wp('2%'),
    fontWeight: '500',
  },
  activeCuisineText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  allergyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    margin: wp('1%'),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    width: wp('45%'),
  },
  activeAllergyButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  allergyText: {
    fontSize: isTablet ? wp('3.5%') : wp('4%'),
    color: '#666',
    marginLeft: wp('2%'),
    fontWeight: '500',
  },
  activeAllergyText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sliderContainer: {
    paddingVertical: hp('1%'),
  },
  slider: {
    width: '90%',
    alignSelf: 'center',
    height: hp('7%'),
    // borderRadius: wp('80%'),
  },
  thumb: {
    width: wp('10%'),
    height: wp('6%'),
    borderRadius: wp('40%'),
    backgroundColor: '#f0f0f0',
    // borderWidth: 2,
    // elevation: 1,
    // borderColor: '#FF5722',
  },
  sliderLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('5%'),
  },
  sliderText: {
    fontSize: isTablet ? wp('4%') : wp('4.5%'),
    color: '#333',
    marginLeft: wp('1%'),
    fontWeight: '600',
  },
  gradientTrack: {
    height: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#FFFFFF',
    marginBottom: hp('10%'),
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: hp('2%'),
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: isTablet ? wp('4%') : wp('4.5%'),
    fontWeight: '600',
  },
});
