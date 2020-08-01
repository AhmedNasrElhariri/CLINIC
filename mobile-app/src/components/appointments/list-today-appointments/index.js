import React from 'react';
import * as R from 'ramda';
import { List, ListItem, Text, Body, Right } from 'native-base';
import { useQuery } from '@apollo/react-hooks';

import { format } from '@/services/date';
import { NAVIGATIONS } from '@/utils/constants';
import useFetchAppointments from '@/hooks/fetch-appointments';
import { CRMainLayout } from '@/components';

const ListTodayAppointments = ({ appointments }) => {
  return (
    <List>
      {appointments.map((appointment, idx) => (
        <ListItem key={idx}>
          <Body>
            <Text style={{ fontFamily: 'SegoeUIBold' }}>
              {appointment.patient.name}
            </Text>
            <Text note>{appointment.type}</Text>
          </Body>
          <Right>
            <Text note>{format(appointment.date, 'h:mm a')}</Text>
          </Right>
        </ListItem>
      ))}
    </List>
  );
};

export default ListTodayAppointments;
