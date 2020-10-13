import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'rsuite';

import { CRModal } from 'components';
import { useMutation } from '@apollo/client';

import Form from './form';
import { CREATE_PATIENT } from 'apollo-client/queries';
import useFetchPatients from 'hooks/fetch-patients';

const initialValues = {
  name: '',
  phoneNo: '',
  age: '',
  type: null,
  guardianName: '',
};

export default function NewPatient({ show, onHide, onCreate }) {
  const [formValue, setFormValue] = useState(initialValues);
  const { patients, updateCache } = useFetchPatients();
  const [createPatient] = useMutation(CREATE_PATIENT, {
    update(cache, { data: { createPatient: patient } }) {
      updateCache(patients.concat([patient]));
    },
    onCompleted: ({ createPatient: patient }) => {
      Alert.success('Patient Created Successfully');
      onCreate(patient);
      setFormValue(initialValues);
    },
    onError: () => Alert.error('Invalid Input'),
  });
  return (
    <CRModal
      show={show}
      onHide={onHide}
      header="New Patient"
      onCancel={onHide}
      onOk={() => {
        createPatient({
          variables: {
            input: { ...formValue },
          },
        });
      }}
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
