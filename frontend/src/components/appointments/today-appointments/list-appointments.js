import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

import {
  AppointmentPrintout,
  AdjustAppointment,
  Div,
  CRButton,
  CRTable,
} from 'components';
import { isScheduled, isWaiting } from 'services/appointment';
import { canAjdust } from 'services/appointment';

import { PrintOLIcon } from 'components/icons';
import { formatDate } from 'utils/date';
import { FULL_DATE_FORMAT, STANDARD_DATE_FORMAT } from 'utils/constants';

function ListAppointments({
  appointments,
  onArchive,
  waiting,
  onAddBusinessNotes,
}) {
  const history = useHistory();
  const componentRef = useRef();
  return (
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
        <CRTable.CRColumn flexGrow={0.2}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }, indx) => (
              <CRTable.CRCellStyled>{indx + 1}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Time</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled>
                {waiting ? '' : formatDate(date, FULL_DATE_FORMAT)}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled>
                {formatDate(date, STANDARD_DATE_FORMAT)}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patient }) => (
              <CRTable.CRCellStyled bold>{patient.name}</CRTable.CRCellStyled>
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
            {({ type, session }) => (
              <CRTable.CRCellStyled>
                {type} {type === 'Session' ? session?.name : ''}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={1}>
          <CRTable.CRHeaderCell>Doctor</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ user }) => (
              <CRTable.CRCellStyled>{user.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={0.8}>
          <CRTable.CRHeaderCell>Specialty</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ specialty }) => (
              <CRTable.CRCellStyled>{specialty?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={0.8}>
          <CRTable.CRHeaderCell>Branch</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ branch }) => (
              <CRTable.CRCellStyled>{branch?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={4}>
          <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {appointment => (
              <Div display="flex">
                {(isScheduled(appointment) || isWaiting(appointment)) && (
                  <CRButton
                    variant="primary"
                    mr={1}
                    onClick={e => {
                      e.stopPropagation();
                      onArchive(appointment);
                    }}
                  >
                    Archive
                  </CRButton>
                )}
                <CRButton
                  variant="primary"
                  onClick={e => {
                    e.stopPropagation();
                    onAddBusinessNotes(appointment);
                  }}
                >
                  Notes
                </CRButton>
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
              </Div>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
      </CRTable>
    </Div>
  );
}

export default ListAppointments;
