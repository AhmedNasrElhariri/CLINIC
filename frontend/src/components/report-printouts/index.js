import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Form } from 'rsuite';
import ReactToPrint from 'react-to-print';
import { ACTIONS } from 'utils/constants';
import 'react-quill/dist/quill.snow.css';
import { CRSelectInput, CRButton, Div } from 'components';
import { useReactToPrint } from 'react-to-print';
import Label from '../widgets/label';
import styled from 'styled-components';
import {
  usePatientReports,
  useForm,
  usePatients,
  useAppointments,
  useConfigurations,
} from 'hooks';
import Editor from 'components/settings/static/editor';
const initValue = { patientReport: {}, body: '', context: '', data: {} };
const contextData = [
  { id: 'patient', name: 'Patient' },
  { id: 'appointment', name: 'Appointment' },
  { id: 'surgeries', name: 'Surgeries' },
];
function ReportPrintout() {
  const { formValue, setFormValue } = useForm({
    initValue,
  });
  const { pageSetupData } = useConfigurations();
  const [patientSearchValue, setPatientSearchValue] = useState('');
  const { searchedPatients } = usePatients({
    patientSearchValue: patientSearchValue,
  });
  const { todayAppointments } = useAppointments({
    action: ACTIONS.List_Appointment,
  });
  const ref = useRef();
  const { patientReports } = usePatientReports({
    onCreate: () => {},
    onEdit: () => {},
  });
  const values = patientReports.map(pR => {
    return {
      name: pR.name,
      id: pR,
    };
  });
  const dataValue = useMemo(() => {
    const { context } = formValue;
    if (context === 'patient') {
      return searchedPatients.map(pR => {
        return {
          name: pR.name,
          id: pR,
        };
      });
    } else if (context === 'appointment') {
      return todayAppointments.map(a => {
        return {
          name: a.patient.name,
          id: a,
        };
      });
    }
  }, [formValue.context]);
  const structureValues = useMemo(() => {
    let { context, data } = formValue;
    let dataMap = [];
    if (context !== '') {
      for (const [key, value] of Object.entries(data)) {
        if (value && typeof value === 'object' && value != null) {
          for (const [updatedKey, updatedValue] of Object.entries(value)) {
            const updatedContext = context + '_' + key;
            const name = updatedContext + '_' + updatedKey;
            const val = { name: name, value: updatedValue };
            dataMap.push(val);
          }
        } else {
          const name = context + '_' + key;
          const val = { name: name, value: value };
          dataMap.push(val);
        }
      }
    }
    return dataMap;
  }, [formValue.context, formValue.data]);

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
  const handleText = content => {
    setFormValue({ ...formValue, body: content });
  };
  useEffect(() => {
    const { patientReport } = formValue;
    if (Object.keys(patientReport).length !== 0) {
      setFormValue({
        ...formValue,
        body: formValue?.patientReport.body,
        context: formValue?.patientReport.context,
      });
    } else {
      setFormValue(initValue);
    }
  }, [formValue.patientReport]);
  useEffect(() => {
    const { data } = formValue;
    let dataMap = [];
    if (Object.keys(data).length !== 0) {
      dataMap = structureValues;
      let newBody = formValue?.patientReport.body;
      newBody = newBody.replaceAll('$', '');
      dataMap.forEach(element => {
        const name = element.name;
        const value = element.value;
        newBody = newBody.replaceAll(name, value);
      });
      setFormValue({ ...formValue, body: newBody });
    }
  }, [formValue.data]);
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
        <CRSelectInput
          name="patientReport"
          placeholder="Patient Reports"
          data={values}
          style={{ width: '1000px' }}
          block
        />
        {formValue.context === 'patient' ? (
          <CRSelectInput
            label="Patient"
            name="data"
            onSearch={v => setPatientSearchValue(v)}
            style={{ width: '1000px' }}
            data={dataValue}
            virtualized={false}
            block
          />
        ) : formValue.context === 'appointment' ? (
          <CRSelectInput
            label="Appointment"
            name="data"
            data={dataValue}
            style={{ width: '1000px' }}
            virtualized={false}
            block
          />
        ) : (
          ''
        )}

        <CRSelectInput
          label="Context Data"
          name="context"
          style={{ width: '1000px' }}
          block
          data={contextData}
        />
        <Div width={'1000px'}>
          <Editor
            onChange={handleText}
            formValue={formValue}
            pageSetupData={pageSetupData}
          />
        </Div>
      </Form>
      <Div style={{ overflow: 'hidden', height: '0px' }}>
        <Div ref={ref} m={50}>
          <pre
            dangerouslySetInnerHTML={{ __html: formValue.body }}
            style={{ direction: 'rtl', textAlign: 'right' }}
          ></pre>
        </Div>
      </Div>
    </>
  );
}

export default ReportPrintout;
