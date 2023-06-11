import { CRButton, Div } from 'components/widgets';
import { useState } from 'react';
import Filter from './filter';
import { useTranslation } from 'react-i18next';
import { usePatientNotes } from 'hooks';
import ListPatientNotes from './list-patient-notes';

const PatientNotes = ({ patient }) => {
  const [period, setPeriod] = useState([]);
  const { t } = useTranslation();
  const { patientNotes } = usePatientNotes({
    patientId: patient.id,
    dateFrom: period[0],
    dateTo: period[1],
  });

  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <Filter setPeriod={setPeriod} t={t} />
        <Div display="flex">
          <CRButton mr="10px">Add</CRButton>
          <CRButton>Delete</CRButton>
        </Div>
      </Div>
      <ListPatientNotes notes={patientNotes} />
    </>
  );
};
export default PatientNotes;
