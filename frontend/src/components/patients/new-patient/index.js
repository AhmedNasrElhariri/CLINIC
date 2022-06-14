import React, { useMemo } from 'react';
import { Alert, Schema } from 'rsuite';
import * as R from 'ramda';
import { ALL_AREAS } from 'apollo-client/queries';
import { CRModal } from 'components';
import { useMutation, useQuery } from '@apollo/client';
import Form from './form';
import {
  CREATE_PATIENT,
  LIST_SEARCHED_PATIENTS,
  LIST_PATIENTS,
} from 'apollo-client/queries';
import { usePatients, useForm } from 'hooks';
import { useTranslation } from 'react-i18next';

const initialValues = {
  name: '',
  phoneNo: '',
  phoneNoTwo: '',
  area: '',
  code: '',
  ageOption: 'age',
  phoneOption: 'one',
  reference: [],
  age: 0,
  date: new Date(),
  type: null,
  guardianName: '',
};
const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  name: StringType()
    .minLength(6, 'The field cannot be less than 6 characters')
    .maxLength(30, 'The field cannot be greater than 30 characters')
    .isRequired('User name is required'),
  phoneNo: StringType().isRequired('Phone No is  Required'),
  // .pattern(/^(01(0|1|2|5)\d{8})$/, 'Invalid Phone No'),
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
  const { data } = useQuery(ALL_AREAS);
  const { createPatient, createPatientLoading } = usePatients({
    onCreate: () => {
      onHide();
      setFormValue(initialValues);
      setShow(false);
      // onCreate(patient);
    },
  });
  const areas = useMemo(() => R.propOr([], 'areas')(data), [data]);
  const { t } = useTranslation();
  const newAreas = areas.map(a => {
    return {
      id: a.id,
      name: a.city_name_en,
    };
  });

  return (
    <CRModal
      show={showModel}
      onHide={onHide}
      header={t('newPatient')}
      onCancel={onHide}
      onOk={() => {
        setShow(true);
        if (validate) {
          const { ageOption, phoneOption, ...rest } = formValue;
          createPatient({
            variables: {
              input: { ...rest },
            },
          });
        }
      }}
      okTitle={t('ok')}
      cancelTitle={t('cancel')}
      loading={createPatientLoading}
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
