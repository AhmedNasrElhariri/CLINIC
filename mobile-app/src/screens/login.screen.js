import React from 'react';
import { Form, Toast, Content } from 'native-base';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

import { LOGIN } from '@/apollo-client/queries';
import { CRMainLayout, CRPrimaryButton, CRTextInput } from '@/components';
import { NAVIGATIONS } from '@/utils/constants';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginScreen = ({ navigation }) => {
  const [login] = useMutation(LOGIN, {
    onCompleted: () => {
      Toast.show({
        text: 'Patient Created Successfully!',
        type: 'success',
        duration: 3000,
      });

      navigation.navigate(NAVIGATIONS.TODAY_APPOINTMENTS);
    },
    onError: () =>
      Toast.show({
        text: 'Invalid Email or Password',
        type: 'danger',
        duration: 3000,
      }),
  });

  return (
    <CRMainLayout>
      <Content style={{ marginTop: 135 }}>
        <Formik
          validateOnMount
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={ValidationSchema}
        >
          {form => (
            <Form>
              <Field name="email" placeholder="Email" component={CRTextInput} />
              <Field
                name="password"
                placeholder="Password"
                secureTextEntry
                component={CRTextInput}
              />
              <CRPrimaryButton
                disabled={!form.isValid}
                onPress={() =>
                  login({
                    variables: {
                      ...form.values,
                    },
                  })
                }
              >
                Create
              </CRPrimaryButton>
            </Form>
          )}
        </Formik>
      </Content>
    </CRMainLayout>
  );
};

export default LoginScreen;
