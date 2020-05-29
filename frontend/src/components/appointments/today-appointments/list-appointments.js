import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { List, FlexboxGrid, Button, Icon } from 'rsuite';
import ReactToPrint from 'react-to-print';

import { AppointmentPrintout, AdjustAppointment, Div } from 'components';
import { format } from 'services/date.service';
import { isScheduled } from 'services/appointment';
import { canAjdust } from 'services/appointment';

function ListAppointments({ appointments, onDone, title }) {
  const history = useHistory();
  const componentRef = useRef();

  return (
    <List hover size="lg" className="cursor-pointer" bordered>
      <List.Item>
        <h4>{title}</h4>
      </List.Item>
      {appointments.length ? (
        appointments.map((appointment, idx) => (
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
                      onDone(appointment);
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
                {canAjdust(appointment) && (
                  <AdjustAppointment appointment={appointment} />
                )}
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </List.Item>
        ))
      ) : (
        <List.Item>
          <span>No Appointments</span>
        </List.Item>
      )}
    </List>
  );
}

export default ListAppointments;
