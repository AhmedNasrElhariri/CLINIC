import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FlexboxGrid, Panel } from 'rsuite';
import ReactToPrint from 'react-to-print';

import {
  AppointmentPrintout,
  AdjustAppointment,
  Div,
  H5,
  H6,
  CRButton,
  CRPanelGroup,
} from 'components';
import { format } from 'services/date.service';
import { isScheduled } from 'services/appointment';
import { canAjdust } from 'services/appointment';

import { PrintOLIcon } from 'components/icons';
import { Headers, Body } from './style';
import NoAppointments from './no-appointments';

function ListAppointments({
  appointments,
  onDone,
  title,
  defaultExpanded = false,
}) {
  const history = useHistory();
  const componentRef = useRef();

  return (
    <CRPanelGroup accordion>
      <Panel
        header={
          <H5 fontWeight={600} px={4} py={3}>
            {title}
          </H5>
        }
        bodyFill
        defaultExpanded={defaultExpanded}
      >
        <Headers>
          <Headers.Item>Time</Headers.Item>
          <Headers.Item>Name</Headers.Item>
          <Headers.Item>Phone</Headers.Item>
        </Headers>

        {appointments.length ? (
          appointments.map((appointment, idx) => (
            <Body
              key={idx}
              index={idx}
              onClick={e => {
                if (!e.target.getAttribute('data-trigger')) {
                  history.push(`/appointments/${appointment.id}`);
                }
              }}
            >
              <Body.Content>
                <FlexboxGrid align="middle">
                  <FlexboxGrid.Item colspan={4}>
                    <H6 fontWeight="bold" textTransform="uppercase">
                      {format(appointment.date, 'h:mm a')}
                    </H6>
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item colspan={4}>
                    <H6 color="texts.0" fontWeight={600}>
                      {appointment.patient.name}
                    </H6>
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item colspan={4}>
                    <H6 color="texts.0">{appointment.patient.phoneNo}</H6>
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item
                    colspan={12}
                    onClick={e => e.stopPropagation()}
                  >
                    <FlexboxGrid justify="end" align="middle">
                      {isScheduled(appointment) ? (
                        <CRButton
                          primary
                          round
                          small
                          onClick={e => {
                            e.stopPropagation();
                            onDone(appointment);
                          }}
                        >
                          Done
                        </CRButton>
                      ) : (
                        <span>{appointment.status}</span>
                      )}

                      <ReactToPrint
                        trigger={() => <PrintOLIcon ml={2} />}
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
                    </FlexboxGrid>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </Body.Content>
            </Body>
          ))
        ) : (
          <NoAppointments />
        )}
      </Panel>
    </CRPanelGroup>
  );
}

export default ListAppointments;
