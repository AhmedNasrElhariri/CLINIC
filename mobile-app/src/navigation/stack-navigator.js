import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NAVIGATIONS } from '@/utils/constants';
import HomeScreen from '@/screens/home.screen';
import LoginScreen from '@/screens/login.screen';
import NewAppointmentScreen from '@/screens/new-appointment.screen';
import NewPatientScreen from '@/screens/new-patient.screen';
import TodayAppointmentsScreen from '@/screens/today-appointments.screen';
import CalendarScreen from '@/screens/calendar.screen';
import AppointmentScreen from '@/screens/appointment.screen';

const Stack = createStackNavigator();

const initalRoute = NAVIGATIONS.TODAY_APPOINTMENTS;

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={initalRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NAVIGATIONS.LOGIN}
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="Home"
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
  );
};

export default StackNavigator;
