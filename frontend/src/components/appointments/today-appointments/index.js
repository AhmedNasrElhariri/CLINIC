import React, { useRef } from 'react';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { List, FlexboxGrid, Button, Icon } from 'rsuite';
import ReactToPrint from 'react-to-print';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import { getAppointmentTime } from 'utils/appointments';
import { AppointmentPrintout, Div } from 'components';

function AppointmentCalendar() {
  const history = useHistory();
  const componentRef = useRef();

  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: {
      input: {
        date: new Date().toDateString(),
      },
    },
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
            <FlexboxGrid.Item colspan={8}>
              {getAppointmentTime(appointment, idx)}
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={8}>
              {appointment.patient.name}
            </FlexboxGrid.Item>

            <FlexboxGrid.Item colspan={8}>
              <ReactToPrint
                trigger={() => (
                  <Button appearance="link" data-trigger>
                    Print <Icon icon="print" data-trigger />
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
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  );
}

export default AppointmentCalendar;
