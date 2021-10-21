import React, { useMemo } from 'react';
import { Alert, Schema } from 'rsuite';
import * as R from 'ramda';
import { ALL_AREAS } from 'apollo-client/queries';
import { CRModal } from 'components';
import { useMutation, useQuery } from '@apollo/client';
import Form from './form';
import { CREATE_PATIENT, LIST_SEARCHED_PATIENTS } from 'apollo-client/queries';
import { usePatients, useForm } from 'hooks';

const initialValues = {
  name: '',
  phoneNo: '',
  area: '',
  reference: [],
  age: '',
  type: null,
  guardianName: '',
};
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType()
    .minLength(6, 'The field cannot be less than 6 characters')
    .maxLength(30, 'The field cannot be greater than 30 characters')
    .isRequired('User name is required'),
  phoneNo: StringType()
    .isRequired('Phone No is  Required')
    .pattern(/^(01(0|1|2|5)\d{8})$/, 'Invalid Phone No'),
  age: NumberType('Age should be a number').range(
    0,
    100,
    'Age should be 0-100 years old'
  ),
});
export default function NewPatient({ show: showModel, onHide, onCreate }) {
  const { formValue, setFormValue, checkResult, validate, show, setShow } =
    useForm({
      initValue: initialValues,
      model,
    });
  const { patients, updateCache } = usePatients();
  const { data } = useQuery(ALL_AREAS);
  const areas = useMemo(() => R.propOr([], 'areas')(data), [data]);
  const newAreas = areas.map(a => {
    return {
      id: a.id,
      name: a.city_name_en,
    };
  });
  const [createPatient, { loading }] = useMutation(CREATE_PATIENT, {
    update(cache, { data: { createPatient: patient } }) {
      updateCache(patients.concat([patient]));
    },
    onCompleted: ({ createPatient: patient }) => {
      Alert.success('Patient Created Successfully');
      onHide();
      setShow(false);
      onCreate(patient);
      setFormValue(initialValues);
    },
    refetchQueries: [
      {
        query: LIST_SEARCHED_PATIENTS,
        variables: {
          name: '0',
        },
      },
    ],
    onError: () => Alert.error('Invalid Input'),
  });
  return (
    <CRModal
      show={showModel}
      onHide={onHide}
      header="New Patient"
      onCancel={onHide}
      onOk={() => {
        setShow(true);
        if (validate) {
          createPatient({
            variables: {
              input: { ...formValue },
            },
          });
        }
      }}
      loading={loading}
    >
      <Form
        onChange={setFormValue}
        formValue={formValue}
        newAreas={newAreas}
        checkResult={checkResult}
        show={show}
      />
    </CRModal>
  );
}
