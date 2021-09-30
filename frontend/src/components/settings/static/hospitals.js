import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Can } from 'components/user/can';
import { Div, CRButton } from 'components';
import ListHospitals from './list-hospitals';
import { Schema } from 'rsuite';
import NewHospital from './new-hospital';
import {
  useForm,
  useModal,
  useHospitals,
  useAppointments,
  useValidationForm,
} from 'hooks';
import Filter from '../../filters';
import { ACTIONS } from 'utils/constants';
// import { Validate } from 'services/form';
const initValue = {
  name: '',
  phoneNo: '',
  address: '',
  branchId: null,
  specialtyId: null,
  userId: null,
};


const Hospitals = () => {
  const { visible, open, close } = useModal();
  const { filterBranches } = useAppointments({
    action: ACTIONS.Create_Hospital,
  });
  const { formValue, setFormValue, type, setType } = useForm({
    initValue,
  });
  const { addHospital, hospitals, editHospital } = useHospitals({
    onCreate: () => {
      close();
      setFormValue(initValue);
    },
    onEdit: () => {
      close();
      setFormValue(initValue);
    },
  });

  const handleClickCreate = useCallback(() => {
    setType('create');
    setFormValue(initValue);
    open();
  }, [open, setFormValue, setType]);

  const handleClickEdit = useCallback(
    data => {
      const hospital = R.pick(['id', 'name', 'phoneNo', 'address'])(data);
      setType('edit');
      setFormValue(hospital);
      open();
    },
    [open, setFormValue, setType]
  );

  const handleAdd = useCallback(() => {
    if (type === 'create') {
      
        addHospital({
          variables: {
            hospital: formValue,
          },
        });
      
    } else {
      editHospital({
        variables: {
          hospital: formValue,
        },
      });
    }
  }, [addHospital, editHospital, formValue, type]);

  return (
    <>
      <Div textAlign="right">
        <Can I="Create" an="Hospital">
          <CRButton variant="primary" onClick={handleClickCreate}>
            Hospital +
          </CRButton>
        </Can>
      </Div>
      <NewHospital
        visible={visible}
        formValue={formValue}
        onChange={setFormValue}
        onOk={handleAdd}
        onClose={close}
      />
      <Filter
        appointments={hospitals}
        branches={filterBranches}
        render={hosps => (
          <ListHospitals hospitals={hosps} onEdit={handleClickEdit} />
        )}
      />
    </>
  );
};

export default Hospitals;
