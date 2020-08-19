import React from 'react';
import { Form, Toast, Icon, View } from 'native-base';
import { Formik, Field } from 'formik';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Yup from 'yup';

import DateInput from '../components/inputs/date-input';
import { mapArrToChoices } from '../utils/misc';
import { APPOINTMENT_TYPES } from '../utils/constants';
import { CREATE_APPOINTMENT, LIST_PATIENTS } from '../apollo-client/queries';
import { NAVIGATIONS } from '@/utils/constants';
import { CRPickerInput, CRMainLayout, CRPrimaryButton } from '@/components';
import useGlobalState from '@/state';

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
});

const NewAppointmentScreen = ({ navigation }) => {
  const [currentClinic] = useGlobalState('currentClinic');
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
    <CRMainLayout header="New Appointment">
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Field
                  name="patient"
                  placeholder="Select patient"
                  component={CRPickerInput}
                  choices={patients}
                  labelKey="name"
                  valueKey="id"
                />
                <View
                  style={{ alignItems: 'center', height: 70, marginLeft: 10 }}
                >
                  <Icon
                    name="add"
                    style={{ color: 'red', fontSize: 40 }}
                    onPress={() => navigation.navigate(NAVIGATIONS.NEW_PATIENT)}
                  />
                </View>
              </View>
              <Field
                name="type"
                placeholder="type"
                component={CRPickerInput}
                choices={mapArrToChoices(APPOINTMENT_TYPES)}
              />
              <Field name="date" placeholder="date" component={DateInput} />
              <CRPrimaryButton
                primary
                full
                onPress={() =>
                  createAppointment({
                    variables: {
                      input: { ...form.values, clinicId: currentClinic.id },
                    },
                  })
                }
              >
                Create
              </CRPrimaryButton>
            </Form>
          )}
        </Formik>
      </Form>
    </CRMainLayout>
  );
};

export default NewAppointmentScreen;
