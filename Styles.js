import React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        marginRight: 1,
        marginLeft: 5,
    },
    heading: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 22,
    },
    normal: {
      color: 'darkgrey',
      fontSize: 16,
    },
    message: {
        color: 'green',
        fontSize: 16,
    },
    small: {
        color: 'green',
        fontSize: 12,
    }
  });