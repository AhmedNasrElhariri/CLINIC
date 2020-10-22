import React from 'react';
import { Form, Toast } from 'native-base';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

import TextInput from '@/components/inputs/text-input';
import { mapArrToChoices } from '@/utils/misc';
import { SEX, MEMBERSHIP_TYPES } from '@/utils/constants';
import { CREATE_PATIENT, LIST_PATIENTS } from '@/apollo-client/queries';
import { CRTextInput, CRPrimaryButton, CRPickerInput } from '@/components';

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is Required'),
  phoneNo: Yup.string()
    .matches(/^(01(0|1|2|5)\d{8})$/, 'Invalid Phone No')
    .required('Phone is Required'),
  age: Yup.number()
    .typeError('Age should be number')
    .min(0, 'Min is 0')
    .max(100, 'Max 100')
    .required('Age is required'),
});

const prepareSubmittedData = data => ({
  ...data,
  phoneNo: String(data.phoneNo),
  age: Number(data.age),
});

const NewPatient = ({ onCreate }) => {
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
        sex: SEX[0],
        type: MEMBERSHIP_TYPES[0],
      }}
      validationSchema={ValidationSchema}
    >
      {form => (
        <Form>
          <Field name="name" placeholder="Name" component={TextInput} />
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
            disabled={!form.dirty || !form.isValid}
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

export default NewPatient;
