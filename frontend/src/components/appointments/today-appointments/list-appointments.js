import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Panel } from 'rsuite';
import ReactToPrint from 'react-to-print';

import {
  AppointmentPrintout,
  AdjustAppointment,
  Div,
  H5,
  CRButton,
  CRPanelGroup,
  CRTable,
} from 'components';
import { isScheduled } from 'services/appointment';
import { canAjdust } from 'services/appointment';

import { PrintOLIcon } from 'components/icons';
import { formatDate } from 'utils/date';
import { FULL_DATE_FORMAT } from 'utils/constants';

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
        <Div padding={20} wd>
          <CRTable
            autoHeight
            data={appointments}
            onRowClick={appointment => {
              history.push(`/appointments/${appointment.id}`);
            }}
          >
            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Time</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ date }) => (
                  <CRTable.CRCellStyled>
                    {formatDate(date, FULL_DATE_FORMAT)}
                  </CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ patient }) => (
                  <CRTable.CRCellStyled bold>
                    {patient.name}
                  </CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Phone</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ patient }) => (
                  <CRTable.CRCellStyled>{patient.phoneNo}</CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Type</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ type }) => (
                  <CRTable.CRCellStyled>{type}</CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={2}>
              <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {appointment => (
                  <Div display="flex">
                    {isScheduled(appointment) && (
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
                  </Div>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>
          </CRTable>
        </Div>
      </Panel>
    </CRPanelGroup>
  );
}

export default ListAppointments;
