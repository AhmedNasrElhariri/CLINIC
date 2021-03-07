import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'rsuite';
import { Element } from 'react-scroll';
import useMedicinesDefinition from 'hooks/fetch-medicines-definition';
import MedicinesFilter from '../prescription/medicine-filter';

import {
  Div,
  H3,
  CRNumberInput,
  CRTextInput,
  CRTextArea,
  CRRadio,
  CRCheckBox,
  CRNestedSelector,
} from 'components';
import { isSession } from 'services/appointment';
import { convertGroupFieldsToNavs } from 'services/appointment';
import {
  NUMBER_FIELD_TYPE,
  TEXT_FIELD_TYPE,
  LONG_TEXT_FIELD_TYPE,
  RADIO_FIELD_TYPE,
  CHECK_FIELD_TYPE,
  NESTED_SELECTOR_FIELD_TYPE,
} from 'utils/constants';

import AppointmentImages from '../images';

import Prescription from '../prescription';
import Labs from '../labs';

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
        <CRCheckBox
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

const SectionContainer = ({ title, children, name, ...props }) => {
  return (
    <Div as={Element} name={name} {...props}>
      <Div p={4} minHeight={400}>
        <H3 mb={43}>{title}</H3>
        <Div mb={4} style={{ overflow: 'scroll', height: '330px' }}>
          {children}
        </Div>
      </Div>
    </Div>
  );
};

SectionContainer.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function AppointmentData({
  formValue,
  groups,
  onChange,
  disabled,
  appointment,
  appointmentFormValue,
  onChangeAppointment,
  arabicEnable,
  setArabicEnable,
}) {
  const navs = useMemo(() => convertGroupFieldsToNavs(groups), [groups]);

  const { medicines } = useMedicinesDefinition();
  const [medKey, setMedKey] = useState(0);
  const med = medicines[medKey];
  // const updatedMedicines = medicines.filter((med, indx) => indx != medKey);
  // updatedMedicines.unshift(med);
  const [filter, setFilter] = useState('');
  // const updatedMedicines = useMemo(() =>
  //   medicines.filter((med, indx) => indx != medKey);
  // ,[]);
  // const updatedMedicines = useMemo(() => {
  //   medicines.filter((m, indx) => indx != medKey);
  // }, [medKey, medicines]);
  const filteredMedicines = useMemo(
    () =>
      medicines.filter(m =>
        m.medicineName.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, medicines]
  );
  const handleCollectionsChange = useCallback(
    collections => {
      onChangeAppointment({
        ...appointmentFormValue,
        collections,
      });
    },
    [appointmentFormValue, onChangeAppointment]
  );

  const handleMedicineChange = useCallback(
    medicine => {
      onChangeAppointment({
        ...appointmentFormValue,
        medicine,
      });
    },
    [appointmentFormValue, onChangeAppointment]
  );
  const handleLabsChange = useCallback(
    labs => {
      onChangeAppointment({
        ...appointmentFormValue,
        labs,
      });
    },
    [appointmentFormValue, onChangeAppointment]
  );

  return (
    <>
      <Div display="flex">
        <Div flexGrow={1}>
          {!isSession(appointment) && Object.keys(formValue).length > 0 && (
            <>
              <Form formValue={formValue} onChange={onChange} fluid>
                {navs.map((v, idx) => (
                  <SectionContainer
                    key={idx}
                    title={v.title}
                    name={v.to}
                    pt={idx === 0 ? 0 : 4}
                  >
                    {v.fields.map(f => (
                      <Div mb={4} key={f.id}>
                        {renderItem({ ...f, disabled })}
                      </Div>
                    ))}
                  </SectionContainer>
                ))}
              </Form>
            </>
          )}
          <SectionContainer title="Notes" name="Notes">
            <Form
              formValue={appointmentFormValue}
              onChange={onChangeAppointment}
            >
              <CRTextArea name="notes" disabled={disabled} />
            </Form>
          </SectionContainer>
          <SectionContainer title="Images" name="Images">
            <AppointmentImages
              formValue={appointmentFormValue.collections}
              onChange={handleCollectionsChange}
            />
          </SectionContainer>
          <MedicinesFilter onNameChange={setFilter}></MedicinesFilter>
          <SectionContainer title="Prescription" name="prescription">
            <Prescription
              formValue={appointmentFormValue.medicine}
              onChange={handleMedicineChange}
              arabicEnable={arabicEnable}
              medicines={filteredMedicines}
            />
          </SectionContainer>
          <SectionContainer title="Labs" name="labs">
            <Labs
              formValue={appointmentFormValue.labs}
              onChange={handleLabsChange}
            />
          </SectionContainer>
        </Div>
      </Div>
    </>
  );
}

export default AppointmentData;
