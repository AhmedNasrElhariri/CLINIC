import React, { useState, useEffect, useCallback } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import { CRModal, Div } from 'components';
import { Button } from 'rsuite';
import Form from './form';
import styled from 'styled-components';
import { usePatients, useModal } from 'hooks';

const initialValues = {
  name: '',
  phoneNo: '',
  age: '',
  guardianName: '',
};
const EditButton = styled(Button)`
  background-color: white;
  color: #50c7f2;
  font-size: 18px;
`;
const EditPatient = ({ patient,editName }) => {
  const [formValue, setFormValue] = useState(initialValues);
  const { visible, open, close } = useModal();
  const { edit } = usePatients({ onEdit: close });

  useEffect(() => {
    setFormValue(R.omit(['__typename'])(patient));
  }, [patient]);
  const handleEditPatient = useCallback(() => {
    const { code , ...rest} = formValue;
    edit(rest);
  }, [edit, formValue]);

  const handleOpen = useCallback(e => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <Div onClick={handleOpen}>
        <EditButton onClick={open}>
          {editName}
        </EditButton>
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
