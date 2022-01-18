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
import {
  Tooltip,
  Whisper,
  Dropdown,
  Popover,
  IconButton,
  Divider,
} from 'rsuite';
import { isScheduled, isWaiting } from 'services/appointment';
import { canAjdust } from 'services/appointment';
import { Can } from 'components/user/can';
import { PrintOLIcon, MoreIcon } from 'components/icons';
import { formatDate } from 'utils/date';
import { Table } from 'rsuite';
import { FULL_DATE_FORMAT, STANDARD_DATE_FORMAT } from 'utils/constants';

const renderMenu = (
  { onClose, left, top, className, appointment, ...props },
  ref
) => {
  console.log(appointment, 'HAMASA');
  const handleSelect = eventKey => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item eventKey={3}>
          <CRButton
            variant="success"
            mr={1}
            // onClick={e => {
            //   e.stopPropagation();
            //   onArchive(appointment);
            // }}
            width={70}
          >
            ACC
          </CRButton>
        </Dropdown.Item>
        <Dropdown.Item eventKey={4}>
          <Can I="Archive" an="Appointment">
            <CRButton
              variant="primary"
              mr={1}
              // onClick={e => {
              //   e.stopPropagation();
              //   onComplete(appointment);
              // }}
            >
              Archive
            </CRButton>
          </Can>
        </Dropdown.Item>
        <Dropdown.Item eventKey={5}>
          <Whisper
            placement="top"
            controlId="control-id-hover"
            trigger="hover"
            speaker={<Tooltip>{appointment?.businessNotes}</Tooltip>}
          >
            <CRButton
              variant="primary"
              // onClick={e => {
              //   e.stopPropagation();
              //   onAddBusinessNotes(appointment);
              // }}
              width={70}
            >
              Notes
            </CRButton>
          </Whisper>
        </Dropdown.Item>
        <Dropdown.Item eventKey={6}>
          <CRButton
            variant="primary"
            // onClick={e => {
            //   e.stopPropagation();
            //   onDuplicateAppointments(appointment);
            // }}
            width={70}
            ml={1}
          >
            Duplicates
          </CRButton>
        </Dropdown.Item>
        <Dropdown.Item eventKey={7}>
          <Div onClick={e => e.stopPropagation()}>
            <ReactToPrint
              trigger={() => <PrintOLIcon ml={2} />}
              // content={() => componentRef.current}
            />
            <Div display="none">
              <AppointmentPrintout
                // ref={componentRef}
                appointment={appointment}
                patient={appointment?.patient}
              />
            </Div>
          </Div>
        </Dropdown.Item>
        {/* <Dropdown.Item eventKey={7}>
          <Div onClick={e => e.stopPropagation()}>
            {canAjdust(appointment) && (
              <AdjustAppointment appointment={appointment} />
            )}
          </Div>
        </Dropdown.Item> */}
      </Dropdown.Menu>
    </Popover>
  );
};
const ActionCell = ({ rowData, dataKey, ...rest }) => {
  function handleAction() {
    alert(`id:${rowData[dataKey]}`);
  }
  console.log(rest, 'APAACTION');
  return (
    <Div
      {...rest}
      className="link-group"
      onClick={e => {
        e.stopPropagation();
      }}
    >
      {/* <IconButton appearance="subtle" onClick={handleAction} />
      <Divider vertical /> */}
      <Whisper
        {...rest}
        placement="autoVerticalStart"
        trigger="click"
        speaker={renderMenu}
      >
        {/* <IconButton appearance="subtle" icon={<MoreIcon />} /> */}
        <MoreIcon width="25px" height="25px" />
      </Whisper>
    </Div>
  );
};

function ListAppointments({
  appointments,
  pages,
  onArchive,
  onComplete,
  waiting,
  onAddBusinessNotes,
  onDuplicateAppointments,
  currentPage,
  setCurrentPage,
  close,
}) {
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
        affixHorizontalScrollbar
      >
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }, indx) => (
              <CRTable.CRCellStyled>{indx + 1}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Time</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled>
                {waiting ? '' : formatDate(date, FULL_DATE_FORMAT)}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Date</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled>
                {formatDate(date, STANDARD_DATE_FORMAT)}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Name</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patient }) => (
              <CRTable.CRCellStyled bold>{patient.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Phone</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patient }) => (
              <CRTable.CRCellStyled>{patient.phoneNo}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn width={150}>
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
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Doctor</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ doctor }) => (
              <CRTable.CRCellStyled>{doctor?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Creator</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ user }) => (
              <CRTable.CRCellStyled>{user?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Specialty</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ specialty }) => (
              <CRTable.CRCellStyled>{specialty?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Branch</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ branch }) => (
              <CRTable.CRCellStyled>{branch?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={550}>
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

                <Whisper
                  placement="top"
                  controlId="control-id-hover"
                  trigger="hover"
                  speaker={
                    <Tooltip>
                      {appointment?.businessNotes.length > 0
                        ? appointment?.businessNotes
                        : 'No Notes'}
                    </Tooltip>
                  }
                >
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
                </Whisper>
                <CRButton
                  variant="primary"
                  onClick={e => {
                    e.stopPropagation();
                    onDuplicateAppointments(appointment);
                  }}
                  width={70}
                  ml={1}
                >
                  Duplicates
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

        {/* <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Action</CRTable.CRHeaderCell>

          
        </CRTable.CRColumn> */}

        {/* <Table.Column width={200}>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.Cell>
            {appointment => <ActionCell appointment={appointment} />}
          </Table.Cell>
        </Table.Column> */}
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
