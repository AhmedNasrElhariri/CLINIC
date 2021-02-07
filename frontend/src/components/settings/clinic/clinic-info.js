import React from 'react';
import { Form, FlexboxGrid, Schema } from 'rsuite';

import { Div, CRCard } from 'components';
import { CRNumberInput } from 'components/widgets';

const model = Schema.Model({});

function AppointmentSettings({ formValue, onChange }) {
  return (
    <CRCard borderless>
      <Form fluid model={model} formValue={formValue} onChange={onChange}>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={12}>
            <Div maxWidth={447}>
              <CRNumberInput
                label="Examination Price"
                name="examinationPrice"
              />
              <CRNumberInput
                label="Urgent Appointment Price"
                name="urgentPrice"
              />
              {/* <CRNumberInput label="Duration (min)" name="duration" /> */}
            </Div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}>
            <Div maxWidth={447}>
              <CRNumberInput label="Followup Price" name="followupPrice" />

              {/* <CRNumberInput label="Counts per day" name="appointmentsCount" /> */}
            </Div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Form>
    </CRCard>
  );
}

export default AppointmentSettings;
