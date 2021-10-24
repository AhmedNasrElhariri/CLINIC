import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Can } from 'components/user/can';
import { Schema } from 'rsuite';
import { Div, CRButton, MainContainer } from 'components';
import moment from 'moment';
import ListPatientSurgeries from '../list-patient-surgeries';
import NewPatientSurgery from '../new-patient-surgery';
import PatientSurgeryFilter from './filter';
import { filterPatientSurgery } from 'services/patient-surgery';
import { useForm, usePatientSurgeries, useModal } from 'hooks';

const initValue = {
  patientId: null,
  surgeryId: null,
  hospitalId: null,
  date: null,
  time: null,
  anesthesia: null,
  anesthesiaDoctorName: '',
  assistantFees: 0,
  anesthesiaFees: 0,
  others: 0,
  fees: 0,
  hospitalFees: 0,
};
const { StringType, DateType } = Schema.Types;
const model = Schema.Model({
  patientId: StringType().isRequired('patient is required'),
  surgeryId: StringType().isRequired('surgery is required'),
  hospitalId: StringType().isRequired('hospital is required'),
  date: DateType().isRequired('date is required'),
});
const PatientSurgeriesContainer = () => {
  const { visible, open, close } = useModal();
  const history = useHistory();
  const { formValue, setFormValue, checkResult, validate, show, setShow } =
    useForm({
      initValue,
      model,
    });
  const { formValue: filterFormValue, setFormValue: setFilterFormValue } =
    useForm({
      surgery: null,
      hospital: null,
    });
  const { createPatientSurgery, patientSurgeries, loading } =
    usePatientSurgeries({
      onCreate: () => {
        close();
      },
    });

  const handleOnClickCreate = useCallback(() => {
    open();
  }, [open]);

  const handleAdd = useCallback(() => {
    const { time, date, ...rest } = formValue;
    const timeDate = moment(formValue.time);

    let Date = moment(formValue.date).set({
      hours: timeDate.hours(),
      minute: timeDate.minutes(),
    });
    const newData = { date: Date, ...rest };
    createPatientSurgery(newData);
  }, [createPatientSurgery, formValue]);

  const filteredList = useMemo(
    () => filterPatientSurgery(patientSurgeries, filterFormValue),
    [filterFormValue, patientSurgeries]
  );

  const handleSurgeryClick = useCallback(
    ({ appointment }) => {
      history.push(`/appointments/${appointment.id}`);
    },
    [history]
  );

  return (
    <>
      <MainContainer
        title="Patients Surgeries"
        more={
          <Div display="flex">
            <Can I="Create" an="Surgery">
              <CRButton variant="primary" onClick={handleOnClickCreate}>
                Surgery +
              </CRButton>
            </Can>
          </Div>
        }
      >
        <NewPatientSurgery
          visible={visible}
          formValue={formValue}
          onChange={setFormValue}
          onOk={handleAdd}
          onClose={close}
          checkResult={checkResult}
          validate={validate}
          show={show}
          setShow={setShow}
          loading={loading}
        />
        <PatientSurgeryFilter
          formValue={filterFormValue}
          onChange={setFilterFormValue}
        />
        <ListPatientSurgeries
          patientSurgeries={filteredList}
          onSurgeryClick={handleSurgeryClick}
        />
      </MainContainer>
    </>
  );
};

PatientSurgeriesContainer.defaultProps = {
  surgeries: [],
};

PatientSurgeriesContainer.propTypes = {};

export default PatientSurgeriesContainer;
