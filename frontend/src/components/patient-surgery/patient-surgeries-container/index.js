import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Can } from 'components/user/can';
import { Div, CRButton, MainContainer } from 'components';
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
  fees: 0,
  hospitalFees: 0,
};

const PatientSurgeriesContainer = () => {
  const { visible, open, close } = useModal();
  const history = useHistory();
  const { formValue, setFormValue } = useForm({
    initValue,
  });
  const { formValue: filterFormValue, setFormValue: setFilterFormValue } =
    useForm({
      surgery: null,
      hospital: null,
    });
  const { createPatientSurgery, patientSurgeries } = usePatientSurgeries({
    onCreate: () => {
      close();
    },
  });

  const handleOnClickCreate = useCallback(() => {
    open();
  }, [open]);

  const handleAdd = useCallback(() => {
    createPatientSurgery(formValue);
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
