import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomNavigation from './BottomNavigation';
import {SearchFilters} from '../components/Filters';
import {Layout} from '../components/Layout';
import ToggleButton from '../components/TabView/TabView';

const Stack = createStackNavigator();

const {width} = Dimensions.get('window');
const isTablet = width > 768;


const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 2,
          shadowOpacity: 0.1,
          shadowRadius: 3,
          shadowOffset: {width: 0, height: 1},
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontSize: isTablet ? wp('4.5%') : wp('5%'),
          fontWeight: '600',
        },
        headerLeft: ({canGoBack, navigation}) =>
          canGoBack && (
            <TouchableOpacity
              style={styles.headerLeft}
              onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={isTablet ? wp('6%') : wp('7%')}
                color="#333"
              />
            </TouchableOpacity>
          ),
      }}>
      <Stack.Screen
        name="MainTabs"
        component={() => (
          <Layout>
            <BottomNavigation />
          </Layout>
        )}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchFilters}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: wp('3%'),
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  detailsText: {
    fontSize: isTablet ? wp('5%') : wp('6%'),
    color: '#333',
    fontWeight: '600',
    marginBottom: hp('3%'),
  },
  backButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: isTablet ? wp('4%') : wp('4.5%'),
    fontWeight: '600',
  },
});
