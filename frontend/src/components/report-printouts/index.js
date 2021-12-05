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
  usePatientView,
} from 'hooks';
import Editor from 'components/settings/static/editor';
import { formatDate } from 'utils/date';
const StyledDiv = styled.pre`
  direction: rtl;
  text-align: right;

  @media print and (max-width: 499px) {
    padding-right: ${props => props.mr}px;
    padding-top: ${props => props.mt}px;
    padding-bottom: ${props => props.mb}px;
    padding-left: ${props => props.ml}px;
  }
`;
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
  const pageSetupRow = pageSetupData.find(
    element => element.type === 'reportPrintout'
  );
  const { userPatientFields } = usePatientView();
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
          const val =
            key === 'date'
              ? { name: name, value: formatDate(value) }
              : { name: name, value: value };
          dataMap.push(val);
        }
      }
    }
    return dataMap;
  }, [formValue.context, formValue.data]);
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
  const updatedFields = useMemo(() => {
    const { data, context } = formValue;
    let fields = [];
    if (context === 'patient') {
      const filteredFields = userPatientFields.filter(f => {
        if (f.patient.id == data.id) {
          return f;
        }
      });
      filteredFields.forEach(f => {
        const name = 'patient_' + f.field.name;
        const val = f.value;
        const obj = { name: name, value: val };
        fields.push(obj);
      });
    }
    return fields;
  }, [formValue]);
  useEffect(() => {
    const { data } = formValue;
    const CurrentDate = formatDate(new Date());
    let dataMap = [];
    if (Object.keys(data).length !== 0) {
      dataMap = structureValues.concat(updatedFields);
      let newBody = formValue?.patientReport.body;
      newBody = newBody.replaceAll('$', '');
      dataMap.forEach(element => {
        const name = element.name;
        const value = element.value;
        newBody = newBody.replaceAll(name, value);
      });
      newBody = newBody.replaceAll('appointment_current_date', CurrentDate);
      newBody = newBody.replaceAll('patient_current_date', CurrentDate);
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
        <StyledDiv
          ref={ref}
          mt={pageSetupRow?.top * 37.7952755906 || 0}
          mr={pageSetupRow?.right * 37.7952755906 || 0}
          mb={pageSetupRow?.bottom * 37.7952755906 || 0}
          ml={pageSetupRow?.left * 37.7952755906 || 0}
        >
          <pre
            dangerouslySetInnerHTML={{ __html: formValue.body }}
            style={{ direction: 'rtl', textAlign: 'right' }}
          ></pre>
        </StyledDiv>
      </Div>
    </>
  );
}

export default ReportPrintout;
