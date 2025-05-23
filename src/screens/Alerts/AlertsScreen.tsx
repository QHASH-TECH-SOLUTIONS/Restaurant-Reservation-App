import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CuisineFilter from '../../components/Home/CuisineFilter';
import {AlertCard} from '../../components/Alerts';
import ToggleButton from '../../components/TabView/TabView';

const AlertsScreen = () => {
  return (
    // <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
    <>
      <View style={styles.innerContainer}>
        {/* <CuisineFilter /> */}
        <AlertCard />
      </View>
      <View style={styles.toggleContainer}>
        <ToggleButton />
      </View>
    </>

    // </SafeAreaView>
  );
};

export default AlertsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
  },
  toggleContainer: {
    alignItems: 'center',
    // flex: 1,
    height: '19%',
  },
});
