import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const isTablet = width > 768;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const ToggleButton = () => {
  const [activeToggle, setActiveToggle] = useState('frshdeals');

  return (
    <View style={styles.upperToggleContainer}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeToggle === 'frshbites' && styles.activeToggleButton,
          ]}
          onPress={() => setActiveToggle('frshbites')}>
          <Text
            style={[
              styles.toggleText,
              {color: activeToggle === 'frshbites' ? 'white' : 'black'},
            ]}>
            frshbites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeToggle === 'frshdeals' && styles.activeToggleButton,
          ]}
          onPress={() => setActiveToggle('frshdeals')}>
          <Text
            style={[
              styles.toggleText,
              {color: activeToggle === 'frshdeals' ? 'white' : 'black'},
            ]}>
            frshdeals
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  upperToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: moderateScale(8),
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(2),
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(25),
    width: horizontalScale(320),
    paddingVertical: moderateScale(4),
  },
  toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: verticalScale(40),
    borderRadius: moderateScale(25),
  },
  activeToggleButton: {
    backgroundColor: '#4CAF50',
    borderRadius: moderateScale(25),
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(2),
    shadowOffset: {width: 0, height: verticalScale(1)},
  },
  toggleText: {
    fontSize: isTablet ? moderateScale(14) : moderateScale(12),
    fontWeight: '600',
    textAlign: 'center',
  },
});
