import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';

import Routes from './src/routes';
import {StatusBar, YellowBox} from 'react-native'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#005cb2"/>
      <Routes/>
    </>
  );
}
