import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import * as R from 'ramda';
import { Form, Schema, Alert } from 'rsuite';

import { UPDATE_CLINIC } from 'apollo-client/queries';
import { Div, CRCard, H3, CRTextInput, CRButton } from 'components';
import LogoUpload from './logo-upload';
import useGlobalState from 'state';

const model = Schema.Model({});

const initialValues = {
  doctorName: '',
  doctorTitle: '',
  doctorJobDescription: '',
  address: '',
  phoneNo: '',
};

function StaticSettings({ onCreate }) {
  const [formValue, setFormValue] = useState(initialValues);
  const [logo, setLogo] = React.useState(null);
  const [clinic, setCurrentClinic] = useGlobalState('currentClinic');

  const [updateClinic] = useMutation(UPDATE_CLINIC, {
    onCompleted: () => {
      Alert.success('Clinic Info has been Updated Successfully');
      setCurrentClinic({
        ...clinic,
        ...formValue,
        logo,
      });
    },
    onError: () => Alert.error('Invalid Input'),
  });

  useEffect(() => {
    if (!R.isEmpty(clinic)) {
      const val = R.pick([
        'doctorName',
        'doctorTitle',
        'doctorJobDescription',
        'address',
        'phoneNo',
      ])(clinic);
      const logo = R.path(['logo'])(clinic);
      setLogo(logo);
      setFormValue(val);
    }
  }, [clinic]);

  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <H3 mb={64}>Static Info</H3>
        <CRButton
          variant="primary"
          onClick={() =>
            updateClinic({
              variables: {
                clinic: { ...formValue, id: clinic.id, logoId: logo.id },
              },
            })
          }
        >
          Save
        </CRButton>
      </Div>
      <CRCard borderless>
        <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
          <Div width={600}>
            <CRTextInput label="Doctor Full Name" name="doctorName" />
            <CRTextInput label="Title" name="doctorTitle" />
            <CRTextInput label="Job Description" name="doctorJobDescription" />
            <CRTextInput label="Phone No" name="phoneNo" />
            <CRTextInput label="Address" name="address" />

            <LogoUpload
              onUpload={logo => {
                setLogo(logo);
                setFormValue(formValue);
              }}
              url={logo && logo.url}
            />
          </Div>
        </Form>
      </CRCard>
    </>
  );
}

export default StaticSettings;
