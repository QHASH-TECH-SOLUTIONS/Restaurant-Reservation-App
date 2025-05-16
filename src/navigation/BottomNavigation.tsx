import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context'; // Import safe area context
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HomeScreen,
  ClaimScreen,
  AlertsScreen,
  RewardsScreen,
  AccountScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');
const isTablet = width > 768;

const BottomNavigation = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          const iconSize = isTablet ? hp('2.5%') : hp('3%');
          if (route.name === 'Deals') {
            return <AntDesign name="tago" size={iconSize} color={color} />;
          } else if (route.name === 'Claims') {
            return <Octicons name="verified" size={iconSize} color={color} />;
          } else if (route.name === 'Alerts') {
            return (
              <Ionicons
                name="notifications-outline"
                size={iconSize}
                color={color}
              />
            );
          } else if (route.name === 'Rewards') {
            return <AntDesign name="staro" size={iconSize} color={color} />;
          } else if (route.name === 'Account') {
            return <AntDesign name="user" size={iconSize} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          height: isTablet
            ? hp('6%') + insets.bottom
            : hp('8%') + insets.bottom,
          paddingBottom: hp('1%') + insets.bottom,
          paddingTop: hp('1%'),
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 5,
          shadowOffset: {width: 0, height: -2},
          paddingHorizontal: isTablet ? wp('5%') : wp('2%'),
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontSize: isTablet ? wp('2.5%') : wp('3%'),
          marginBottom: hp('0.5%'),
        },
      })}>
      <Tab.Screen name="Deals" component={HomeScreen} />
      <Tab.Screen name="Claims" component={ClaimScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
