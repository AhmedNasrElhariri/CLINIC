import React, { useCallback } from 'react';
import * as R from 'ramda';
import { Can } from 'components/user/can';
import { Div, CRButton } from 'components';
import ListHospitals from './list-hospitals';
import { Schema } from 'rsuite';
import NewHospital from './new-hospital';
import { useForm, useModal, useHospitals, useAppointments } from 'hooks';
import Filter from '../../filters';
import { ACTIONS } from 'utils/constants';
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Hospital name is required'),
});
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
  const {
    formValue,
    setFormValue,
    type,
    setType,
    checkResult,
    validate,
    show,
    setShow,
  } = useForm({
    initValue,
    model,
  });
  const { addHospital, hospitals, editHospital, deleteHospital } = useHospitals(
    {
      onCreate: () => {
        close();
        setShow(false);
        setFormValue(initValue);
      },
      onEdit: () => {
        close();
        setShow(false);
        setFormValue(initValue);
      },
      onDelete: () => {
        close();
        setShow(false);
        setFormValue(initValue);
      },
    }
  );

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

  const handleClickDelete = useCallback(
    data => {
      const hospital = R.pick(['id', 'name', 'phoneNo', 'address'])(data);
      setType('delete');
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
    } else if (type === 'delete') {
      deleteHospital({
        variables: {
          hospital: formValue,
          type: 'delete',
        },
      });
    } else {
      editHospital({
        variables: {
          hospital: formValue,
          type: 'edit',
        },
      });
    }
  }, [addHospital, editHospital, formValue, type, deleteHospital]);

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
        checkResult={checkResult}
        validate={validate}
        show={show}
        setShow={setShow}
        type={type}
      />
      <Filter
        appointments={hospitals}
        branches={filterBranches}
        render={hosps => (
          <ListHospitals
            hospitals={hosps}
            onEdit={handleClickEdit}
            onDelete={handleClickDelete}
          />
        )}
      />
    </>
  );
};

export default Hospitals;
