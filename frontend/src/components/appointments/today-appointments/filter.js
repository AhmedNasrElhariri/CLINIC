import React from 'react';
import { Form, Row, Col } from 'rsuite';

import { CRSelectInput } from 'components';
import { mapArrWithIdsToChoices } from 'utils/misc';

function AppointmentsFilter({
  formValue,
  onChange,
  branches,
  doctors,
  specializations,
}) {
  console.log(formValue);
  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={8}>
          <CRSelectInput
            name="branch"
            label="Branch"
            block
            cleanable={true}
            searchable={true}
            data={mapArrWithIdsToChoices(branches)}
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="doctor"
            label="Doctor"
            block
            cleanable={true}
            searchable={true}
            data={mapArrWithIdsToChoices(doctors)}
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput
            name="specialization"
            label="Specialization"
            block
            cleanable={true}
            searchable={true}
            data={mapArrWithIdsToChoices(specializations)}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default AppointmentsFilter;
