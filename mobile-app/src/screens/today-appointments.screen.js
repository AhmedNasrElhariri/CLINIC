import React from 'react';
import * as R from 'ramda';
import { List, ListItem, Text, Body, Right } from 'native-base';
import { useQuery } from '@apollo/react-hooks';

import { format } from '@/services/date';
import { NAVIGATIONS } from '@/utils/constants';
import useFetchAppointments from '@/hooks/fetch-appointments';
import { CRMainLayout } from '@/components';
import ListTodayAppointments from '@/components/appointments/list-today-appointments';

const TodayAppointments = ({ navigation }) => {
  // const { data } = useQuery(LIST_APPOINTMENTS, {
  //   variables: {
  //     input: {
  //       fromDate: getStartOfDay(new Date()),
  //     },
  //   },
  // });

  // const appointments = R.propOr([], 'appointments')(data);

  const { todayAppointments, appointments } = useFetchAppointments();

  return (
    <CRMainLayout header="Appointments">
      <ListTodayAppointments appointments={appointments} />
      {/* <List>
        {appointments.map((appointment, idx) => (
          <ListItem
            key={idx}
            onPress={() =>
              navigation.navigate(NAVIGATIONS.APPOINTMENT, {
                appointmentId: appointment.id,
              })
            }
          >
            <Body>
              <Text>{appointment.patient.name}</Text>
              <Text note>{appointment.type}</Text>
            </Body>
            <Right>
              <Text note>{format(appointment.date, 'h:mm a')}</Text>
            </Right>
          </ListItem>
        ))}
      </List> */}
    </CRMainLayout>
  );
};

export default TodayAppointments;
