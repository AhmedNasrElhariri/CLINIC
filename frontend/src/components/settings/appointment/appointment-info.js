import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Form,
  InputNumber,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Schema,
} from 'rsuite';

import { Div } from 'components';

const model = Schema.Model({});

const initialValues = {
  examinationPrice: '',
  followupPrice: '',
  duration: '',
  count: '',
};

function AppointmentSettings({ onCreate }) {
  const [formValue, SetFormValue] = useState(initialValues);

  return (
    <>
      <Form
        fluid
        model={model}
        formValue={formValue}
        onChange={value => SetFormValue(value)}
      >
        <Div width={300}>
          <FormGroup>
            <ControlLabel>Examination Price</ControlLabel>
            <FormControl name="examinationPrice" accepter={InputNumber} />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Followup Price</ControlLabel>
            <FormControl name="followupPrice" accepter={InputNumber} />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Duration</ControlLabel>
            <FormControl name="duration" accepter={InputNumber} />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Count per day</ControlLabel>
            <FormControl name="count" accepter={InputNumber} />
          </FormGroup>
        </Div>
      </Form>
      <Div mt={2}>
        <Button appearance="primary">Save</Button>
      </Div>
    </>
  );
}

export default AppointmentSettings;
