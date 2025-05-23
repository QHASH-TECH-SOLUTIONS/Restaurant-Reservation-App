import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RewardCard} from '../../components/Rewards';

const RewardsScreen = () => {
  return (
    <View style={styles.container}>
      <RewardCard />
    </View>
  );
};

export default RewardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
