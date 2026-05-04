import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Login from './screens/Login';
import Register from './screens/Register';

export default function App() {
  const [screen, setScreen] = useState<'login' | 'register'>('login');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setScreen('login')} style={[styles.tab, screen === 'login' && styles.activeTab]}>
          <Text style={[styles.tabText, screen === 'login' && styles.activeTabText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('register')} style={[styles.tab, screen === 'register' && styles.activeTab]}>
          <Text style={[styles.tabText, screen === 'register' && styles.activeTabText]}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {screen === 'login' ? <Login /> : <Register />}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#444',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
