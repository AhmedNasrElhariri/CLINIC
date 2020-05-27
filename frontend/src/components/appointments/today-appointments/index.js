import React, { useRef } from 'react';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { List, FlexboxGrid, Button, Icon, Alert } from 'rsuite';
import ReactToPrint from 'react-to-print';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import { AppointmentPrintout, AdjustAppointment, Div } from 'components';
import { getStartOfDay, format, getEndOfDay } from 'services/date.service';
import { isScheduled } from 'services/appointment';
import { SET_APPOINTMENT_DONE } from 'apollo-client/queries';
import { isAfterMoment } from 'utils/date';

function AppointmentCalendar() {
  const history = useHistory();
  const componentRef = useRef();
  const [setAppointmentDone] = useMutation(SET_APPOINTMENT_DONE, {
    onCompleted: () => {
      Alert.success('Appointment has been Archived successfully');
    },
  });

  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: {
      input: {
        fromDate: getStartOfDay(new Date()),
        toDate: getEndOfDay(new Date()),
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const appointments = R.propOr([], 'appointments')(data);

  return (
    <List hover size="lg" className="cursor-pointer">
      {appointments.map((appointment, idx) => (
        <List.Item
          style={{ padding: '10px' }}
          key={idx}
          index={idx}
          onClick={e => {
            if (!e.target.getAttribute('data-trigger')) {
              history.push(`/appointments/${appointment.id}`);
            }
          }}
        >
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={6}>
              {format(appointment.date, 'h:mm a')}
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={6}>
              {appointment.patient.name}
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={6}>
              {isScheduled(appointment) ? (
                <Button
                  appearance="primary"
                  onClick={e => {
                    e.stopPropagation();
                    setAppointmentDone({ variables: { id: appointment.id } });
                  }}
                >
                  Done
                </Button>
              ) : (
                <span>{appointment.status}</span>
              )}
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={6} onClick={e => e.stopPropagation()}>
              <ReactToPrint
                trigger={() => (
                  <Button appearance="link" data-trigger>
                    <Icon icon="print" data-trigger />
                  </Button>
                )}
                content={() => componentRef.current}
              />
              <Div display="none">
                <AppointmentPrintout
                  ref={componentRef}
                  name={appointment.patient.name}
                  age={appointment.patient.age}
                  sex={appointment.patient.sex}
                />
              </Div>
              {isAfterMoment(appointment.date) && (
                <AdjustAppointment appointment={appointment} />
              )}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  );
}

export default AppointmentCalendar;
