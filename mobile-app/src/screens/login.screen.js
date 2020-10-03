import React from 'react';
import { Form, Toast, Content } from 'native-base';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

import { LOGIN } from '@/apollo-client/queries';
import { CRMainLayout, CRPrimaryButton, CRTextInput } from '@/components';
import { AuthContext } from '../../main';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginScreen = () => {
  const { onSignIn } = React.useContext(AuthContext);

  const [login] = useMutation(LOGIN, {
    fetchPolicy: 'no-cache',
    onCompleted: async ({ login }) => {
      Toast.show({
        text: 'Patient Created Successfully!',
        type: 'success',
        duration: 3000,
      });
      onSignIn(login);
    },
    onError: error => {
      console.log(error);
      Toast.show({
        text: 'Invalid Email or Password',
        type: 'danger',
        duration: 3000,
      });
    },
  });

  return (
    <CRMainLayout noBack>
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
                onPress={() => {
                  console.log(form.values);
                  login({
                    variables: {
                      ...form.values,
                    },
                  });
                }}
              >
                Login
              </CRPrimaryButton>
            </Form>
          )}
        </Formik>
      </Content>
    </CRMainLayout>
  );
};

export default LoginScreen;
