import React from 'react';
import { Form, Row, Col } from 'rsuite';
import { CRTextInput } from 'components';

function RoleInput({ formValue, onChange }) {
  return (
    <Form formValue={formValue} onChange={onChange} fluid>
      <Row gutter={16}>
        <Col xs={8}>
          <CRTextInput name="role" label="Role Name" />
        </Col>
      </Row>
    </Form>
  );
}

export default RoleInput;
