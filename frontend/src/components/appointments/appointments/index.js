import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Filter from './filter';
import { Nav, Schema } from 'rsuite';
import * as R from 'ramda';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useAppointments, useModal, useBranchTree } from 'hooks';
import { getName } from 'services/accounting';
import BusinessNotes from '../today-appointments/business-notes';
import ArchiveAppointment from '../archive-appointment';
import CompleteAppointment from '../complete-appointment';
import ListAppointments from './../today-appointments/list-appointments';
import NewAppointment from 'components/appointments/new-appointment';
import EditAppointment from 'components/appointments/edit-appointment';
import CancelAppointment from 'components/appointments/cancel-appointment';
import { ACTIONS, APPT_STATUS } from 'utils/constants';
import { BranchSpecialtyUserFilter } from 'components';
import { useQuery } from '@apollo/client';
import { GET_INVOICE_COUNTER } from 'apollo-client/queries';
const initialBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
};

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
export const companyInital = {
  companyId: null,
  cardId: '',
  cardExpiryDate: null,
  paymentMethod: 'cash',
  bankId: null,
};

function Appointments() {
  const [formValue, setFormValue] = useState({
    date: [],
    patient: '',
    status: 'Scheduled',
  });
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const [filter, setFilter] = useState(initialBranchValue);
  const page = currentPage?.activePage;
  const [notes, setNotes] = useState(initialValue);
  const [appointment, setAppointment] = useState(null);
  const [popUp, setPopUp] = useState('');
  const [followUp, setFollowUp] = useState(false);
  const { data: organizationData } = useQuery(GET_INVOICE_COUNTER, {
    fetchPolicy: 'network-only',
  });
  const organization = useMemo(
    () => R.propOr({}, 'myInvoiceCounter')(organizationData),
    [organizationData]
  );
  const followUpFeature = R.propOr(false, 'followUp')(organization);
  const { t } = useTranslation();
  const { visible, close, open } = useModal({});
  const [company, setCompany] = useState(companyInital);

  const {
    appointments,
    // filterBranches,
    archive,
    complete,
    updateNotes,
    adjust,
    cancel,
    pages,
    confirmedAppointment,
    archiveReferedDoctorAppointment,
  } = useAppointments({
    page,
    dateFrom: R.pathOr(null, ['date', 0])(formValue),
    dateTo: R.pathOr(null, ['date', 1])(formValue),
    status: R.propOr(null, 'status')(formValue),
    type: R.propOr(null, 'type')(formValue),
    patient: R.propOr('', 'patient')(formValue),
    action: ACTIONS.List_Appointment,
    branchId: filter?.branch,
    specialtyId: filter?.specialty,
    doctorId: filter?.doctor,
    setAppointment,
    onArchive: () => {
      setCompany(companyInital);
      setPopUp(null);
      close();
    },
  });
  const { filterBranches } = useBranchTree({
    action: ACTIONS.List_Appointment,
  });
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
  const onConfirmed = useCallback(
    ({ id }) => {
      confirmedAppointment({ variables: { id: id } });
    },
    [confirmedAppointment]
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
            patientFees: session?.patientFees || 0,
            feesCalType: session?.type,
            cost: session?.cost,
            companyId: session?.companyId,
          })),
          items: items.map(({ itemId, quantity }) => ({
            itemId,
            quantity,
          })),
          discount: {
            name: `discount-${appointment.patient.name}`,
            amount: discount,
          },
          others: {
            name: 'others - ' + othersName + ' - ' + appointment.patient.name,
            amount: others,
            othersName: othersName,
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
    [appointment, archive]
  );
  const addBusinessNotes = useCallback(() => {
    close();
    updateNotes({
      variables: {
        id: appointment.id,
        notes: notes.businessNotes,
      },
    });
  }, [appointment, updateNotes, notes, close]);
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
    [adjust, appointment, close]
  );
  const handleCancel = useCallback(() => {
    close();
    cancel({ variables: { id: appointment.id } });
  }, [cancel, appointment, close]);
  const onFollowUpAppointments = useCallback(
    appointment => {
      setFollowUp(true);
      setPopUp('followUpAppointment');
      setAppointment(appointment);
      open();
    },
    [setAppointment, setFollowUp, setPopUp, open]
  );
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

  useEffect(() => {
    setCurrentPage(inialCurrentPage);
  }, [filter, formValue]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <>
      <h1 className="text-2xl mb-4">{t('appointments')}</h1>
      <Nav
        activeKey={activeIndex}
        onSelect={i => {
          setActiveIndex(i);
          setFormValue({ ...formValue, status: tabVsStatus.get(i) });
        }}
        appearance="tabs"
        justified
        className="text-center max-w-5xl mb-5"
      >
        <Nav.Item eventKey={0}>{t('mainAppointments')}</Nav.Item>
        <Nav.Item eventKey={1}>{t('waitingAppointments')}</Nav.Item>
        <Nav.Item eventKey={2}>{t('completedAppointments')}</Nav.Item>
      </Nav>

      {activeIndex === 0 && (
        <>
          <BranchSpecialtyUserFilter
            formValue={filter}
            onChange={setFilter}
            branches={filterBranches}
            cleanable
          />
          <Filter formValue={formValue} onChange={setFormValue} />
          <ListAppointments
            appointments={appointments}
            onArchive={onClickDone}
            onComplete={onCompleteDone}
            onAddBusinessNotes={onAddBusinessNotes}
            onDuplicateAppointments={onDuplicateAppointments}
            onEditAppointments={onEditAppointments}
            onCancelAppointments={onCancelAppointments}
            onConfirmed={onConfirmed}
            defaultExpanded={true}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
            followUpFeature={followUpFeature}
            onFollowUpAppointments={onFollowUpAppointments}
          />
        </>
      )}
      {activeIndex === 1 && (
        <>
          <BranchSpecialtyUserFilter
            formValue={filter}
            onChange={setFilter}
            branches={filterBranches}
          />
          <Filter formValue={formValue} onChange={setFormValue} />
          <ListAppointments
            appointments={appointments}
            onArchive={onClickDone}
            onComplete={onCompleteDone}
            onAddBusinessNotes={onAddBusinessNotes}
            onDuplicateAppointments={onDuplicateAppointments}
            onEditAppointments={onEditAppointments}
            onCancelAppointments={onCancelAppointments}
            onConfirmed={onConfirmed}
            defaultExpanded={true}
            waiting={true}
            followUpFeature={followUpFeature}
            onFollowUpAppointments={onFollowUpAppointments}
          />
        </>
      )}
      {activeIndex === 2 && (
        <>
          <BranchSpecialtyUserFilter
            formValue={filter}
            onChange={setFilter}
            branches={filterBranches}
          />
          <Filter formValue={formValue} onChange={setFormValue} />
          <ListAppointments
            appointments={appointments}
            onArchive={onClickDone}
            onComplete={onCompleteDone}
            onAddBusinessNotes={onAddBusinessNotes}
            defaultExpanded={true}
            waiting={true}
          />
        </>
      )}

      {popUp === 'archive' && (
        <ArchiveAppointment
          appointment={appointment}
          show={visible}
          onCancel={close}
          onOk={handleArchive}
          company={company}
          setCompany={setCompany}
          archiveReferedDoctorAppointment={archiveReferedDoctorAppointment}
        />
      )}
      {popUp === 'complete' && (
        <CompleteAppointment
          appointment={appointment}
          show={visible}
          onCancel={close}
          onOk={handleComplete}
          t={t}
        />
      )}
      {popUp === 'notes' && (
        <BusinessNotes
          appointment={appointment}
          show={visible}
          onCancel={close}
          t={t}
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
          t={t}
        />
      )}
      {popUp === 'cancelAppointment' && (
        <CancelAppointment
          onOk={handleCancel}
          show={visible}
          onCancel={close}
          appointment={appointment}
          t={t}
        />
      )}
      {popUp === 'followUpAppointment' && (
        <NewAppointment
          show={visible}
          onHide={close}
          appointment={appointment}
          followUp={followUp}
          setFollowUp={setFollowUp}
        />
      )}
    </>
  );
}

export default Appointments;
