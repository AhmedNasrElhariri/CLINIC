import React from 'react';
import { List, ListItem, Body, Right } from 'native-base';

import { format } from '@/services/date';
import { CRText } from '@/components';
import NoAppointments from './no-appointments';

const ListAppointments = ({ appointments, onNew }) => {
  return appointments.length ? (
    <List>
      {appointments.map((appointment, idx) => (
        <ListItem key={idx} noBorder>
          <Body>
            <CRText size={14} weight="bold" style={{ textAlign: 'left' }}>
              {appointment.patient.name}
            </CRText>
            <CRText variant="primary" size={10} weight="semiBold">
              {appointment.type}
            </CRText>
            <CRText variant="lighter" size={10} weight="semiLight">
              {appointment.clinic.name}
            </CRText>
          </Body>
          <Right>
            <CRText size={12} weight="semiLight">
              {format(appointment.date, 'h:mm a')}
            </CRText>
          </Right>
        </ListItem>
      ))}
    </List>
  ) : (
    <NoAppointments onNew={onNew} />
  );
};

export default ListAppointments;
