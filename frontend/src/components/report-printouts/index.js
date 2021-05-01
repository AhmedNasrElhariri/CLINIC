import React, { useRef } from 'react';
import { Form } from 'rsuite';
import ReactQuill from 'react-quill';
import ReactToPrint from 'react-to-print';
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
  const values = patientReports.map(pR => {
    return {
      name: pR.name,
      id: pR.body,
    };
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
      <Div display="flex" justifyContent="space-between">
        <Label>Patient Reports </Label>
        <ReactToPrint
          trigger={() => <CRButton variant="primary">Print</CRButton>}
          content={() => ref.current}
        />
      </Div>

      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CustomCRSelector
          name="patientReport"
          placeholder="Patient Reports"
          data={values}
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
      <Div style={{ overflow: 'hidden', height: '0px' }}>
        <Div ref={ref} m={50}>
          <div dangerouslySetInnerHTML={{ __html: formValue.body }}></div>
        </Div>
      </Div>
    </>
  );
}

export default ReportPrintout;
