import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { AppointmentPrintout, Div, CRButton, CRTable } from 'components';
import { Tooltip, Whisper, Dropdown, Popover } from 'rsuite';
import { canAjdust } from 'services/appointment';
import { Can } from 'components/user/can';
import { MoreIcon } from 'components/icons';
import { formatDate } from 'utils/date';
import { Table } from 'rsuite';
import {
  FULL_DATE_FORMAT,
  STANDARD_DATE_FORMAT,
  FULL_DAY_FORMAT,
} from 'utils/constants';
import { useTranslation } from 'react-i18next';

const ActionCell = ({ rowData, dataKey, ...rest }) => {
  const { t } = useTranslation();
  const {
    appointment,
    onComplete,
    onDuplicateAppointments,
    onEditAppointments,
    onCancelAppointments,
    onFollowUpAppointments,
    followUpFeature,
  } = rest;

  return (
    <Div
      className="link-group"
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Whisper
        appointment={appointment}
        placement="autoVerticalStart"
        trigger="click"
        speaker={
          <Popover full>
            <Dropdown.Menu>
              {/* <Dropdown.Item eventKey={3}>
                <Can I="Acc" an="Appointment">
                  {appointment.accounted ? (
                    <CRButton
                      variant="success"
                      mr={1}
                      onClick={e => {
                        e.stopPropagation();
                        onArchive(appointment);
                      }}
                      style={{ width: '108px' }}
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
                      style={{ width: '108px' }}
                    >
                      ACC
                    </CRButton>
                  )}
                </Can>
              </Dropdown.Item> */}
              <Dropdown.Item eventKey={4}>
                <Can I="Archive" an="Appointment">
                  <CRButton
                    variant="primary"
                    mr={1}
                    onClick={e => {
                      e.stopPropagation();
                      onComplete(appointment);
                    }}
                    style={{ width: '108px' }}
                  >
                    {t('archive')}
                  </CRButton>
                </Can>
              </Dropdown.Item>
              {/* <Dropdown.Item eventKey={5}>
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
                    style={{ width: '108px' }}
                  >
                    Notes
                  </CRButton>
                </Whisper>
              </Dropdown.Item> */}
              <Dropdown.Item eventKey={6}>
                <Can I="Create" an="Appointment">
                  <CRButton
                    variant="primary"
                    onClick={e => {
                      e.stopPropagation();
                      onDuplicateAppointments(appointment);
                    }}
                    style={{ width: '108px' }}
                  >
                    {t('duplicates')}
                  </CRButton>
                </Can>
              </Dropdown.Item>
              <Dropdown.Item eventKey={8}>
                {canAjdust(appointment) && (
                  <Div>
                    <Can I="Reschedule" an="Appointment">
                      <CRButton
                        variant="primary"
                        onClick={e => {
                          e.stopPropagation();
                          onEditAppointments(appointment);
                        }}
                        style={{ width: '108px' }}
                      >
                        {t('edit')}
                      </CRButton>
                    </Can>
                    {/* {canAjdust(appointment) && (
                      <AdjustAppointment appointment={appointment} />
                    )} */}
                  </Div>
                )}
              </Dropdown.Item>
              {followUpFeature && (
                <Dropdown.Item eventKey={9}>
                  <Div>
                    <CRButton
                      variant="primary"
                      onClick={e => {
                        e.stopPropagation();
                        onFollowUpAppointments(appointment);
                      }}
                      style={{ width: '108px' }}
                    >
                      {t('followUp')}
                    </CRButton>
                  </Div>
                </Dropdown.Item>
              )}

              <Dropdown.Item eventKey={10}>
                {canAjdust(appointment) && (
                  <Div>
                    <Can I="Cancel" an="Appointment">
                      <CRButton
                        variant="primary"
                        onClick={e => {
                          e.stopPropagation();
                          onCancelAppointments(appointment);
                        }}
                        style={{ width: '108px' }}
                      >
                        {t('cancel')}
                      </CRButton>
                    </Can>
                  </Div>
                )}
              </Dropdown.Item>
              <Dropdown.Item eventKey={7}>
                <Div onClick={e => e.stopPropagation()}>
                  {/* <ReactToPrint
                    trigger={() => <PrintOLIcon ml={2} />}
                    // content={() => componentRef.current}
                  /> */}
                  <CRButton
                    variant="primary"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    style={{ width: '108px' }}
                  >
                    {t('print')}
                  </CRButton>
                  <Div display="none">
                    <AppointmentPrintout
                      // ref={componentRef}
                      appointment={appointment}
                      patient={appointment?.patient}
                    />
                  </Div>
                </Div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Popover>
        }
      >
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
  onEditAppointments,
  onCancelAppointments,
  onFollowUpAppointments,
  currentPage,
  setCurrentPage,
  close,
  followUpFeature,
}) {
  const history = useHistory();
  const ref = useRef();
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );
  const { t } = useTranslation();
  return (
    <Div padding={20} wd>
      <Div display="flex" justifyContent="space-between">
        <ReactToPrint
          trigger={() => (
            <CRButton primary mb={20}>
              {t('print')}
            </CRButton>
          )}
          content={() => ref.current}
        />
      </Div>
      <CRTable
        data={appointments}
        onRowClick={appointment => {
          history.push(
            `/patients/${appointment.patient.id}?appointmentId=${appointment.id}`
          );
        }}
        affixHorizontalScrollbar
        style={{ direction: 'ltr' }}
      >
        <CRTable.CRColumn width={30}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }, indx) => (
              <CRTable.CRCellStyled>{indx + 1}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={130}>
          <CRTable.CRHeaderCell>{t('time')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }) => (
              <CRTable.CRCellStyled>
                {waiting
                  ? formatDate(date, STANDARD_DATE_FORMAT)
                  : formatDate(date, FULL_DAY_FORMAT)}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={200}>
          <CRTable.CRHeaderCell>{t('patient')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patient, subscriptionType }) => (
              <Whisper
                placement="top"
                controlId="control-id-hover"
                trigger="hover"
                speaker={
                  <Tooltip>
                    <Div>
                      <Div>
                        {t('phoneNo')}:{patient.phoneNo}
                      </Div>
                      <Div>
                        {t('code')}:{patient.code}
                      </Div>
                      <Div>
                        {t('subscriptionType')}: {'  '}
                        {subscriptionType}
                      </Div>
                    </Div>
                  </Tooltip>
                }
              >
                <CRTable.CRCellStyled bold>{patient.name}</CRTable.CRCellStyled>
              </Whisper>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn width={200}>
          <CRTable.CRHeaderCell>{t('type')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ type, session }) => (
              <CRTable.CRCellStyled>
                {type === 'Session' ? 'S ' : type}{' '}
                {type === 'Session' ? session?.name : ''}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={50}>
          <CRTable.CRHeaderCell>{t('reference')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ reference }) => (
              <CRTable.CRCellStyled>
                <Div fontWeight="Bold">{reference}</Div>
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={120}>
          <CRTable.CRHeaderCell>{t('doctor')}</CRTable.CRHeaderCell>
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
        <CRTable.CRColumn width={120}>
          <CRTable.CRHeaderCell>{t('specialty')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ specialty }) => (
              <CRTable.CRCellStyled>{specialty?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={120}>
          <CRTable.CRHeaderCell>{t('branch')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ branch }) => (
              <CRTable.CRCellStyled>{branch?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        {/* <CRTable.CRColumn width={550}>
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
        </CRTable.CRColumn> */}

        {/* <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Action</CRTable.CRHeaderCell>

          
        </CRTable.CRColumn> */}
        <CRTable.CRColumn width={80}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {appointment => (
              <Can I="Acc" an="Appointment">
                {appointment.accounted ? (
                  <CRButton
                    variant="success"
                    onClick={e => {
                      e.stopPropagation();
                      onArchive(appointment);
                    }}
                    block
                  >
                    {t('acc')}
                  </CRButton>
                ) : (
                  <CRButton
                    variant="primary"
                    onClick={e => {
                      e.stopPropagation();
                      onArchive(appointment);
                    }}
                    block
                  >
                    {t('acc')}
                  </CRButton>
                )}
              </Can>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={80}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {appointment => (
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
                  block
                >
                  {t('notes')}
                </CRButton>
              </Whisper>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <Table.Column>
          <Table.HeaderCell>{t('actions')}</Table.HeaderCell>
          <Table.Cell>
            {appointment => (
              <ActionCell
                appointment={appointment}
                onArchive={onArchive}
                onComplete={onComplete}
                onAddBusinessNotes={onAddBusinessNotes}
                onDuplicateAppointments={onDuplicateAppointments}
                onEditAppointments={onEditAppointments}
                onCancelAppointments={onCancelAppointments}
                onFollowUpAppointments={onFollowUpAppointments}
                followUpFeature={followUpFeature}
              />
            )}
          </Table.Cell>
        </Table.Column>
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
