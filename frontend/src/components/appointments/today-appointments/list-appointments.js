import React, { useRef, useCallback } from 'react';
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
import { Can } from 'components/user/can';
import { PrintOLIcon } from 'components/icons';
import { formatDate } from 'utils/date';
import { FULL_DATE_FORMAT, STANDARD_DATE_FORMAT } from 'utils/constants';

function ListAppointments({
  appointments,
  pages,
  onArchive,
  onComplete,
  waiting,
  onAddBusinessNotes,
  currentPage,
  setCurrentPage,
}) {
  console.log(pages, 'pagesssssss');
  const history = useHistory();
  const componentRef = useRef();
  const ref = useRef();
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  return (
    <Div padding={20} wd>
      <Div display="flex" justifyContent="space-between">
        <ReactToPrint
          trigger={() => (
            <CRButton primary mb={20}>
              Print
            </CRButton>
          )}
          content={() => ref.current}
        />
      </Div>
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
        <CRTable.CRColumn flexGrow={1.5}>
          <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patient }) => (
              <CRTable.CRCellStyled bold>{patient.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={1.5}>
          <CRTable.CRHeaderCell>Phone</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patient }) => (
              <CRTable.CRCellStyled>{patient.phoneNo}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn flexGrow={2}>
          <CRTable.CRHeaderCell>Type</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ type, session }) => (
              <CRTable.CRCellStyled>
                {type === 'Session' ? 'S ' : type}{' '}
                {type === 'Session' ? session?.name : ''}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={0.8}>
          <CRTable.CRHeaderCell>Doctor</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ doctor }) => (
              <CRTable.CRCellStyled>{doctor?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn flexGrow={0.8}>
          <CRTable.CRHeaderCell>Creator</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ user }) => (
              <CRTable.CRCellStyled>{user?.name}</CRTable.CRCellStyled>
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
        <CRTable.CRColumn flexGrow={6}>
          <CRTable.CRHeaderCell>Actions</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {appointment => (
              <Div display="flex">
                {(isScheduled(appointment) || isWaiting(appointment)) && (
                  <>
                    <Can I="Acc" an="Appointment">
                      {appointment.accounted ? (
                        <CRButton
                          variant="success"
                          mr={1}
                          onClick={e => {
                            e.stopPropagation();
                            onArchive(appointment);
                          }}
                          width={70}
                        >
                          ACC
                        </CRButton>
                      ) : (
                        <CRButton
                          variant="primary"
                          mr={1}
                          onClick={e => {
                            e.stopPropagation();
                            onArchive(appointment);
                          }}
                          width={70}
                        >
                          ACC
                        </CRButton>
                      )}
                    </Can>
                    <Can I="Archive" an="Appointment">
                      <CRButton
                        variant="primary"
                        mr={1}
                        onClick={e => {
                          e.stopPropagation();
                          onComplete(appointment);
                        }}
                      >
                        Archive
                      </CRButton>
                    </Can>
                  </>
                )}
                <CRButton
                  variant="primary"
                  onClick={e => {
                    e.stopPropagation();
                    onAddBusinessNotes(appointment);
                  }}
                  width={70}
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
      <CRTable.CRPagination
        lengthMenu={[
          {
            value: 10,
            label: 10,
          },
          {
            value: 20,
            label: 20,
          },
        ]}
        activePage={currentPage?.activePage}
        pages={pages}
        onSelect={handleSelect}
        total={appointments.length}
      />
      <Div style={{ overflow: 'hidden', height: '0px' }}>
        <Div ref={ref} mt={20} mr={10}>
          <CRTable autoHeight data={appointments} width={1000}>
            <CRTable.CRColumn flexGrow={0.2}>
              <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ date }, indx) => (
                  <CRTable.CRCellStyled>{indx + 1}</CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>
            <CRTable.CRColumn flexGrow={0.5}>
              <CRTable.CRHeaderCell>Time</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ date }) => (
                  <CRTable.CRCellStyled>
                    {waiting ? '' : formatDate(date, FULL_DATE_FORMAT)}
                  </CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>
            <CRTable.CRColumn flexGrow={0.5}>
              <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ date }) => (
                  <CRTable.CRCellStyled>
                    {formatDate(date, STANDARD_DATE_FORMAT)}
                  </CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>
            <CRTable.CRColumn flexGrow={0.7}>
              <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ patient }) => (
                  <CRTable.CRCellStyled bold>
                    {patient.name}
                  </CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>

            <CRTable.CRColumn flexGrow={0.7}>
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
            <CRTable.CRColumn flexGrow={0.7}>
              <CRTable.CRHeaderCell>Doctor</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ doctor }) => (
                  <CRTable.CRCellStyled>{doctor.name}</CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>
            <CRTable.CRColumn flexGrow={0.8}>
              <CRTable.CRHeaderCell>Creator</CRTable.CRHeaderCell>
              <CRTable.CRCell>
                {({ user }) => (
                  <CRTable.CRCellStyled>{user.name}</CRTable.CRCellStyled>
                )}
              </CRTable.CRCell>
            </CRTable.CRColumn>
            <CRTable.CRColumn flexGrow={0.5}>
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
          </CRTable>
        </Div>
      </Div>
    </Div>
  );
}

export default ListAppointments;
