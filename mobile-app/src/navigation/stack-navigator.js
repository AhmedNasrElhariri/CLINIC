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
import SearchScreen from '@/screens/search.screen';
import Patients from '@/screens/patients.screen';
import Patient from '@/screens/patient.screen';
import PatientInfo from '@/screens/patient-info.screen';
import HistoryProgressScreen from '@/screens/history-progress.screen';
import HistorySummaryScreen from '@/screens/history-summary.screen';

import useGlobalState from '@/state';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const initalRoute = NAVIGATIONS.TODAY_APPOINTMENTS;

const MainStackScreen = () => {
  const [isVerified] = useGlobalState('isVerified');
  return (
    <MainStack.Navigator
      initialRouteName={initalRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isVerified ? (
        <MainStack.Screen name={NAVIGATIONS.LOGIN} component={LoginScreen} />
      ) : (
        <>
          <MainStack.Screen name="Home" component={HomeScreen} />
          <MainStack.Screen
            name={NAVIGATIONS.NEW_APPOINTMENT}
            component={NewAppointmentScreen}
          />
          <MainStack.Screen
            name={NAVIGATIONS.NEW_PATIENT}
            component={NewPatientScreen}
            options={{ title: 'New Patient' }}
          />
          <MainStack.Screen
            name={NAVIGATIONS.TODAY_APPOINTMENTS}
            component={TodayAppointmentsScreen}
          />
          <MainStack.Screen
            name={NAVIGATIONS.CALENDAR}
            component={CalendarScreen}
          />
          <MainStack.Screen name={NAVIGATIONS.PATIENTS} component={Patients} />
          <MainStack.Screen name={NAVIGATIONS.PATIENT} component={Patient} />
          <MainStack.Screen
            name={NAVIGATIONS.PATIENT_INFO}
            component={PatientInfo}
          />
          <MainStack.Screen
            name={NAVIGATIONS.APPOINTMENT}
            component={AppointmentScreen}
          />
          <MainStack.Screen
            name={NAVIGATIONS.HISTORY_PROGRESS}
            component={HistoryProgressScreen}
          />
          <MainStack.Screen
            name={NAVIGATIONS.HISTORY_SUMMARY}
            component={HistorySummaryScreen}
          />
        </>
      )}
    </MainStack.Navigator>
  );
};

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen name="Main" component={MainStackScreen} />
      <RootStack.Screen name={NAVIGATIONS.SEARCH} component={SearchScreen} />
      <RootStack.Screen
        name={NAVIGATIONS.NEW_PATIENT}
        component={NewPatientScreen}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
