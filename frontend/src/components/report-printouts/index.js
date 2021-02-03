import React, { useRef } from "react";
import { Form, SelectPicker } from "rsuite";
import { CRSelectInput, CRButton, Div } from "components";
import useFrom from "hooks/form";
import usePatientReports from "hooks/fetch-patient-reports";
import ReactQuill from "react-quill";
import { useReactToPrint } from "react-to-print";
import Label from "../widgets/label";
import styled from "styled-components";

const initValue = { patientReport: "", body: "" };

function ReportPrintout() {
  const { formValue, setFormValue } = useFrom({
    initValue,
  });
  const ref = useRef();
  const { patientReports } = usePatientReports({
    onCreate: () => {},
    onEdit: () => {},
  });
  console.log(formValue);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  const CustomButton = styled(CRButton)`
    float: right;
    margin-bottom: 3px;
  `;
  const CustomCRSelector = styled(CRSelectInput)`
    width: 40%;
    margin: auto;
  `;
  console.log(formValue);

  return (
    <>
      <Div>
        <Label>Patient Reports </Label>
        <CustomButton onClick={handlePrint} small primary>
          Print
        </CustomButton>
      </Div>

      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CustomCRSelector
          name="patientReport"
          placeholder="Patient Reports"
          cleanable={true}
          accepter={SelectPicker}
          labelKey="name"
          valueKey="body"
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
          onChange={(value) => setFormValue({ body: value })}
        />
      </Form>

      <div ref={ref} dangerouslySetInnerHTML={{ __html: formValue.body }} />
    </>
  );
}

export default ReportPrintout;
