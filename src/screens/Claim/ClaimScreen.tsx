import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CuisineFilter from '../../components/Home/CuisineFilter';
import {ClaimsCard} from '../../components/Claims';

const ClaimsScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.innerContainer}>
        <CuisineFilter />
        <ClaimsCard />
      </View>
    </SafeAreaView>
  );
};

export default ClaimsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
  },
});
