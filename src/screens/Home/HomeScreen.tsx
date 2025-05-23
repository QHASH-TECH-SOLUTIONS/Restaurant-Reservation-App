import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CuisineFilter, RestaurantCard} from '../../components/Home';
import CustomTabView from '../../components/TabView/TabView';
import ToggleButton from '../../components/TabView/TabView';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const HomeScreen = () => {
  const height = useSharedValue(100);

  const handlePress = () => {
    height.value = withSpring(height.value + 300);
  };
  return (
    <>
      <View style={styles.innerContainer}>
        <View
          style={{
            width: horizontalScale(375),
            height: verticalScale(585),
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
            backgroundColor: 'red',
            paddingTop: moderateScale(0),
          }}>
          <ToggleButton />
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
