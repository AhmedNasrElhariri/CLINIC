import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Form } from 'rsuite';
import ReactToPrint from 'react-to-print';
import { ACTIONS } from 'utils/constants';
import 'react-quill/dist/quill.snow.css';
import { CRSelectInput, CRButton, Div } from 'components';
import { useTranslation } from 'react-i18next';
import Label from '../widgets/label';
import styled from 'styled-components';
import {
  usePatientReports,
  useForm,
  usePatients,
  useAppointments,
  useConfigurations,
  usePatientView,
  usePatientSurgeries,
  useTodayAppointments,
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
  const { t } = useTranslation();
  const pageSetupRow = pageSetupData.find(
    element => element.type === 'reportPrintout'
  );
  const { userPatientFields } = usePatientView();
  const [patientSearchValue, setPatientSearchValue] = useState('');
  const { searchedPatients } = usePatients({
    patientSearchValue: patientSearchValue,
  });
  const { todayAppointments } = useTodayAppointments({
    action: ACTIONS.List_Appointment,
  });
  const { patientSurgeries } = usePatientSurgeries({});
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
    } else if (context === 'surgeries') {
      return patientSurgeries.map(s => {
        return {
          name: s?.surgery.name,
          id: s,
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
      newBody = newBody.replaceAll('surgeries_current_date', CurrentDate);
      setFormValue({ ...formValue, body: newBody });
    }
  }, [formValue.data]);
  const checkOne = Object.keys(formValue.patientReport).length !== 0;

  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <Label>{t('patientReports')}</Label>
        <ReactToPrint
          trigger={() => <CRButton variant="primary">{t('print')}</CRButton>}
          content={() => ref.current}
        />
      </Div>

      <Form fluid formValue={formValue} onChange={setFormValue}>
        <CRSelectInput
          formGroupClassName="!max-w-xl"
          name="patientReport"
          placeholder={t('patientReports')}
          data={values}
          block
        />
        {formValue.context && checkOne && formValue.context === 'patient' ? (
          <CRSelectInput
            formGroupClassName="!max-w-xl"
            label={t('patient')}
            name="data"
            onSearch={v => setPatientSearchValue(v)}
            data={dataValue}
            virtualized={false}
            block
          />
        ) : formValue.context &&
          checkOne &&
          formValue.context === 'appointment' ? (
          <CRSelectInput
            formGroupClassName="!max-w-xl"
            label={t('appointment')}
            name="data"
            data={dataValue}
            virtualized={false}
            block
          />
        ) : (
          formValue.context &&
          checkOne && (
            <CRSelectInput
              formGroupClassName="!max-w-xl"
              label="Surgery"
              name="data"
              data={dataValue}
              virtualized={false}
              block
            />
          )
        )}

        <CRSelectInput
          formGroupClassName="!max-w-xl"
          label={t('contextData')}
          name="context"
          block
          data={contextData}
        />
        <div className="mt-3 max-w-5xl">
          <Editor
            onChange={handleText}
            formValue={formValue}
            pageSetupData={pageSetupData}
          />
        </div>
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
