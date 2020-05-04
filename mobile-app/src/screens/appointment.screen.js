import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default ({ route }) => {
  console.log(route.params.appointmentId);
  return <Text>Hello</Text>;
};
