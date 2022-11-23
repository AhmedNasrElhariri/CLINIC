import React from 'react';
import PropTypes from 'prop-types';
import { CRCard, H3 } from 'components';
import EditPatient from '../edit-patient';
import {
  PatientInfoStyled,
  Cell,
  CellTitle,
  AddressStyled,
  StrongStyled,
  EditButton,
} from './style';
import { useTranslation } from 'react-i18next';

const PatientInfo = ({ patient }) => {
  const { t } = useTranslation();
  return (
    <PatientInfoStyled>
      <CRCard borderless>
        <Cell height={64}>
          <H3>{t('information')}</H3>
          <EditPatient patient={patient} editName={t('edit')}/>
          <EditButton>{t('expand')}</EditButton>
        </Cell>
        <Cell>
          <CellTitle>{t('name')}</CellTitle>
          <StrongStyled>{patient.name}</StrongStyled>
        </Cell>
        <Cell>
          <CellTitle>{t('age')}</CellTitle>
          <AddressStyled>{patient.age}</AddressStyled>
        </Cell>
        <Cell>
          <CellTitle>{t('phoneNo')}</CellTitle>
          <AddressStyled>{patient.phoneNo}</AddressStyled>
        </Cell>
        {patient.phoneNoTwo && (
          <Cell>
            <CellTitle>{t('phoneNoTwo')}</CellTitle>
            <AddressStyled>{patient.phoneNoTwo}</AddressStyled>
          </Cell>
        )}
        {patient.notes && (
          <Cell>
            <CellTitle>{t('notes')}</CellTitle>
            <AddressStyled>{patient.notes}</AddressStyled>
          </Cell>
        )}
      </CRCard>
    </PatientInfoStyled>
  );
};

PatientInfo.propTypes = {
  patient: PropTypes.object.isRequired,
};

export default PatientInfo;
