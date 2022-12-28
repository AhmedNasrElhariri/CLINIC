// import NumberFormat from 'react-number-format';
import { H5, Div } from 'components';
import { useEffect } from 'react';
import { Form, InputNumber } from 'rsuite';
export default function Price({
  name,
  price,
  variant,
  formValue,
  setFormValue,
}) {
  return (
    <Form formValue={formValue} onChange={setFormValue}>
      <Div display="flex">
        <Div display="flex">
          <H5 variant={variant} weight="semiBold" mr="5px" mt="3px">
            {name} EGP
          </H5>
          <InputNumber
            name="total"
            value={formValue.total}
            onChange={v => {
              setFormValue({ ...formValue, total: v });
            }}
            style={{ width: '70px', height: '30px' }}
          />
        </Div>
        <Div display="flex">
          <H5 variant={variant} weight="semiBold" m="3px 5px 0px 5px">
            Patient Fees
          </H5>
          <InputNumber
            name="patientFees"
            value={formValue.patientFees}
            onChange={v => {
              setFormValue({ ...formValue, patientFees: v });
            }}
            style={{ width: '70px', height: '30px' }}
          />
        </Div>
      </Div>
    </Form>
  );
}
