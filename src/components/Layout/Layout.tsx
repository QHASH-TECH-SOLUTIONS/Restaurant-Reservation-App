import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CuisineFilter } from '../Home';
import ToggleButton from '../../components/TabView/TabView';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* StatusBar (adjusts automatically) */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Top Filter (automatically adjusts for notches) */}
      <View style={styles.topFilterContainer}>
        <CuisineFilter />
      </View>

      {/* Main Content (flexible space) */}
      <View style={styles.contentContainer}>
        {children}
      </View>

      {/* Toggle Button (positioned above bottom navigator) */}
      <View style={styles.toggleButtonContainer}>
        <ToggleButton />
      </View>
    </SafeAreaView>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  toggleButtonContainer: {
    position: 'absolute',
    bottom: '8%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10, // Ensure it stays above other elements
  },
});