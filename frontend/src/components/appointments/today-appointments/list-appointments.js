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
  onArchive,
<<<<<<< HEAD
  title,
  defaultExpanded = false,
=======
  waiting,
  onAddBusinessNotes,
>>>>>>> 27c3281... resolve the bugs
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
              history.push(
                `/patients/${appointment.patient.id}?appointmentId=${appointment.id}`
              );
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

<<<<<<< HEAD
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
                    <CRTable.CRCellStyled>
                      {isScheduled(appointment) && (
                        <CRButton
                          variant="primary"
                          onClick={e => {
                            e.stopPropagation();
                            onArchive(appointment);
                          }}
                        >
                          Archive
                        </CRButton>
                      )}
                    </CRTable.CRCellStyled>
                    <Div onClick={e => e.stopPropagation()}>
                      <ReactToPrint
                        trigger={() => <PrintOLIcon ml={2} />}
                        content={() => componentRef.current}
                      />
                      <Div display="none">
                        <AppointmentPrintout
                          ref={componentRef}
                          appointment={appointment}
                          patient={appointment.patient}
                        />
                      </Div>
                    </Div>
                    <Div onClick={e => e.stopPropagation()}>
                      {canAjdust(appointment) && (
                        <AdjustAppointment appointment={appointment} />
                      )}
                    </Div>
=======
        <CRTable.CRColumn flexGrow={2}>
          <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {appointment => (
              <Div display="flex">
                <CRTable.CRCellStyled>
                  {(isScheduled(appointment) || isWaiting(appointment)) && (
                    <CRButton
                      variant="primary"
                      onClick={e => {
                        e.stopPropagation();
                        onArchive(appointment);
                      }}
                    >
                      Archive
                    </CRButton>
                  )}
                </CRTable.CRCellStyled>
                <CRTable.CRCellStyled>
                  <CRButton
                    variant="primary"
                    onClick={e => {
                      e.stopPropagation();
                      onAddBusinessNotes(appointment);
                    }}
                  >
                    Notes
                  </CRButton>
                </CRTable.CRCellStyled>
                <Div onClick={e => e.stopPropagation()}>
                  <ReactToPrint
                    trigger={() => <PrintOLIcon ml={2} />}
                    content={() => componentRef.current}
                  />
                  <Div display="none">
                    <AppointmentPrintout
                      ref={componentRef}
                      appointment={appointment}
                      patient={appointment.patient}
                    />
>>>>>>> 27c3281... resolve the bugs
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
