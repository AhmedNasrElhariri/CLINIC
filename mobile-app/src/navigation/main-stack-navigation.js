import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@/screens/home.screen';
import NewPatientScreen from '@/screens/new-patient.screen';
import NewAppointmentScreen from '@/screens/new-appointment.screen';
import TodayAppointmentsScreen from '@/screens/today-appointments.screen';
import CalendarScreen from '@/screens/calendar.screen';

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
          name='NewAppointment'
          component={NewAppointmentScreen}
          options={{ title: 'New Appointment' }}
        />
        <Stack.Screen
          name='NewPatient'
          component={NewPatientScreen}
          options={{ title: 'New Patient' }}
        />
        <Stack.Screen
          name='TodayAppointments'
          component={TodayAppointmentsScreen}
          options={{ title: 'Today Appointments' }}
        />
        <Stack.Screen
          name='Calendar'
          component={CalendarScreen}
          options={{ title: 'Calendar' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
