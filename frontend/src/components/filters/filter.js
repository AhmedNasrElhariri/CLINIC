import React, { useEffect } from 'react';
import { Form, Row, Col } from 'rsuite';
import { set, get } from 'services/local-storage';
import { CRSelectInput } from 'components';
import { useNewAppointment } from 'hooks';
function AppointmentsFilter({ formValue, onChange }) {
  const { branches, specialties, doctors } = useNewAppointment({});
  useEffect(() => {
    onChange({ ...formValue, branch: get('branch') });
  }, [get('branch')]);
  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={8}>
          <CRSelectInput
            name="specialty"
            label="Specialty"
            block
            data={specialties}
          />
        </Col>
        <Col xs={8}>
          <CRSelectInput name="branch" label="Branch" data={branches} block />
        </Col>
        <Col xs={8}>
          <CRSelectInput name="doctor" label="User" block data={doctors} />
        </Col>
      </Row>
    </Form>
  );
}

export default AppointmentsFilter;
