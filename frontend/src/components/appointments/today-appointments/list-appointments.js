import React, { useMemo, useRef, useState } from 'react';
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
import {
  isScheduledOrArchived,
  isDone,
  isScheduled,
  sortAppointments,
} from 'services/appointment';
import { canAjdust } from 'services/appointment';

import { PrintOLIcon } from 'components/icons';
import { formatDate } from 'utils/date';
import { FULL_DATE_FORMAT } from 'utils/constants';
import { Can } from 'components/user/can';

import Filter from './filter';
import { filterTodayAppointments } from 'services/appointment';

function ListAppointments({
  appointments,
  onDone,
  onArchive,
  title,
  defaultExpanded = false,
}) {
  const history = useHistory();
  const componentRef = useRef();

  const [formValue, setFormValue] = useState({});

  const appointments_dummy = [
    {
      doctor_id: '123',
      doctor_name: 'Hana',
      specialization_id: '321',
      specialization_name: 'surgery',
      date: '2020-12-02T14:10:52.945Z',
      id: '6a4fb887-5c61-48c8-aa4b-280179dbf8eq',
      status: 'Archived',
      type: 'Examination',
      __typename: 'Appointment',
      patient: {
        branch: 'Giza',
        age: 21,
        id: '8f7231b1-5755-4c33-8448-820376c473eq',
        name: 'Ahmed',
        phoneNo: '01065093577',
        sex: 'Male',
        __typename: 'Patient',
      },
    },
    {
      doctor_id: '124',
      doctor_name: 'Fatima',
      specialization_id: '421',
      specialization_name: 'bones',
      date: '2020-12-02T18:10:52.945Z',
      id: '6a4fb887-5c61-48c8-aa4b-280179dbf8ew',
      status: 'Archived',
      type: 'Examination',
      __typename: 'Appointment',
      patient: {
        branch: 'Cairo',
        age: 21,
        id: '8f7231b1-5755-4c33-8448-820376c473ew',
        name: 'Khaled',
        phoneNo: '01065093577',
        sex: 'Male',
        __typename: 'Patient',
      },
    },
    {
      doctor_id: '125',
      doctor_name: 'Asmaa',
      specialization_id: '521',
      specialization_name: 'child',
      date: '2020-12-02T13:15:52.945Z',
      id: '6a4fb887-5c61-48c8-aa4b-280179dbf8er',
      status: 'Archived',
      type: 'Examination',
      __typename: 'Appointment',
      patient: {
        branch: 'Giza',
        age: 21,
        id: '8f7231b1-5755-4c33-8448-820376c473er',
        name: 'Mido',
        phoneNo: '01065093577',
        sex: 'Male',
        __typename: 'Patient',
      },
    },
    {
      doctor_id: '126',
      doctor_name: 'Nady',
      specialization_id: '621',
      specialization_name: 'heart',
      date: '2020-12-02T13:15:52.945Z',
      id: '6a4fb887-5c61-48c8-aa4b-280179dbf8et',
      status: 'Archived',
      type: 'Examination',
      __typename: 'Appointment',
      patient: {
        branch: 'Cairo',
        age: 21,
        id: '8f7231b1-5755-4c33-8448-820376c473et',
        name: 'Amira',
        phoneNo: '01065093577',
        sex: 'Male',
        __typename: 'Patient',
      },
    },
  ];

  const doctors = ['Hana', 'Fatima', 'Asmaa', 'Nady'];
  const specializations = ['surgery', 'bones', 'child', 'heart'];

  const filteredAppointments = useMemo(
    () =>
      sortAppointments(filterTodayAppointments(appointments_dummy, formValue)),
    [appointments_dummy, formValue]
  );

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
          <Div mb={4}>
            <Filter
              formValue={formValue}
              onChange={setFormValue}
              doctors={doctors}
              specializations={specializations}
            />
          </Div>

          <CRTable
            autoHeight
            data={filteredAppointments}
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

            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Doctor</CRTable.CRHeaderCell>
              {/* <CRTable.CRCell dataKey="doctor_name" semiBold /> */}
              <CRTable.CRCell>
                {({ doctor_name }) => (
                  <CRTable.CRCellStyled bold>
                    {doctor_name}
                  </CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={1}>
              <CRTable.CRHeaderCell>Specialization</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ specialization_name }) => (
                  <CRTable.CRCellStyled bold>
                    {specialization_name}
                  </CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={2}>
              <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {appointment => (
                  <Div display="flex">
                    {isScheduledOrArchived(appointment) && (
                      <Can I="finish" an="Appointment">
                        <CRButton
                          variant={
                            isScheduled(appointment) ? 'primary' : 'success'
                          }
                          round
                          small
                          onClick={e => {
                            e.stopPropagation();
                            onDone(appointment);
                          }}
                        >
                          Arrived
                        </CRButton>
                      </Can>
                    )}
                    {isDone(appointment) && (
                      <Can I="archive" an="Appointment">
                        <CRButton
                          variant={
                            isScheduled(appointment) ? 'primary' : 'success'
                          }
                          round
                          small
                          onClick={e => {
                            e.stopPropagation();
                            onArchive(appointment);
                          }}
                        >
                          Archive
                        </CRButton>
                      </Can>
                    )}

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
      </Panel>
    </CRPanelGroup>
  );
}

export default ListAppointments;
