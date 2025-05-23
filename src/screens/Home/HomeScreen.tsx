import {
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RestaurantCard } from '../../components/Home';
// import ToggleButton from '../../components/TabView/TabView';
// import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const { width, height } = Dimensions.get('window');
const isTablet = width > 768;

interface HeightValues {
  heightValue: number;
}

const HomeScreen = () => {
  // Removed unused useSharedValue
  // const height = useSharedValue(100);

  const getDeviceCategory = () => {
    if (isTablet) return 'tablet';

    // Use the global height from Dimensions
    const heightCategories = [
      { max: 600, category: 'xsmall' },
      { max: 620, category: 'small-600' },
      { max: 640, category: 'small-620' },
      { max: 660, category: 'small-640' },
      { max: 680, category: 'medium-660' },
      { max: 700, category: 'medium-680' },
      { max: 720, category: 'medium-700' },
      { max: 740, category: 'medium-720' },
      { max: 760, category: 'medium-740' },
      { max: 780, category: 'medium-760' },
      { max: 800, category: 'medium-780' },
      { max: 820, category: 'large-800' },
      { max: 840, category: 'large-820' },
      { max: 860, category: 'large-840' },
      { max: 880, category: 'large-860' },
      { max: 900, category: 'large-880' },
      { max: 920, category: 'large-900' },
      { max: 940, category: 'large-920' },
      { max: 960, category: 'xlarge-940' },
      { max: 980, category: 'xlarge-960' },
      { max: 1000, category: 'xlarge-980' },
      { max: Infinity, category: 'xlarge-1000' },
    ];

    // Find the first category where the screen height is less than or equal to max
    const category = heightCategories.find(item => height <= item.max);
    return category ? category.category : 'xlarge-1000';
  };

  const getHeights = (deviceCategory: string): HeightValues => {
    // Default values
    const heights: HeightValues = {
      heightValue: hp('78%'),
    };

    // Create a mapping based on device categories
    const heightMappings: Record<string, HeightValues> = {
      'xsmall': { heightValue: hp('78%') },
      'small-600': { heightValue: hp('78%') },
      'small-620': { heightValue: hp('78%') },
      'small-640': { heightValue: hp('78%') },
      'medium-660': { heightValue: hp('78%') },
      'medium-680': { heightValue: hp('78%') },
      'medium-700': { heightValue: hp('78%') },
      'medium-720': { heightValue: hp('78%') }, // mehdi
      'medium-740': { heightValue: hp('78%') },
      'medium-760': { heightValue: hp('78%') }, //muzammil
      'medium-780': { heightValue: hp('78%') },
      'large-800': { heightValue: hp('78%') },
      'large-820': { heightValue: hp('78%') },
      'large-840': { heightValue: hp('78%') },
      'large-860': { heightValue: hp('68.5%') }, // babar
      'large-880': { heightValue: hp('78%') },
      'large-900': { heightValue: hp('78%') },
      'large-920': { heightValue: hp('78%') },
      'xlarge-940': { heightValue: hp('78%') },
      'xlarge-960': { heightValue: hp('78%') },
      'xlarge-980': { heightValue: hp('78%') },
      'xlarge-1000': { heightValue: hp('78%') },
      'tablet': { heightValue: hp('78%') },
    };

    return heightMappings[deviceCategory] || heights;
  };

  const insets = useSafeAreaInsets();
  const deviceCategory = getDeviceCategory();
  const { heightValue } = getHeights(deviceCategory);

  const screenHeight = heightValue + insets.bottom;
  return (
    <>
      <View style={styles.innerContainer}>
        <View
          style={{
            width: wp('100%'), // Full screen width
            height: screenHeight,
            // backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <RestaurantCard />
        </View>

        <View
          style={{
            width: horizontalScale(375),
            height: verticalScale(50),
            alignItems: 'center',
            // justifyContent: 'center',
            // backgroundColor: 'red',
            paddingTop: moderateScale(0),
          }}
          >
          {/* <ToggleButton /> */}
        </View>
      </View>
      {/* </SafeAreaView> */}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#F5F5F5',
  },
  innerContainer: {
    // flex: 1,
    // paddingTop: hp('1%'),
    // backgroundColor: 'gray',
    // width: width * 1,
    // height: height * 1,
    // alignItems: 'center',
  },
  text: {
    fontSize: wp('4%'),
    color: '#333',
  },
});
