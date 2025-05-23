import React from 'react';
import {StyleSheet, View, StatusBar, Dimensions} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {CuisineFilter} from '../Home';
import ToggleButton from '../../components/TabView/TabView';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');
const isTablet = width > 768;

interface HeightValues {
  toggleButtonHeight: number;
  bottomNavigatorHeight: number;
}

const Layout = ({children}: {children: React.ReactNode}) => {
  const getDeviceCategory = () => {
    if (isTablet) return 'tablet';

    // Create a mapping of height ranges to categories
    const heightCategories = [
      {max: 600, category: 'xsmall'},
      {max: 620, category: 'small-600'},
      {max: 640, category: 'small-620'},
      {max: 660, category: 'small-640'},
      {max: 680, category: 'medium-660'},
      {max: 700, category: 'medium-680'},
      {max: 720, category: 'medium-700'},
      {max: 740, category: 'medium-720'},
      {max: 760, category: 'medium-740'},
      {max: 780, category: 'medium-760'},
      {max: 800, category: 'medium-780'},
      {max: 820, category: 'large-800'},
      {max: 840, category: 'large-820'},
      {max: 860, category: 'large-840'},
      {max: 880, category: 'large-860'},
      {max: 900, category: 'large-880'},
      {max: 920, category: 'large-900'},
      {max: 940, category: 'large-920'},
      {max: 960, category: 'xlarge-940'},
      {max: 980, category: 'xlarge-960'},
      {max: 1000, category: 'xlarge-980'},
      {max: Infinity, category: 'xlarge-1000'},
    ];

    // Find the first category where the height is less than or equal to max
    const category = heightCategories.find(item => height <= item.max);
    return category ? category.category : 'xlarge-1000';
  };

  const getHeights = (deviceCategory: string): HeightValues => {
    // Default values
    const heights: HeightValues = {
      toggleButtonHeight: hp('6%'),
      bottomNavigatorHeight: hp('8%'),
    };

    // Create a more granular mapping based on exact heights
    const heightMappings: Record<string, HeightValues> = {
      xsmall: {toggleButtonHeight: hp('8%'), bottomNavigatorHeight: hp('10%')},
      'small-600': {
        toggleButtonHeight: hp('7.8%'),
        bottomNavigatorHeight: hp('9.8%'),
      },
      'small-620': {
        toggleButtonHeight: hp('7.6%'),
        bottomNavigatorHeight: hp('9.6%'),
      },
      'small-640': {
        toggleButtonHeight: hp('7.4%'),
        bottomNavigatorHeight: hp('9.4%'),
      },
      'medium-660': {
        toggleButtonHeight: hp('7.2%'),
        bottomNavigatorHeight: hp('9.2%'),
      },
      'medium-680': {
        toggleButtonHeight: hp('7%'),
        bottomNavigatorHeight: hp('9%'),
      },
      'medium-700': {
        toggleButtonHeight: hp('6.8%'),
        bottomNavigatorHeight: hp('8.8%'),
      },
      'medium-720': {
        toggleButtonHeight: hp('6.6%'),
        bottomNavigatorHeight: hp('8.9%'),
      }, // mehdi
      'medium-740': {
        toggleButtonHeight: hp('6.4%'),
        bottomNavigatorHeight: hp('8.4%'),
      },
      'medium-760': {
        toggleButtonHeight: hp('6.2%'),
        bottomNavigatorHeight: hp('9.1%'),
      }, //muzammil
      'medium-780': {
        toggleButtonHeight: hp('6%'),
        bottomNavigatorHeight: hp('8%'),
      },
      'large-800': {
        toggleButtonHeight: hp('5.8%'),
        bottomNavigatorHeight: hp('7.8%'),
      },
      'large-820': {
        toggleButtonHeight: hp('5.6%'),
        bottomNavigatorHeight: hp('7.6%'),
      },
      'large-840': {
        toggleButtonHeight: hp('5.4%'),
        bottomNavigatorHeight: hp('7.4%'),
      },
      'large-860': {
        toggleButtonHeight: hp('5.2%'),
        bottomNavigatorHeight: hp('11.3%'),
      }, // babar
      'large-880': {
        toggleButtonHeight: hp('5%'),
        bottomNavigatorHeight: hp('7%'),
      },
      'large-900': {
        toggleButtonHeight: hp('4.8%'),
        bottomNavigatorHeight: hp('6.8%'),
      },
      'large-920': {
        toggleButtonHeight: hp('4.6%'),
        bottomNavigatorHeight: hp('6.6%'),
      },
      'xlarge-940': {
        toggleButtonHeight: hp('4.4%'),
        bottomNavigatorHeight: hp('6.4%'),
      },
      'xlarge-960': {
        toggleButtonHeight: hp('4.2%'),
        bottomNavigatorHeight: hp('6.2%'),
      },
      'xlarge-980': {
        toggleButtonHeight: hp('4%'),
        bottomNavigatorHeight: hp('6%'),
      },
      'xlarge-1000': {
        toggleButtonHeight: hp('3.8%'),
        bottomNavigatorHeight: hp('5.8%'),
      },
      tablet: {
        toggleButtonHeight: hp('3.5%'),
        bottomNavigatorHeight: hp('5.5%'),
      },
    };

    return heightMappings[deviceCategory] || heights;
  };

  const insets = useSafeAreaInsets();
  const deviceCategory = getDeviceCategory();
  const {toggleButtonHeight, bottomNavigatorHeight} =
    getHeights(deviceCategory);

  const adjustedBottomNavigatorHeight = bottomNavigatorHeight + insets.bottom;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.topFilterContainer}>
        <CuisineFilter />
      </View>

      <View style={styles.contentContainer}>{children}</View>

      <View
        style={[
          styles.toggleButtonContainer,
          {
            bottom: adjustedBottomNavigatorHeight,
            height: toggleButtonHeight,
          },
        ]}>
        <ToggleButton />
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topFilterContainer: {
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  toggleButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    zIndex: 10,
  },
});
