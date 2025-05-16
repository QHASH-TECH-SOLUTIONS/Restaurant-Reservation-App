import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CuisineFilter, RestaurantCard} from '../../components/Home';
import CustomTabView from '../../components/TabView/TabView';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.innerContainer}>
        <CuisineFilter />
        <RestaurantCard />
        {/* <CuisineFilter /> */}
        <CustomTabView />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  innerContainer: {
    flex: 1,
    paddingTop: hp('1%'),
    alignItems: 'center',
  },
  text: {
    fontSize: wp('4%'),
    color: '#333',
  },
});
