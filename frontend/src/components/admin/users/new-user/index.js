import React, { useState, useEffect, useMemo } from 'react';
import { Form, Schema } from 'rsuite';

import { CRTextInput, CRModal, CRCheckBoxGroup } from 'components';
import { CRSelectInput } from 'components/widgets';
import { POSITIONS } from 'utils/constants';
import { mapObjValuesToChoices } from 'utils/misc';

const viewsList = [
  { name: 'Dental', value: 'Dental' },
  { name: 'Dermatology', value: 'Dermatology' },
  { name: 'Obstetrics and Gynecology', value: 'ObstetricsAndGynecology' },
  { name: 'Pediatrics', value: 'Pediatrics' },
  { name: 'Orthopedics', value: 'Orthopedics' },
  { name: 'Plastic surgery', value: 'PlasticSurgery' },
];

const { StringType } = Schema.Types;

const positions = mapObjValuesToChoices(POSITIONS);

const model = Schema.Model({
  name: StringType().isRequired('Name is required'),
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('Email is required'),
  password: StringType().isRequired('Password is required'),
  position: StringType().isRequired('Type is required'),
  specialtyId: StringType().isRequired('Specialty is required'),
});

export default function NewUser({
  show,
  onCancel,
  onCreate,
  specialties,
  onOk,
  formValue,
  onChange,
  type,
}) {
  const header = useMemo(() => {
    if (type === 'create') {
      return 'Create New User';
    } else {
      return 'Edit the User';
    }
  }, [type]);
  return (
    <CRModal
      show={show}
      header={header}
      onHide={onCancel}
      onCancel={onCancel}
      onOk={() => onOk(formValue)}
    >
      <Form fluid model={model} formValue={formValue} onChange={onChange}>
        <CRTextInput label="Name" name="name" />
        <CRTextInput label="Email" name="email" />
        <CRTextInput label="Password" name="password" type="password" />
        <CRSelectInput
          name="position"
          label="Position"
          block
          data={positions}
        />
        <CRCheckBoxGroup
          options={viewsList}
          name="allowedViews"
          label="Views allowed to User"
          value={formValue.views}
          onChange={val => onChange({ ...formValue, allowedViews: val })}
          inline
        />
      </Form>
    </CRModal>
  );
}

NewUser.propTypes = {};

NewUser.defaultProps = {
  specialties: [],
};
