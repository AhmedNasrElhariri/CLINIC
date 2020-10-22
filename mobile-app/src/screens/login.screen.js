import React from 'react';
import { Image } from 'react-native';
import { Form, Toast, Content, View } from 'native-base';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

import { LOGIN } from '@/apollo-client/queries';
import { CRMainLayout, CRPrimaryButton, CRTextInput } from '@/components';
import { AuthContext } from '../../main-context';

import logo from '@/../assets/logo.png';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is Required'),
  password: Yup.string().required('Password is Required'),
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
      <Content style={{ marginTop: 90 }}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Image source={logo} style={{ marginHorizontal: 'auto' }} />
        </View>
        <Formik
          // validateOnMount
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
                disabled={!form.dirty || !form.isValid}
                onPress={() => {
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
