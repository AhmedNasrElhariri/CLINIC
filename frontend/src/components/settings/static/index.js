import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as R from 'ramda';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Schema,
  Alert,
  Panel,
  PanelGroup,
} from 'rsuite';

import { UPDATE_CLINIC, GET_MY_CLINIC } from 'apollo-client/queries';
import { Div } from 'components';
import LogoUpload from './logo-upload';

const { StringType, NumberType } = Schema.Types;

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
  const { data, loading } = useQuery(GET_MY_CLINIC);
  const [updateClinic] = useMutation(UPDATE_CLINIC, {
    onCompleted: () => {
      Alert.success('Clinic Info has been Updated Successfully');
    },
    onError: () => Alert.error('Invalid Input'),
    update(cache) {
      const { myClinic } = cache.readQuery({ query: GET_MY_CLINIC });
      cache.writeQuery({
        query: GET_MY_CLINIC,
        data: {
          myClinic: { ...myClinic, ...formValue, logo },
        },
      });
    },
  });

  useEffect(() => {
    if (!loading) {
      const val = R.pick([
        'doctorName',
        'doctorTitle',
        'doctorJobDescription',
        'address',
        'phoneNo',
      ])(data.myClinic);
      const logo = R.path(['myClinic', 'logo'])(data);
      setLogo(logo);
      setFormValue(val);
    }
  }, [data, loading]);

  if (loading) return 'Loading ...';

  return (
    <PanelGroup bordered>
      <Panel header="Static Info">
        <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
          <Div width={600}>
            <FormGroup>
              <ControlLabel>Doctor Full Name</ControlLabel>
              <FormControl name="doctorName" />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl name="doctorTitle" />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Job Description</ControlLabel>
              <FormControl name="doctorJobDescription" />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Phone No</ControlLabel>
              <FormControl name="phoneNo" />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Address</ControlLabel>
              <FormControl name="address" componentClass="textarea" />
            </FormGroup>

            <LogoUpload
              onUpload={logo => {
                setLogo(logo);
                setFormValue(formValue);
              }}
              url={logo && logo.url}
            />

            <Div mt={3}>
              <Button
                appearance="primary"
                onClick={() =>
                  updateClinic({
                    variables: {
                      clinic: { ...formValue, logoId: logo.id },
                    },
                  })
                }
              >
                Save
              </Button>
            </Div>
          </Div>
        </Form>
      </Panel>
      {/* <Panel header="Working Hours">
      </Panel> */}
    </PanelGroup>
  );
}

export default StaticSettings;
