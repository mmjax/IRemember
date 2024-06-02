import * as React from 'react';
import { Button, View, LogBox } from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator'

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <MainStackNavigator>
      
    </MainStackNavigator>
  );
}