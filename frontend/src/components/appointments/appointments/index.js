import React, { useState, useEffect, useCallback } from 'react';
import { Div, H3, CRTabs } from 'components';
import Filter from './filter';
import BranchFilter from '../../filters';
import * as R from 'ramda';
import moment from 'moment';
import { useAppointments, useModal } from 'hooks';
import { getName } from 'services/accounting';
import BusinessNotes from '../today-appointments/business-notes';
import ArchiveAppointment from '../archive-appointment';
import CompleteAppointment from '../complete-appointment';
import ListAppointments from './../today-appointments/list-appointments';
import NewAppointment from 'components/appointments/new-appointment';
import EditAppointment from 'components/appointments/edit-appointment';
import CancelAppointment from 'components/appointments/cancel-appointment';
import { ACTIONS, APPT_STATUS } from 'utils/constants';
const calcDate = ({ date, time }) =>
  moment(date)
    .set({
      hour: moment(time).get('hour'),
      minute: moment(time).get('minute'),
      second: 0,
      millisecond: 0,
    })
    .toDate();
const inialCurrentPage = {
  activePage: 1,
};
const initialValue = {
  businessNotes: '',
};
const tabVsStatus = new Map([
  [0, APPT_STATUS.SCHEDULED],
  [1, APPT_STATUS.WAITING],
  [2, APPT_STATUS.ARCHIVED],
]);
function Appointments() {
  const [formValue, setFormValue] = useState({
    date: [],
    patient: '',
    status: 'Scheduled',
  });
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const page = currentPage?.activePage;
  const [notes, setNotes] = useState(initialValue);
  const { visible, close, open } = useModal({});
  const {
    appointments,
    appointmentsCountNumber,
    refetchAppointments,
    filterBranches,
    archive,
    complete,
    updateNotes,
    adjust,
    cancel,
  } = useAppointments({
    page,
    dateFrom: R.pathOr(null, ['date', 0])(formValue),
    dateTo: R.pathOr(null, ['date', 1])(formValue),
    status: R.propOr(null, 'status')(formValue),
    type: R.propOr(null, 'type')(formValue),
    patient: R.propOr('', 'patient')(formValue),
    action: ACTIONS.List_Appointment,
  });
  const pages = Math.ceil(appointmentsCountNumber / 20);
  const [popUp, setPopUp] = useState('');
  const [appointment, setAppointment] = useState(null);
  const onClickDone = useCallback(
    appointment => {
      setAppointment(appointment);
      setPopUp('archive');
      open();
    },
    [open]
  );
  const onCompleteDone = useCallback(
    appointment => {
      setAppointment(appointment);
      setPopUp('complete');
      open();
    },
    [open]
  );
  const onAddBusinessNotes = useCallback(
    appointment => {
      setPopUp('notes');
      setAppointment(appointment);
      open();
    },
    [open]
  );
  const onDuplicateAppointments = useCallback(
    appointment => {
      setPopUp('newAppointment');
      setAppointment(appointment);
      open();
    },
    [open]
  );
  const onEditAppointments = useCallback(
    appointment => {
      setPopUp('editAppointment');
      setAppointment(appointment);
      open();
    },
    [open]
  );
  const onCancelAppointments = useCallback(
    appointment => {
      setPopUp('cancelAppointment');
      setAppointment(appointment);
      open();
    },
    [open]
  );

  const handleArchive = useCallback(
    ({
      sessions,
      items,
      discount,
      others,
      remaining,
      payOfRemaining,
      bank,
      company,
      option,
      appPrice,
      othersName,
      coupons,
      couponsValue,
      doctorFees,
    }) => {
      close();
      archive({
        variables: {
          id: appointment.id,
          specialtyId: appointment?.specialty.id,
          userId: appointment?.doctor.id,
          branchId: appointment?.branch.id,
          date: appointment.date,
          sessions: sessions.map(session => ({
            name: getName({ session, appointment }),
            price: session.price,
            number: session.number,
            id: session.id,
          })),
          items: items.map(({ itemId, quantity }) => ({
            itemId,
            quantity,
          })),
          discount: {
            name: 'discount' + ' - ' + appointment.patient.name,
            amount: discount,
          },
          others: {
            name: 'others - ' + othersName + ' - ' + appointment.patient.name,
            amount: others,
          },
          remaining: remaining,
          payOfRemaining: payOfRemaining,
          patientName: appointment.patient.name,
          patientId: appointment.patient.id,
          bank,
          appPrice,
          company,
          option,
          coupons,
          couponsValue,
          doctorFees: doctorFees,
        },
      });
    },
    [appointment, archive, close]
  );
  const addBusinessNotes = useCallback(() => {
    close();
    updateNotes({
      variables: {
        id: appointment.id,
        notes: notes.businessNotes,
      },
    });
  }, [appointment, updateNotes, notes]);
  const handleEdit = useCallback(
    formValue => {
      close();
      adjust({
        variables: {
          id: appointment.id,
          date: calcDate(formValue),
          branchId: formValue.branchId,
          specialtyId: formValue.specialtyId,
          userId: formValue.userId,
        },
      });
    },
    [adjust, appointment]
  );
  const handleCancel = useCallback(() => {
    close();
    cancel({ variables: { id: appointment.id } });
  }, [cancel, appointment]);
  const handleComplete = useCallback(
    ({ appointment }) => {
      close();
      complete({
        variables: {
          id: appointment.id,
        },
      });
    },
    [appointment, complete, close]
  );
  useEffect(() => {
    setNotes(val => ({
      businessNotes: R.propOr('', 'businessNotes')(appointment),
    }));
  }, [appointment]);
  return (
    <>
      <H3 mb={64}>Appointments</H3>
      <Div mb={4}>
        <CRTabs
          onChange={index =>
            setFormValue({ ...formValue, status: tabVsStatus.get(index) })
          }
        >
          <CRTabs.CRTabsGroup>
            <CRTabs.CRTab>Main Appointments</CRTabs.CRTab>
            <CRTabs.CRTab>Waiting Appointments</CRTabs.CRTab>
            <CRTabs.CRTab>Completed Appointments</CRTabs.CRTab>
          </CRTabs.CRTabsGroup>
          <CRTabs.CRContentGroup>
            <CRTabs.CRContent>
              <BranchFilter
                appointments={appointments}
                branches={filterBranches}
                render={apps => (
                  <>
                    <Filter formValue={formValue} onChange={setFormValue} />
                    <ListAppointments
                      appointments={apps}
                      onArchive={onClickDone}
                      onComplete={onCompleteDone}
                      onAddBusinessNotes={onAddBusinessNotes}
                      onDuplicateAppointments={onDuplicateAppointments}
                      onEditAppointments={onEditAppointments}
                      onCancelAppointments={onCancelAppointments}
                      defaultExpanded={true}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pages={pages}
                    />
                  </>
                )}
              />
            </CRTabs.CRContent>
            <CRTabs.CRContent>
              <BranchFilter
                appointments={appointments}
                branches={filterBranches}
                render={apps => (
                  <>
                    <Filter formValue={formValue} onChange={setFormValue} />
                    <ListAppointments
                      appointments={apps}
                      onArchive={onClickDone}
                      onComplete={onCompleteDone}
                      onAddBusinessNotes={onAddBusinessNotes}
                      defaultExpanded={true}
                      waiting={true}
                    />
                  </>
                )}
              />
            </CRTabs.CRContent>
            <CRTabs.CRContent>
              <BranchFilter
                appointments={appointments}
                branches={filterBranches}
                render={apps => (
                  <>
                    <Filter formValue={formValue} onChange={setFormValue} />
                    <ListAppointments
                      appointments={apps}
                      onArchive={onClickDone}
                      onComplete={onCompleteDone}
                      onAddBusinessNotes={onAddBusinessNotes}
                      defaultExpanded={true}
                      waiting={true}
                    />
                  </>
                )}
              />
            </CRTabs.CRContent>
          </CRTabs.CRContentGroup>
        </CRTabs>
      </Div>
      {popUp === 'archive' && (
        <ArchiveAppointment
          appointment={appointment}
          show={visible}
          onCancel={close}
          onOk={handleArchive}
        />
      )}
      {popUp === 'complete' && (
        <CompleteAppointment
          appointment={appointment}
          show={visible}
          onCancel={close}
          onOk={handleComplete}
        />
      )}
      {popUp === 'notes' && (
        <BusinessNotes
          appointment={appointment}
          show={visible}
          onCancel={close}
          notes={notes}
          setNotes={setNotes}
          onOk={addBusinessNotes}
        />
      )}
      {popUp === 'newAppointment' && (
        <NewAppointment
          show={visible}
          onHide={close}
          appointment={appointment}
        />
      )}
      {popUp === 'editAppointment' && (
        <EditAppointment
          onOk={handleEdit}
          show={visible}
          onCancel={close}
          appointment={appointment}
        />
      )}
      {popUp === 'cancelAppointment' && (
        <CancelAppointment
          onOk={handleCancel}
          show={visible}
          onCancel={close}
          appointment={appointment}
        />
      )}
    </>
  );
}

export default Appointments;
