import React from 'react';
import { Form, Toast, View, Text } from 'native-base';
import { Formik, Field } from 'formik';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as Yup from 'yup';
import moment from 'moment';

import { mapArrToChoices } from '../utils/misc';
import { APPOINTMENT_TYPES } from '../utils/constants';
import { CREATE_APPOINTMENT, LIST_PATIENTS } from '../apollo-client/queries';
import { NAVIGATIONS } from '@/utils/constants';
import { CRPickerInput, CRMainLayout, CRPrimaryButton } from '@/components';
import crVariables from '@/utils/cr-variables';
import CRDateTimePicker from '../components/inputs/datetime-picker';
import useUserInfo from '@/hooks/fetch-user-info';

const ValidationSchema = Yup.object().shape({
  patient: Yup.string().required('Select Patient'),
  type: Yup.string().required('Select Type'),
  date: Yup.date().typeError('Date is required').required('Date is required'),
  time: Yup.date().typeError('Time is required').required('Date is required'),
  clinicId: Yup.string()
    .typeError('Clinic is required')
    .required('Clinic is required'),
});

const createAppointmentBody = ({ date, time, ...rest }) => {
  return {
    ...rest,
    date: moment(date).set({
      hours: moment(time).hours(),
      minutes: moment(time).minutes(),
      seconds: 0,
      milliseconds: 0,
    }),
  };
};

const NewAppointmentScreen = ({ navigation }) => {
  const { clinics } = useUserInfo();
  const { data } = useQuery(LIST_PATIENTS);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: () => {
      Toast.show({
        text: 'Reservation Created Successfully!',
        type: 'success',
        duration: 3000,
      });
      navigation.navigate(NAVIGATIONS.TODAY_APPOINTMENTS);
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
    <CRMainLayout header="New Appointment" noBack closeIcon>
      <Form>
        <Formik
          initialValues={{
            patient: null,
            type: APPOINTMENT_TYPES[0],
            date: null,
            time: null,
          }}
          validationSchema={ValidationSchema}
        >
          {form => (
            <Form>
              <Field
                name="patient"
                placeholder="Select patient"
                component={CRPickerInput}
                choices={patients}
                labelKey="name"
                valueKey="id"
                containerStyle={{ marginBottom: 0 }}
              />
              <View
                style={{
                  alignItems: 'flex-end',
                  marginBottom: crVariables.fieldMarginBottom,
                }}
              >
                <Text
                  name="add"
                  onPress={() =>
                    navigation.navigate(NAVIGATIONS.NEW_PATIENT, {
                      onGoBack: patient => {
                        form.setFieldValue('patient', patient.id);
                      },
                    })
                  }
                  style={{ color: crVariables.primaryColor }}
                >
                  Create new Patient
                </Text>
              </View>
              <Field
                name="type"
                placeholder="type"
                component={CRPickerInput}
                choices={mapArrToChoices(APPOINTMENT_TYPES)}
              />
              <Field
                name="date"
                placeholder="Date"
                component={CRDateTimePicker}
                mode="date"
              />
              <Field
                name="time"
                placeholder="Time"
                component={CRDateTimePicker}
                mode="time"
              />
              <Field
                name="clinicId"
                placeholder="Clinic"
                component={CRPickerInput}
                choices={clinics}
                labelKey="name"
                valueKey="id"
              />
              <CRPrimaryButton
                primary
                full
                disabled={!form.isValid}
                onPress={() =>
                  createAppointment({
                    variables: {
                      input: createAppointmentBody(form.values),
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
