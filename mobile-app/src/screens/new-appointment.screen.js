import React from 'react';
import {
  Container,
  Content,
  Form,
  Button,
  Text,
  Toast,
  Item,
  Icon,
} from 'native-base';
import { Formik, Field } from 'formik';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Yup from 'yup';

import PickerInput from '../components/inputs/picker-input';
import DateInput from '../components/inputs/date-input';
import { mapArrToChoices } from '../utils/misc';
import { APPOINTMENT_TYPES } from '../utils/constants';
import { CREATE_APPOINTMENT, LIST_PATIENTS } from '../apollo-client/queries';
import { NAVIGATIONS } from '@/utils/constants';

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
});

const NewAppointmentScreen = ({ navigation }) => {
  const { data } = useQuery(LIST_PATIENTS);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: () => {
      Toast.show({
        text: 'Reservation Created Successfully!',
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

  const patients = (data && data.patients) || [];

  return (
    <Container>
      <Content>
        <Form>
          <Formik
            initialValues={{
              patient: null,
              type: 'Examination',
              date: null,
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {form => (
              <Form>
                <Item>
                  <Field
                    name="patient"
                    placeholder="Select patient"
                    component={PickerInput}
                    choices={patients}
                    labelKey="name"
                    valueKey="id"
                  />
                  <Icon
                    name="add"
                    style={{ color: 'red' }}
                    onPress={() =>
                      navigation.navigate(NAVIGATIONS.NEW_PATIENT, {
                        onGoBack: a => console.log(a),
                      })
                    }
                  />
                </Item>
                <Item>
                  <Field
                    name="type"
                    placeholder="type"
                    component={PickerInput}
                    choices={mapArrToChoices(APPOINTMENT_TYPES)}
                  />
                </Item>
                <Item>
                  <Field name="date" placeholder="date" component={DateInput} />
                </Item>
                <Button
                  primary
                  full
                  onPress={() =>
                    createAppointment({
                      variables: { input: form.values },
                    })
                  }
                >
                  <Text>Create</Text>
                </Button>
              </Form>
            )}
          </Formik>
        </Form>
      </Content>
    </Container>
  );
};

export default NewAppointmentScreen;
