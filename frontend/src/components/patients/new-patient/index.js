import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'rsuite';

import { CRModal } from 'components';
import { useMutation } from '@apollo/react-hooks';

import Form from './form';
import { LIST_PATIENTS, CREATE_PATIENT } from 'apollo-client/queries';

const initialValues = {
  name: '',
  phoneNo: '',
  age: '',
  type: null,
  guardianName: '',
};

export default function NewPatient({ show, onHide, onCreate }) {
  const [formValue, setFormValue] = useState(initialValues);
  const [createPatient] = useMutation(CREATE_PATIENT, {
    update(cache, { data: { createPatient: patient } }) {
      const { patients } = cache.readQuery({ query: LIST_PATIENTS });
      cache.writeQuery({
        query: LIST_PATIENTS,
        data: { patients: patients.concat([patient]) },
      });
    },
    onCompleted: () => {
      Alert.success('Patient Created Successfully');
      onCreate();
    },
    onError: () => Alert.error('Invalid Input'),
  });
  return (
    <CRModal
      show={show}
      onHide={onHide}
      header="New Patient"
      onCancel={onHide}
      onOk={() =>
        createPatient({
          variables: {
            input: { ...formValue },
          },
        })
      }
    >
      <Form onChange={setFormValue} formValue={formValue} />
    </CRModal>
  );
}

NewPatient.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  onCreate: PropTypes.func,
};

NewPatient.defaultProps = {
  show: false,
};
