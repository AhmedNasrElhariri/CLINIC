import React from 'react';
import {
  Container,
  Content,
  Form,
  Button,
  Text,
  Toast,
  Item,
} from 'native-base';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

import TextInput from '@/components/inputs/text-input';
import PickerInput from '@/components/inputs/picker-input';
import { mapArrToChoices } from '@/utils/misc';
import { SEX, MEMBERSHIP_TYPES } from '@/utils/constants';
import { CREATE_PATIENT, LIST_PATIENTS } from '@/apollo-client/queries';

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
});

const prepareSubmittedData = data => ({
  ...data,
  phoneNo: String(data.phoneNo),
  age: Number(data.age),
});

export default ({ onCreate }) => {
  const [createPatient] = useMutation(CREATE_PATIENT, {
    update(cache, { data: { createPatient: patient } }) {
      const { patients } = cache.readQuery({ query: LIST_PATIENTS });
      cache.writeQuery({
        query: LIST_PATIENTS,
        data: { patients: patients.concat([patient]) },
      });
    },
    onCompleted: () => {
      onCreate();
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
    <Container>
      <Content>
        <Formik
          initialValues={{
            name: '',
            phoneNo: '',
            age: null,
            sex: null,
            type: null,
          }}
          validationSchema={ValidationSchema}>
          {form => (
            <Form>
              <Item>
                <Field name='name' placeholder='name' component={TextInput} />
              </Item>
              <Field
                name='phoneNo'
                placeholder='phoneNo'
                component={TextInput}
                keyboardType='number-pad'
              />
              <Item>
                <Field
                  name='age'
                  placeholder='age'
                  component={TextInput}
                  keyboardType='numeric'
                />
              </Item>
              <Item>
                <Field
                  name='sex'
                  placeholder='sex'
                  component={PickerInput}
                  choices={mapArrToChoices(SEX)}
                />
              </Item>
              <Item>
                <Field
                  name='type'
                  placeholder='membership type'
                  component={PickerInput}
                  choices={mapArrToChoices(MEMBERSHIP_TYPES)}
                />
              </Item>
              <Button
                onPress={() =>
                  createPatient({
                    variables: { input: prepareSubmittedData(form.values) },
                  })
                }>
                <Text>Create</Text>
              </Button>
            </Form>
          )}
        </Formik>
      </Content>
    </Container>
  );
};
