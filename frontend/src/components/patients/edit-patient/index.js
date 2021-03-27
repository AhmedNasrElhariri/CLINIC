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
  margin-left: ${props => props.margin};
  margin-bottom: 30px;
  background-color: white;
  color: #50c7f2;
  font-size: 18px;
`;
const EditPatient = ({ patient }) => {
  const [formValue, setFormValue] = useState(initialValues);
  const { visible, open, close } = useModal();
  const { edit } = usePatients({ onEdit: close });

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
        <EditButton margin="15px" onClick={open}>
          Edit
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
