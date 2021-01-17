import React, { useState, useCallback, useEffect } from 'react';
import * as moment from 'moment';
import { useMutation } from '@apollo/client';
import { Alert, Form, SelectPicker, DatePicker, Schema } from 'rsuite';

import {
  CRSelectInput,
  CRTimePicker,
  CRDatePicker,
  Div,
  H5,
  CRModal,
  NewPatient,
} from 'components';
import { CREATE_APPOINTMENT } from 'apollo-client/queries';
import { isBeforeToday } from 'utils/date';
import { isValid } from 'services/form';
import Fab from './fab';
import { ModalBodyStyled, ContainerStyled } from './style';
import useGlobalState from 'state';
import {
  sortAppointmentsByDate,
  getSpecialtiesByBranchId,
  specialtiesTypes,
  doctorsTypes,
} from 'services/appointment';

import useFetchData from './fetch-data';
import { filterPatientBy } from 'utils/patient';
import { APPT_TYPE } from 'utils/constants';
import useAppointmentForm from 'hooks/appointment-form';

import { mapArrWithIdsToChoices } from 'utils/misc';

const { StringType } = Schema.Types;

const appointmentTypes = Object.entries(APPT_TYPE).map(([label, value]) => ({
  label,
  value,
}));

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
  branch: StringType().isRequired('Branch Type is required'),
  specialty: StringType().isRequired('Specialty Type is required'),
  doctor: StringType().isRequired('Doctor Type is required'),
});

const initialValues = {
  type: 'Examination',
  patient: '',
  branch: '',
  specialty: '',
  doctor: '',
  date: new Date(),
  time: null,
};

const canAddPatient = formValue =>
  formValue.type === 'Examination' ? true : false;

const searchBy = (text, _, patient) => {
  return filterPatientBy(text, patient);
};

export default function NewAppointment() {
  const [patientModal, setPatientModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(initialValues);
  const [selectedHour, setSelectedHour] = useState(null);
  const [currentClinic] = useGlobalState('currentClinic');
  const {
    patients,
    appointments,
    updateAppointments,
    branches,
    specialties,
    doctors,
  } = useFetchData();

  const [hideBranchSelect, setHideBranchSelect] = useState(false);
  const [hideSpecialtySelect, setHideSpecialtySelect] = useState(
    false
  );

  useEffect(() => {
    setFormValue(pre => ({ ...pre, specialty: '', doctor: '' }));
    if (branches.length === 1) {
      setHideBranchSelect(true);
      setFormValue(pre => ({ ...pre, branch: branches[0].id }));
    }
    if (
      getSpecialtiesByBranchId(specialties, formValue.branch).length ===
      1
    ) {
      setFormValue(pre => ({
        ...pre,
        specialty: getSpecialtiesByBranchId(
          specialties,
          formValue.branch
        )[0].id,
      }));
      setHideBranchSelect(true);
      setHideSpecialtySelect(true);
    }
  }, [branches, formValue.branch, specialties]);

  useEffect(() => {
    if (
      getSpecialtiesByBranchId(specialties, formValue.branch).length ===
      1
    ) {
      setFormValue(pre => ({
        ...pre,
        specialty: getSpecialtiesByBranchId(
          specialties,
          formValue.branch
        )[0].id,
      }));
      setHideBranchSelect(true);
      setHideSpecialtySelect(true);
    }
    setFormValue(pre => ({ ...pre, doctor: '' }));

    return () => {
      setHideBranchSelect(false);
      setHideSpecialtySelect(false);
    };
  }, [formValue.branch, formValue.specialty, specialties]);

  useEffect(() => {
    return () => {
      setFormValue(initialValues);
    };
  }, []);

  const [createAppointment] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: ({ createAppointment }) => {
      setFormValue(initialValues);
      Alert.success('Reservation Created Successfully');
      updateAppointments(
        sortAppointmentsByDate([createAppointment, ...appointments])
      );
      setOpen(false);
    },
    onError: ({ message }) => Alert.error(message),
  });

  const showModal = useCallback(() => setPatientModal(true), []);
  const hideModal = useCallback(() => setPatientModal(false), []);

  const { disabledMinutes, hideHours } = useAppointmentForm({
    date: formValue.date,
    type: formValue.type,
    selectedHour,
    appointments,
  });

  const handleCreate = useCallback(() => {
    if (!isValid(model, formValue)) {
      Alert.error('Complete Required Fields');
      return;
    }
    const { patient, type } = formValue;

    const timeDate = moment(formValue.time);
    const date = moment(formValue.date).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });
    createAppointment({
      variables: { input: { patient, type, clinicId: currentClinic.id, date } },
    });
  }, [createAppointment, currentClinic, formValue]);

  return (
    <>
      <NewPatient
        onCreate={({ id }) => {
          setFormValue({ ...formValue, patient: id });
          hideModal();
        }}
        show={patientModal}
        onHide={hideModal}
      />
      <Div position="fixed" right={64} bottom={64} zIndex={99999}>
        <Fab open={open} setOpen={setOpen} />
      </Div>
      <CRModal
        show={open}
        header="New Appointment"
        CRContainer={ContainerStyled}
        CRBody={ModalBodyStyled}
        onOk={handleCreate}
        onHide={() => {
          setOpen(false);
          setFormValue(initialValues);
        }}
        onCancel={() => {
          setOpen(false);
          setFormValue(initialValues);
        }}
      >
        <Div>
          <Form
            fluid
            model={model}
            formValue={formValue}
            onChange={setFormValue}
          >
            <CRSelectInput
              label="Examination/Followup"
              name="type"
              block
              cleanable={false}
              searchable={false}
              data={appointmentTypes}
            />
            <CRSelectInput
              label="Patient"
              name="patient"
              placeholder="Name / Phone no"
              accepter={SelectPicker}
              cleanable={true}
              labelKey="name"
              valueKey="id"
              data={patients}
              searchBy={searchBy}
              virtualized={false}
              block
            >
              <Div display="flex" justifyContent="flex-end">
                <H5
                  onClick={showModal}
                  disabled={!canAddPatient(formValue)}
                  variant="primary"
                  fontWeight={600}
                  className="cursor-pointer"
                  mt={2}
                >
                  Create New Patient
                </H5>
              </Div>
            </CRSelectInput>
            {!hideBranchSelect && (
              <CRSelectInput
                label="Branch"
                name="branch"
                placeholder="Select Branch"
                block
                cleanable={false}
                searchable={false}
                accepter={SelectPicker}
                data={mapArrWithIdsToChoices(branches)}
              />
            )}
            {formValue.branch !== '' && !hideSpecialtySelect && (
              <CRSelectInput
                label="Specialty"
                name="specialty"
                placeholder="Select Specialty"
                block
                cleanable={false}
                searchable={false}
                accepter={SelectPicker}
                data={specialtiesTypes(specialties, formValue.branch)}
              />
            )}
            {formValue.specialty !== '' && (
              <CRSelectInput
                label="Doctor"
                name="doctor"
                placeholder="Select Doctor"
                block
                cleanable={false}
                searchable={false}
                accepter={SelectPicker}
                data={doctorsTypes(doctors, formValue.specialty)}
              />
            )}
            <CRDatePicker
              label="Date"
              block
              name="date"
              accepter={DatePicker}
              disabledDate={isBeforeToday}
              placement="top"
            />
            <CRTimePicker
              label="Time"
              block
              name="time"
              accepter={DatePicker}
              placement="top"
              disabledMinutes={disabledMinutes}
              hideHours={hideHours}
              startHour={8}
              onSelect={a => setSelectedHour(moment(a).hour())}
            />
          </Form>
        </Div>
      </CRModal>
    </>
  );
}

NewAppointment.propTypes = {};

NewAppointment.defaultProps = {};
