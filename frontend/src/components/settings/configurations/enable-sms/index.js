import React from 'react';
import { Toggle, Form } from 'rsuite';
import { CRCard, H4, Div, CRTextInput } from 'components';
const EnableSMS = ({ onChange, formValue }) => {
  return (
    <CRCard borderless style={{ marginTop: '10px' }}>
      <Div display="flex" justifyContent="space-between" mb={3}>
        <H4>Enable SMS</H4>
        <Toggle
          onChange={val => onChange({ ...formValue, enableSMS: val })}
          checked={formValue?.enableSMS}
        />
      </Div>

      <Form formValue={formValue} onChange={onChange} fluid>
        <Div display="flex" mb={3}>
          <Div mr="50px">
            <CRTextInput name="orgName" label="Name" />
          </Div>
          <CRTextInput name="orgPhoneNo" label="Phone No" block />
        </Div>
      </Form>
    </CRCard>
  );
};

EnableSMS.propTypes = {};

EnableSMS.defaultProps = {};

export default EnableSMS;
