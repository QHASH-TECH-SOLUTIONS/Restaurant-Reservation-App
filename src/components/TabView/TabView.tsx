import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomTabView = () => {
  const [activeTab, setActiveTab] = useState('frshbites');

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'frshbites' && styles.activeTab]}
          onPress={() => setActiveTab('frshbites')}>
          <Text style={styles.tabText}>frshbites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'frshdeals' && styles.activeTab]}
          onPress={() => setActiveTab('frshdeals')}>
          <Text style={styles.tabText}>frshdeals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#00c853',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default CustomTabView;
