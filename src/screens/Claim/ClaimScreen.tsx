import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CuisineFilter from '../../components/Home/CuisineFilter';
import {ClaimsCard} from '../../components/Claims';
import ToggleButton from '../../components/TabView/TabView';

const ClaimsScreen = () => {
  return (
    <>
      <View style={styles.innerContainer}>
        <ClaimsCard />
      </View>
      <View style={styles.toggleContainer}>
        <ToggleButton />
      </View>
    </>
  );
};

export default ClaimsScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  toggleContainer: {
    alignItems: 'center',
    // flex: 1,
    height: '19%',
  },
});
