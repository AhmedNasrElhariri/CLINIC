import React, { useRef } from 'react';
import * as R from 'ramda';

import {
  List,
  ListItem,
  Text,
  Container,
  Content,
  Body,
  Right,
} from 'native-base';
import { useQuery } from '@apollo/react-hooks';

import { LIST_APPOINTMENTS } from '@/apollo-client/queries';
import { getStartOfDay, format } from '@/services/date.service';

export default function TodayAppointments() {
  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: {
      input: {
        fromDate: getStartOfDay(new Date()),
      },
    },
  });

  const appointments = R.propOr([], 'appointments')(data);

  return (
    <Container>
      <Content>
        <List>
          {appointments.map((appointment, idx) => (
            <ListItem key={idx}>
              <Body>
                <Text>{appointment.patient.name}</Text>
                <Text note>{appointment.type}</Text>
              </Body>
              <Right>
                <Text note>{format(appointment.date, 'h:mm a')}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}
