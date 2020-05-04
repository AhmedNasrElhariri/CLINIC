import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@/screens/home.screen';
import NewPatientScreen from '@/screens/new-patient.screen';
import NewAppointmentScreen from '@/screens/new-appointment.screen';
import TodayAppointmentsScreen from '@/screens/today-appointments.screen';
import CalendarScreen from '@/screens/calendar.screen';
import AppointmentScreen from '@/screens/appointment.screen';
import { NAVIGATIONS } from '@/utils/constants';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name={NAVIGATIONS.NEW_APPOINTMENT}
          component={NewAppointmentScreen}
          options={{ title: 'New Appointment' }}
        />
        <Stack.Screen
          name={NAVIGATIONS.NEW_PATIENT}
          component={NewPatientScreen}
          options={{ title: 'New Patient' }}
        />
        <Stack.Screen
          name={NAVIGATIONS.TODAY_APPOINTMENTS}
          component={TodayAppointmentsScreen}
          options={{ title: 'Today Appointments' }}
        />
        <Stack.Screen
          name={NAVIGATIONS.CALENDAR}
          component={CalendarScreen}
          options={{ title: 'Calendar' }}
        />
        <Stack.Screen
          name={NAVIGATIONS.APPOINTMENT}
          component={AppointmentScreen}
          options={{ title: 'Appointment' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
