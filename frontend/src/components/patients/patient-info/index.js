import PropTypes from 'prop-types';
import { CRCard, H3, Div } from 'components';
import EditPatient from '../edit-patient';
import {
  PatientInfoStyled,
  Cell,
  CellTitle,
  AddressStyled,
  StrongStyled,
} from './style';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'utils/date';

const PatientInfo = ({ patient }) => {
  const { t } = useTranslation();
  return (
    <PatientInfoStyled>
      <CRCard borderless>
        <Cell height={64}>
          <H3>{t('information')}</H3>
          <EditPatient patient={patient} editName={t('edit')} />
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
        <Cell>
          <CellTitle>{t('code')}</CellTitle>
          <AddressStyled>{patient.code}</AddressStyled>
        </Cell>
        <Cell>
          <CellTitle>{t('gender')}</CellTitle>
          <AddressStyled>{patient.sex}</AddressStyled>
        </Cell>
        <Cell>
          <CellTitle>{t('maritalStatus')}</CellTitle>
          <AddressStyled>{patient.maritalStatus}</AddressStyled>
        </Cell>
        <Cell>
          <CellTitle>{t('patientLevel')}</CellTitle>
          <AddressStyled>{patient.patientLevel}</AddressStyled>
        </Cell>
        <Cell>
          <CellTitle>{t('email')}</CellTitle>
          <AddressStyled>{patient.email}</AddressStyled>
        </Cell>
        <Cell>
          <CellTitle>{t('area')}</CellTitle>
          <AddressStyled>{patient.area}</AddressStyled>
        </Cell>
        <Cell>
          <CellTitle>{t('cardNumber')}</CellTitle>
          <AddressStyled>{patient.cardId}</AddressStyled>
        </Cell>
        <Cell>
          <CellTitle>{t('cardExpiryDate')}</CellTitle>
          <AddressStyled>
            {patient?.cardExpiryDate && formatDate(patient.cardExpiryDate)}
          </AddressStyled>
        </Cell>
        <Cell>
          <CellTitle>{t('reference')}</CellTitle>
          <AddressStyled>
            {
              <Div display="flex">
                {patient.reference?.map(r => (
                  <Div>
                    {' - '}
                    {r}
                    {'  '}
                  </Div>
                ))}
              </Div>
            }
          </AddressStyled>
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
