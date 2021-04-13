import React, { useRef } from 'react';
import { Form, SelectPicker } from 'rsuite';
import ReactQuill from 'react-quill';

import { CRSelectInput, CRButton, Div } from 'components';
import { useReactToPrint } from 'react-to-print';
import Label from '../widgets/label';
import styled from 'styled-components';
import { usePatientReports, useForm } from 'hooks';

const initValue = { patientReport: '', body: '' };

function ReportPrintout() {
  const { formValue, setFormValue } = useForm({
    initValue,
  });
  const ref = useRef();
  const { patientReports } = usePatientReports({
    onCreate: () => {},
    onEdit: () => {},
  });
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  const CustomButton = styled(CRButton)`
    float: right;
    margin-bottom: 3px;
  `;
  const CustomCRSelector = styled(CRSelectInput)`
    width: 40%;
    float: left;
  `;

  return (
    <>
      <Div>
        <Label>Patient Reports </Label>
        <CustomButton onClick={handlePrint} variant="primary">
          Print
        </CustomButton>
      </Div>

      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CustomCRSelector
          name="patientReport"
          placeholder="Patient Reports"
          cleanable={true}
          accepter={SelectPicker}
          data={patientReports}
          virtualized={false}
          block
        />
        <ReactQuill
          theme="snow"
          name="body"
          style={{ marginTop: 10 }}
          value={
            formValue.patientReport ? formValue.patientReport : formValue.body
          }
          onChange={value => setFormValue({ body: value })}
        />
      </Form>
      <div style={{ visibility: 'hidden' }}>
        <div ref={ref} dangerouslySetInnerHTML={{ __html: formValue.body }} />
      </div>
    </>
  );
}

export default ReportPrintout;
