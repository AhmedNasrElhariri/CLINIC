import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Form, Alert } from 'rsuite';
import * as R from 'ramda';
import usePatientHistory from '../patient/use-patient-history';
import { convertGroupFieldsToNavs } from 'services/appointment';
import { useQuery, useMutation } from '@apollo/client';
import { Element } from 'react-scroll';
import {
  mapFormValueToAppointmentData,
  getFormInitValues,
} from 'services/appointment';
import {
  Div,
  H3,
  CRNumberInput,
  CRTextInput,
  CRTextArea,
  CRRadio,
  CRCheckBoxGroup,
  CRNestedSelector,
  CRButton,
} from 'components';
import {
  NUMBER_FIELD_TYPE,
  TEXT_FIELD_TYPE,
  LONG_TEXT_FIELD_TYPE,
  RADIO_FIELD_TYPE,
  CHECK_FIELD_TYPE,
  NESTED_SELECTOR_FIELD_TYPE,
} from 'utils/constants';
import { UPDATE_PATIENT_FIELD, GET_PATIENT_FIELD } from 'apollo-client/queries';
const SectionContainer = ({ title, children, name, ...props }) => {
  return (
    <Div as={Element} name={name} {...props}>
      <Div px={4} my={2}>
        <H3 mb={10}>{title}</H3>
        <Div mb={4}>{children}</Div>
      </Div>
    </Div>
  );
};
const renderItem = ({ type, id, name, choices = [], ...props }) => {
  switch (type) {
    case NUMBER_FIELD_TYPE:
      return <CRNumberInput label={name} name={id} {...props} />;
    case TEXT_FIELD_TYPE:
      return <CRTextInput label={name} name={id} {...props} />;
    case LONG_TEXT_FIELD_TYPE:
      return <CRTextArea label={name} name={id} {...props} importable />;
    case RADIO_FIELD_TYPE:
      return (
        <CRRadio label={name} name={id} options={choices} {...props} inline />
      );
    case CHECK_FIELD_TYPE:
      return (
        <CRCheckBoxGroup
          label={name}
          options={choices}
          name={id}
          {...props}
          inline
        />
      );
    case NESTED_SELECTOR_FIELD_TYPE:
      return (
        <CRNestedSelector label={name} name={id} choices={choices} {...props} />
      );
    default:
      return null;
  }
};

const PatientInformationCreation = ({ patient }) => {
  const [formValue, setFormValue] = useState({});
  const { data: patientFieldData } = useQuery(GET_PATIENT_FIELD, {
    variables: {
      patientId: patient?.id,
    },
  });
  const fields = useMemo(
    () => R.propOr([], 'getPatientField')(patientFieldData),
    [patientFieldData]
  );
  const { patientGroups, normalizedPatientFields } = usePatientHistory({
    patientId: patient?.id,
    appointment: { data: fields },
  });
  const navs = useMemo(
    () => convertGroupFieldsToNavs(patientGroups),
    [patientGroups]
  );
  const [update] = useMutation(UPDATE_PATIENT_FIELD, {
    onCompleted: () => {
      Alert.success('Patient Field has been updates successfully');
    },
  });
  const data = mapFormValueToAppointmentData(
    normalizedPatientFields,
    formValue
  );
  const handleSave = useCallback(() => {
    update({ variables: { patientId: patient?.id, data: data } });
  }, [data, update]);
  useEffect(() => {
    setFormValue(getFormInitValues(normalizedPatientFields));
  }, [normalizedPatientFields]);
  return (
    <>
      <CRButton onClick={handleSave}>Save</CRButton>
      <Form formValue={formValue} onChange={setFormValue} fluid>
        {navs.map((v, idx) => (
          <SectionContainer
            key={idx}
            title={v.title}
            name={v.to}
            pt={idx === 0 ? 0 : 4}
          >
            {v.fields.map(f => (
              <Div mb={4} key={f.id}>
                {renderItem({ ...f })}
              </Div>
            ))}
          </SectionContainer>
        ))}
      </Form>
    </>
  );
};

export default PatientInformationCreation;
