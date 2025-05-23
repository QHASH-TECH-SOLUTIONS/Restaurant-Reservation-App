import 'react-native-gesture-handler'
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/store/redux-toolkit/store';
import Toast, {BaseToast} from 'react-native-toast-message';
import {Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';

const isTablet = Dimensions.get('window').width >= 768;

const customToastConfig = {
  success: (params: {
    text1?: string;
    text2?: string;
    props?: any;
    [key: string]: any;
  }) => (
    <BaseToast
      {...params}
      style={styles.customToast}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <Feather
          name="bell"
          size={isTablet ? hp('3%') : hp('2.5%')}
          color="#4CAF50"
          style={styles.toastIcon}
        />
      )}
    />
  ),
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <AppNavigator />
            <Toast config={customToastConfig} />
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  customToast: {
    height: isTablet ? hp('10%') : hp('12%'), // Increased height
    width: isTablet ? wp('80%') : wp('90%'), // Increased width
    backgroundColor: '#FFFFFF',
    borderRadius: wp('2%'),
    padding: wp('2%'),
    alignItems: 'center',
  },
  toastContent: {
    // flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
  },
  toastIcon: {
    marginRight: wp('2%'),
  },
  toastText1: {
    fontSize: isTablet ? wp('4%') : wp('4%'),
    color: '#000000',
    fontWeight: '500',
  },
  toastText2: {
    fontSize: isTablet ? wp('3%') : wp('3.5%'),
    color: '#000000',
  },
});
