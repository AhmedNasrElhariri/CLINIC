import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Nav, Form } from 'rsuite';
import * as R from 'ramda';
import moment from 'moment';
import useGlobalState from 'state';
import { getPdfReport } from 'services/reports';
import { ACTIONS } from 'utils/constants';
import ListAppointments from './list-appointments';
import ArchiveAppointment from '../archive-appointment';
import { getName } from 'services/accounting';
import CompleteAppointment from '../complete-appointment';
import {
  useAppointments,
  useConfigurations,
  useModal,
  useCourses,
} from 'hooks';
import { BranchSpecialtyUserFilter, CRTextInput } from 'components';
import BusinessNotes from './business-notes';
import NewAppointment from 'components/appointments/new-appointment';
import EditAppointment from '../edit-appointment';
import CancelAppointment from '../cancel-appointment';
import { useTranslation } from 'react-i18next';
import TransferAppointments from '../transfer-apps';

const initialValue = {
  businessNotes: '',
};
const initalTransferValue = {
  doctorId: null,
};
const inialCurrentPage = {
  activePage: 1,
};
const initialBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
  patient: '',
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
const PAGE_SIZE = 30;
function TodayAppointments() {
  const [popUp, setPopUp] = useState('');
  const [followUp, setFollowUp] = useState(false);
  const [filter, setFilter] = useState(initialBranchValue);
  const [active, setActive] = React.useState('Scheduled');
  const [transferDoctor, setTransferDoctor] = useState(initalTransferValue);
  const [currentPage, setCurrentPage] = useState(inialCurrentPage);
  const [notes, setNotes] = useState(initialValue);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const { visible, close, open } = useModal({});
  const [appointment, setAppointment] = useState({});
  const { t } = useTranslation();
  const { organization } = useConfigurations({});
  const { users } = useCourses({});
  const [onCreateAppointment] = useGlobalState('onCreateAppointment');

  const doctors = useMemo(() => {
    return users.filter(u => u.position === 'Doctor');
  }, [users]);
  const followUpFeature = R.propOr(false, 'followUp')(organization);
  const {
    todayAppointments: appointments,
    filterBranches,
    archive,
    complete,
    archiveLoading: loading,
    updateNotes,
    adjust,
    cancel,
    confirmedAppointment,
    transferAppointments,
    archiveReferedDoctorAppointment,
    todayAppointmentsCount,
    refetchTodayAppointments,
  } = useAppointments({
    page: currentPage?.activePage,
    action: ACTIONS.List_Appointment,
    status: active,
    patientId: appointment?.patient?.id,
    canAddFollowUp: appointment?.canAddFollowUp,
    branchId: filter?.branch,
    specialtyId: filter?.specialty,
    doctorId: filter?.doctor,
    patient: filter?.patient,
    onAdjust: () => {},
    onArchive: () => {
      close();
    },
    setAppointment,
    setFollowUp,
    setPopUp,
    open,
    followUpFeature,
  });
  const pages = Math.ceil(todayAppointmentsCount / 30);

  useEffect(() => {
    setNotes(() => ({
      businessNotes: R.propOr('', 'businessNotes')(appointment),
    }));
  }, [appointment]);

  useEffect(() => {
    setCurrentPage(inialCurrentPage);
  }, [filter]);

  useEffect(() => {
    const id = onCreateAppointment.subscribe(() => {
      refetchTodayAppointments();
    });
    return () => onCreateAppointment.unsubscribe(id);
  }, [onCreateAppointment, refetchTodayAppointments]);

  const onClickDone = useCallback(
    appointment => {
      setAppointment(appointment);
      setPopUp('archive');
      open();
    },
    [setAppointment, open]
  );
  const onCompleteDone = useCallback(
    appointment => {
      setPopUp('complete');
      setAppointment(appointment);
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
  const onFollowUpAppointments = useCallback(
    appointment => {
      setFollowUp(true);
      setPopUp('followUpAppointment');
      setAppointment(appointment);
      open();
    },
    [setAppointment, setFollowUp, setPopUp, open]
  );
  const onConfirmed = useCallback(
    ({ id }) => {
      confirmedAppointment({ variables: { id: id } });
    },
    [confirmedAppointment]
  );
  const transferAppsAction = useCallback(() => {
    setPopUp('transferAppointments');
    open();
  }, [setPopUp, open]);
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
  const handleTransferAppointment = useCallback(() => {
    close();
    transferAppointments({
      variables: {
        transferData: {
          doctorId: transferDoctor.doctorId,
          appIds: checkedKeys,
        },
      },
    });
  }, [transferAppointments, transferDoctor, checkedKeys, close]);
  const handleComplete = useCallback(
    ({ appointment }) => {
      close();
      complete({
        variables: {
          id: appointment?.id,
        },
      });
    },
    [complete, close]
  );
  const handlePrint = useCallback(() => {
    const params = {
      status: active,
      branchId: filter?.branch,
      specialtyId: filter?.specialty,
      doctorId: filter?.doctor,
      patient: filter?.patient,
    };
    getPdfReport(
      '/todayAppointmentReport',
      params,
      'today-appointment-report.pdf'
    );
  }, [active, filter]);
  return (
    <>
      <Nav
        onSelect={setActive}
        appearance="tabs"
        justified
        className="text-center mb-5"
        activeKey={active}
      >
        <Nav.Item eventKey="Scheduled">{t('mainAppointments')}</Nav.Item>
        <Nav.Item eventKey="Waiting">{t('waitingAppointments')}</Nav.Item>
        <Nav.Item eventKey="Archived">{t('completedAppointments')}</Nav.Item>
      </Nav>
      {active === 'Scheduled' && (
        <>
          <BranchSpecialtyUserFilter
            formValue={filter}
            onChange={setFilter}
            branches={filterBranches}
            todayApp={true}
          />
          <ListAppointments
            active="Scheduled"
            title="Upcoming Appointments"
            appointments={appointments}
            onArchive={onClickDone}
            onComplete={onCompleteDone}
            onAddBusinessNotes={onAddBusinessNotes}
            onDuplicateAppointments={onDuplicateAppointments}
            onEditAppointments={onEditAppointments}
            onCancelAppointments={onCancelAppointments}
            onFollowUpAppointments={onFollowUpAppointments}
            onConfirmed={onConfirmed}
            defaultExpanded={true}
            close={close}
            followUpFeature={followUpFeature}
            checkedKeys={checkedKeys}
            setCheckedKeys={setCheckedKeys}
            doctors={doctors}
            transferDoctor={transferDoctor}
            setTransferDoctor={setTransferDoctor}
            transferAppsAction={transferAppsAction}
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handlePrint={handlePrint}
            pageSize={PAGE_SIZE}
          >
            <Form
              formValue={filter}
              onChange={setFilter}
              style={{ marginLeft: '10px', marginTop: '-10px' }}
            >
              <CRTextInput
                name="patient"
                placeholder={t('Search by name / phone No')}
              />
            </Form>
          </ListAppointments>
        </>
      )}
      {active === 'Waiting' && (
        <>
          <BranchSpecialtyUserFilter
            formValue={filter}
            onChange={setFilter}
            branches={filterBranches}
          />
          <ListAppointments
            active="Waiting"
            appointments={appointments}
            onArchive={onClickDone}
            onComplete={onCompleteDone}
            onAddBusinessNotes={onAddBusinessNotes}
            onDuplicateAppointments={onDuplicateAppointments}
            onEditAppointments={onEditAppointments}
            onCancelAppointments={onCancelAppointments}
            onFollowUpAppointments={onFollowUpAppointments}
            onConfirmed={onConfirmed}
            defaultExpanded={true}
            waiting={true}
            followUpFeature={followUpFeature}
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handlePrint={handlePrint}
            pageSize={PAGE_SIZE}
          >
            <Form
              formValue={filter}
              onChange={setFilter}
              style={{ marginLeft: '10px', marginTop: '-10px' }}
            >
              <CRTextInput
                name="patient"
                placeholder={t('Search by name / phone No')}
              />
            </Form>
          </ListAppointments>
        </>
      )}
      {active === 'Archived' && (
        <>
          <BranchSpecialtyUserFilter
            formValue={filter}
            onChange={setFilter}
            branches={filterBranches}
          />
          <ListAppointments
            active="Archived"
            title="Completed Appointments"
            appointments={appointments}
            onAddBusinessNotes={onAddBusinessNotes}
            defaultExpanded={true}
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handlePrint={handlePrint}
            pageSize={PAGE_SIZE}
          >
            <Form
              formValue={filter}
              onChange={setFilter}
              style={{ marginLeft: '10px', marginTop: '-10px' }}
            >
              <CRTextInput
                name="patient"
                placeholder={t('Search by name / phone No')}
              />
            </Form>
          </ListAppointments>
        </>
      )}
      {popUp === 'archive' && (
        <ArchiveAppointment
          appointment={appointment}
          show={visible}
          onCancel={close}
          onOk={handleArchive}
          loading={loading}
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
          notes={notes}
          setNotes={setNotes}
          onOk={addBusinessNotes}
          t={t}
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
      {popUp === 'transferAppointments' && (
        <TransferAppointments
          onOk={handleTransferAppointment}
          show={visible}
          onCancel={close}
          t={t}
        />
      )}
    </>
  );
}

export default TodayAppointments;
