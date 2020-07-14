import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Form, Alert } from 'rsuite';
import * as R from 'ramda';

import { CRModal, CRSelectInput } from 'components';
import labs from './lab-tests';
import AddLabImages from './add-lab-images';
import { ADD_LAB_DOCS } from 'apollo-client/queries';

const AddLabDocs = ({ show, onCancel, patient }) => {
  const [formValue, setFormValue] = useState({
    name: '',
    images: [],
  });
  const [addLabDocs] = useMutation(ADD_LAB_DOCS, {
    onCompleted: () => {
      Alert.success('Lab Document has been uploaded successfully');
    },
  });

  return (
    <CRModal
      header="Add Lab Docs"
      show={show}
      onOk={() => {
        const { name, images } = formValue;
        addLabDocs({
          variables: {
            patientLab: {
              patientId: patient.id,
              name: name,
              documents: R.map(R.prop('id'))(images),
            },
          },
        });
      }}
      onCancel={onCancel}
      onHide={onCancel}
    >
      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          virtualized={false}
          label="Name"
          name="name"
          data={labs}
          block
        />
        <AddLabImages name="images" />
      </Form>
    </CRModal>
  );
};

AddLabDocs.propTypes = {};

export default AddLabDocs;
