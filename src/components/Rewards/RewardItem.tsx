import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTS} from 'utils/fontFamily';

interface RewardItemProps {
  name: string;
  description: string;
  visits: number;
  onPress: () => void;
}

const RewardItem: React.FC<RewardItemProps> = ({
  name,
  description,
  visits,
  onPress,
}) => {
  return (
    <View style={styles.rewardItem}>
      <View>
        <Text style={styles.rewardName}>{name}</Text>
        <Text style={styles.rewardDescription}>{description}</Text>
        <Text style={styles.rewardVisits}>
          {visits} visits milestone reward
        </Text>
      </View>
      <TouchableOpacity style={styles.redeemButton} onPress={onPress}>
        <Text style={styles.redeemButtonText}>Redeem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f7f8fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rewardName: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: '#4CAF50',
  },
  rewardDescription: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#666',
  },
  rewardVisits: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: '#666',
  },
  redeemButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  redeemButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: FONTS.bold,
  },
});

export default RewardItem;
