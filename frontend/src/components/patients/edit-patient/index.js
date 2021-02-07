import React, { useState, useEffect, useCallback } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Icon } from 'rsuite';

import { CRModal, Div } from 'components';

import Form from './form';
import useFetchPatients from 'hooks/fetch-patients';
import { useModal } from 'components/widgets/modal';

const initialValues = {
  name: '',
  phoneNo: '',
  age: '',
  guardianName: '',
};

const EditPatient = ({ patient }) => {
  const [formValue, setFormValue] = useState(initialValues);
  const { visible, open, close } = useModal();
  const { edit } = useFetchPatients({ onEdit: close });

  useEffect(() => {
    setFormValue(R.omit(['__typename'])(patient));
  }, [patient]);

  const handleEditPatient = useCallback(() => {
    edit(formValue);
  }, [edit, formValue]);

  const handleOpen = useCallback(e => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <Div onClick={handleOpen}>
        <Icon icon="edit" onClick={open} />
        <CRModal
          show={visible}
          onHide={close}
          header="Edit Patient"
          onCancel={close}
          onOk={handleEditPatient}
        >
          <Form onChange={setFormValue} formValue={formValue} />
        </CRModal>
      </Div>
    </>
  );
};

EditPatient.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  onCreate: PropTypes.func,
};

EditPatient.defaultProps = {
  show: false,
};

export default EditPatient;
