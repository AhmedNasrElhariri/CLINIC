import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '@/screens/home.screen';
import NewAppointmentScreen from '@/screens/new-appointment.screen';
import NewPatientScreen from '@/screens/new-patient.screen';
import { NAVIGATIONS } from '@/utils/constants';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name={NAVIGATIONS.NEW_APPOINTMENT}
        component={NewAppointmentScreen}
        options={{ title: 'New Appointment' }}
      />
      <Tab.Screen
        name={NAVIGATIONS.NEW_PATIENT}
        component={NewPatientScreen}
        options={{ title: 'New Patient' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
