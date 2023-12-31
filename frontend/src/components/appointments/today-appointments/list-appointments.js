import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AppointmentPrintout,
  Div,
  CRButton,
  CRTable,
  CRSelectInput,
} from 'components';
import {
  Tooltip,
  Whisper,
  Dropdown,
  Popover,
  Checkbox,
  Table,
  Form,
} from 'rsuite';
import { canAjdust } from 'services/appointment';
import { Can } from 'components/user/can';
import { MoreIcon } from 'components/icons';
import { formatDate, addMinutesToDateAndReturnTime } from 'utils/date';
import {
  STANDARD_DATE_FORMAT,
  FULL_DAY_FORMAT,
  FULL_DATE_FORMAT,
} from 'utils/constants';
import { useTranslation } from 'react-i18next';
const { Cell } = Table;
const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0, top: '-2px' }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys?.some(item => item === rowData[dataKey])}
        style={{ marginLeft: 0 }}
      />
    </div>
  </Cell>
);

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
                  </Div>
                )}
              </Dropdown.Item>
              {followUpFeature && appointment?.canAddFollowUp && (
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
  active,
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
  onConfirmed,
  followUpFeature,
  checkedKeys,
  setCheckedKeys,
  doctors,
  transferDoctor,
  setTransferDoctor,
  transferAppsAction,
  children,
  handlePrint,
  pageSize = 20,
}) {
  const history = useHistory();
  const { t } = useTranslation();
  let checked = false;
  let indeterminate = false;
  if (checkedKeys?.length === appointments?.length) {
    checked = true;
  } else if (checkedKeys?.length === 0) {
    checked = false;
  } else if (
    checkedKeys?.length > 0 &&
    checkedKeys?.length < appointments?.length
  ) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? appointments.map(item => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter(item => item !== value);
    setCheckedKeys(keys);
  };
  const handleSelect = useCallback(
    eventKey => {
      setCurrentPage({ activePage: eventKey });
    },
    [setCurrentPage]
  );

  return (
    <Div padding={20} wd>
      <Div display="flex">
        <CRButton onClick={handlePrint}>Print</CRButton>
        <CRButton onClick={transferAppsAction} ml="10px">
          Transfer
        </CRButton>
        <Form formValue={transferDoctor} onChange={setTransferDoctor}>
          <CRSelectInput
            name="doctorId"
            placeholder={t('select')}
            block
            data={doctors}
            style={{ width: '100px', marginLeft: '10px', marginTop: '-10px' }}
          />
        </Form>
        {children}
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
        <CRTable.CRColumn width={40} align="center">
          <CRTable.CRHeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: '10px' }}>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
                style={{ marginLeft: 0 }}
              />
            </div>
          </CRTable.CRHeaderCell>
          <CheckCell
            dataKey="id"
            checkedKeys={checkedKeys}
            onChange={handleCheck}
            onClick={event => event.stopPropagation()}
          />
        </CRTable.CRColumn>
        <CRTable.CRColumn width={30}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ date }, indx) => (
              <CRTable.CRCellStyled>
                {((currentPage?.activePage || 1) - 1) * pageSize + indx + 1}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        {active !== 'Waiting' && (
          <CRTable.CRColumn width={130}>
            <CRTable.CRHeaderCell>{t('startTime')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date, session }) => (
                <CRTable.CRCellStyled>
                  {waiting
                    ? formatDate(date, STANDARD_DATE_FORMAT)
                    : formatDate(date, FULL_DAY_FORMAT)}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        )}
        {active !== 'Waiting' && (
          <CRTable.CRColumn width={70}>
            <CRTable.CRHeaderCell>{t('endTime')}</CRTable.CRHeaderCell>
            <CRTable.CRCell>
              {({ date, session }) => (
                <CRTable.CRCellStyled>
                  {addMinutesToDateAndReturnTime(date, session?.duration)}
                </CRTable.CRCellStyled>
              )}
            </CRTable.CRCell>
          </CRTable.CRColumn>
        )}
        <CRTable.CRColumn>
          <CRTable.CRHeaderCell>Creator</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ user }) => (
              <CRTable.CRCellStyled>{user?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>

        <CRTable.CRColumn width={170}>
          <CRTable.CRHeaderCell>{t('type')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ type, session, isFollowUp }) => (
              <CRTable.CRCellStyled>
                {type === 'Session' ? 'S ' : type}{' '}
                {type === 'Session' ? session?.name : ''}
                {type === 'Session' && isFollowUp ? '/Follow Up' : ''}
              </CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={200}>
          <CRTable.CRHeaderCell>{t('patient')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ patient }) => (
              <Whisper
                placement="top"
                controlId="control-id-hover"
                trigger="hover"
                delay={500}
                speaker={
                  <Tooltip>
                    <Div>
                      <Can I="ViewPhoneNo" an="Patient">
                        <Div>
                          {t('phoneNo')}:{patient.phoneNo}
                        </Div>
                      </Can>
                      <Div>
                        {t('code')}:{patient.code}
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
        <CRTable.CRColumn width={120}>
          <CRTable.CRHeaderCell>{t('doctor')}</CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {({ doctor }) => (
              <CRTable.CRCellStyled>{doctor?.name}</CRTable.CRCellStyled>
            )}
          </CRTable.CRCell>
        </CRTable.CRColumn>
        <CRTable.CRColumn width={40}>
          <CRTable.CRHeaderCell></CRTable.CRHeaderCell>
          <CRTable.CRCell>
            {appointment =>
              appointment.confirmed ? (
                <CRButton
                  variant="success"
                  onClick={e => {
                    e.stopPropagation();
                    onConfirmed(appointment);
                  }}
                  block
                  padding={10}
                >
                  {t('C')}
                </CRButton>
              ) : (
                <CRButton
                  variant="primary"
                  onClick={e => {
                    e.stopPropagation();
                    onConfirmed(appointment);
                  }}
                  block
                  padding={10}
                >
                  {t('C')}
                </CRButton>
              )
            }
          </CRTable.CRCell>
        </CRTable.CRColumn>
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
              // <Whisper
              //   placement="top"
              //   controlId="control-id-hover"
              //   trigger="hover"
              //   speaker={
              //     <Tooltip>
              //       {appointment?.businessNotes.length > 0
              //         ? appointment?.businessNotes
              //         : 'No Notes'}
              //     </Tooltip>
              //   }
              // >
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
              // </Whisper>
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
    </Div>
  );
}

export default ListAppointments;
