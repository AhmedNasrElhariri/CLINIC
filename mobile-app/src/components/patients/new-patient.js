import React from 'react';
import { Form, Button, Text, Toast } from 'native-base';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

import TextInput from '@/components/inputs/text-input';
import PickerInput from '@/components/inputs/picker-input';
import { mapArrToChoices } from '@/utils/misc';
import { SEX, MEMBERSHIP_TYPES } from '@/utils/constants';
import { CREATE_PATIENT, LIST_PATIENTS } from '@/apollo-client/queries';
import { CRTextInput, CRPrimaryButton, CRPickerInput } from '@/components';

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
});

const prepareSubmittedData = data => ({
  ...data,
  phoneNo: String(data.phoneNo),
  age: Number(data.age),
});

export default ({ onCreate, ...props }) => {
  const [createPatient] = useMutation(CREATE_PATIENT, {
    update(cache, { data: { createPatient: patient } }) {
      const { patients } = cache.readQuery({ query: LIST_PATIENTS });
      cache.writeQuery({
        query: LIST_PATIENTS,
        data: { patients: patients.concat([patient]) },
      });
    },
    onCompleted: ({ createPatient: patient }) => {
      onCreate(patient);
      Toast.show({
        text: 'Patient Created Successfully!',
        type: 'success',
        duration: 3000,
      });
    },
    onError: () =>
      Toast.show({
        text: 'Invalid Input!',
        type: 'danger',
        duration: 3000,
      }),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        phoneNo: '',
        age: null,
        sex: null,
        type: null,
      }}
      validationSchema={ValidationSchema}
    >
      {form => (
        <Form>
          <Field name="name" placeholder="name" component={TextInput} />
          <Field
            name="phoneNo"
            placeholder="PhoneNo"
            component={CRTextInput}
            keyboardType="number-pad"
          />
          <Field
            name="age"
            placeholder="Age"
            component={CRTextInput}
            keyboardType="numeric"
          />
          <Field
            name="sex"
            placeholder="Sex"
            component={CRPickerInput}
            choices={mapArrToChoices(SEX)}
          />
          <Field
            name="type"
            placeholder="Membership"
            component={CRPickerInput}
            choices={mapArrToChoices(MEMBERSHIP_TYPES)}
          />
          <CRPrimaryButton
            onPress={() =>
              createPatient({
                variables: { input: prepareSubmittedData(form.values) },
              })
            }
          >
            Create
          </CRPrimaryButton>
        </Form>
      )}
    </Formik>
  );
};
