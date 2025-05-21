import React from 'react';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CuisineFilter} from '../Home';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Layout = ({children}: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View
        style={[
          styles.topFilterContainer,
          {
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight : insets.top,
          },
        ]}>
        <CuisineFilter />
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {children}
        <View />
      </View>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topFilterContainer: {
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
});
