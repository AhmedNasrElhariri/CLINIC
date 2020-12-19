import React, { useCallback, useMemo } from 'react';

import { Div, CRButton, MainContainer } from 'components';
import useFrom from 'hooks/form';
import { useModal } from 'components/widgets/modal';
import usePatientSurgeries from 'hooks/fetch-patient-surgeries';
import ListPatientSurgeries from '../list-patient-surgeries';
import NewPatientSurgery from '../new-patient-surgery';
import PatientSurgeryFilter from './filter';
import { filterPatientSurgery } from 'services/patient-surgery';

const initValue = {
  patientId: null,
  surgeryId: null,
  hospitalId: null,
};

function PatientSurgeriesContainer() {
  const { visible, open, close } = useModal();
  const { formValue, setFormValue } = useFrom({
    initValue,
  });
  const {
    formValue: filterFormValue,
    setFormValue: setFilterFormValue,
  } = useFrom({
    surgery: null,
    hospital: null,
  });
  const { createPatientSurgery, patientSurgeries } = usePatientSurgeries({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
  });

  const handleOnClickCreate = useCallback(() => {
    open();
  }, [open]);

  const handleAdd = useCallback(() => {
    createPatientSurgery({
      variables: {
        patientSurgery: formValue,
      },
    });
  }, [createPatientSurgery, formValue]);

  const filteredList = useMemo(
    () => filterPatientSurgery(patientSurgeries, filterFormValue),
    [filterFormValue, patientSurgeries]
  );

  return (
    <>
      <MainContainer
        title="Patients Surgeries"
        more={
          <Div display="flex">
            <CRButton primary small onClick={handleOnClickCreate}>
              Surgery +
            </CRButton>
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
        <ListPatientSurgeries patientSurgeries={filteredList} />
      </MainContainer>
    </>
  );
}

PatientSurgeriesContainer.defaultProps = {
  surgeries: [],
};

PatientSurgeriesContainer.propTypes = {};

export default PatientSurgeriesContainer;
