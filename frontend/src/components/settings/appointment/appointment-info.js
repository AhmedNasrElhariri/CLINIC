import React, { useState } from 'react';
import { Form, FlexboxGrid, Schema } from 'rsuite';

import { Div, CRCard } from 'components';
import { CRNumberInput } from 'components/widgets';

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
    <CRCard borderless>
      <Form
        fluid
        model={model}
        formValue={formValue}
        onChange={value => SetFormValue(value)}
      >
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={12}>
            <Div maxWidth={447}>
              <CRNumberInput
                label="Examination Price"
                name="examinationPrice"
              />
              <CRNumberInput label="Duration (min)" name="duration" />
            </Div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}>
            <Div maxWidth={447}>
              <CRNumberInput label="Followup Price" name="followupPrice" />
              <CRNumberInput label="Counts per day" name="count" />
            </Div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
    </CRCard>
  );
}

export default AppointmentSettings;
