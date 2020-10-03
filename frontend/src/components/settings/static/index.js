import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import * as R from 'ramda';
import { Form, Schema, Alert, Grid, Row, Col } from 'rsuite';

import { UPDATE_CLINIC } from 'apollo-client/queries';
import { Div, CRCard, H3, CRTextInput, CRButton } from 'components';
import LogoUpload from './logo-upload';
import useGlobalState from 'state';

import * as ls from 'services/local-storage';

const model = Schema.Model({});

const initialValues = {
  doctorName: '',
  doctorNameAr: '',
  doctorTitle: '',
  doctorTitleAr: '',
  doctorJobDescription: '',
  doctorJobDescriptionAr: '',
  phoneNo: '',
  phoneNo1: '',
  address: '',
  address1: '',
};

function StaticSettings() {
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
      ls.setCurrentClinic({ ...clinic, ...formValue, logo });
    },
    onError: () => Alert.error('Invalid Input'),
  });

  useEffect(() => {
    if (!R.isEmpty(clinic)) {
      const val = R.pick(Object.keys(initialValues))(clinic || {});
      const logo = R.path(['logo'])(clinic);
      setLogo(logo);
      setFormValue(val);
    }
  }, [clinic]);

  console.log(clinic);

  if (R.isNil(clinic)) {
    return <H3>Please Select Clinic</H3>;
  }

  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <H3 mb={64}>Static Info</H3>
        <CRButton
          primary
          small
          onClick={() =>
            updateClinic({
              variables: {
                clinic: {
                  ...formValue,
                  id: clinic.id,
                  logoId: R.prop('id')(logo),
                },
              },
            })
          }
        >
          Save
        </CRButton>
      </Div>
      <CRCard borderless>
        <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
          <Div>
            <Grid fluid>
              <Row gutter={30}>
                <Col md={12}>
                  <CRTextInput label="Doctor's Name" name="doctorName" />
                  <CRTextInput label="Title" name="doctorTitle" />
                  <CRTextInput
                    label="Job Description"
                    name="doctorJobDescription"
                  />
                  <CRTextInput label="Phone No 1" name="phoneNo" />
                  <CRTextInput label="Phone No 2" name="phoneNo1" />
                  <CRTextInput label="Address 1" name="address" />
                  <CRTextInput label="Address 2" name="address1" />
                </Col>
                <Col md={12}>
                  <CRTextInput
                    label="Doctor's Name (Arabic)"
                    name="doctorNameAr"
                  />
                  <CRTextInput label="Title (Arabic)" name="doctorTitleAr" />
                  <CRTextInput
                    label="Job Description (Arabic)"
                    name="doctorJobDescriptionAr"
                  />
                </Col>
              </Row>
            </Grid>

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
