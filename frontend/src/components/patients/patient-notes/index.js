import { CRButton, Div } from 'components/widgets';
import { useCallback, useState } from 'react';
import Filter from './filter';
import { useTranslation } from 'react-i18next';
import { usePatientNotes, useModal } from 'hooks';
import ListPatientNotes from './list-patient-notes';
import BusinessNotes from './notes-actions';

const PatientNotes = ({ patient }) => {
  const [period, setPeriod] = useState([]);
  const { visible, open, close } = useModal();
  const [notes, setNotes] = useState({ businessNotes: '', id: null });
  const [type, setType] = useState('');
  const { t } = useTranslation();

  const { patientNotes, updateNotes, deleteNotes } = usePatientNotes({
    patientId: patient.id,
    dateFrom: period[0],
    dateTo: period[1],
  });
  const handleAddNotes = useCallback(() => {
    open();
    setType('add');
  }, [open, setType]);

  const handleOk = useCallback(() => {
    close();
    if (type === 'add') {
      updateNotes({
        variables: {
          notes: notes.businessNotes,
          patientId: patient.id,
        },
      });
    } else {
      deleteNotes({
        variables: {
          id: notes.id,
        },
      });
    }
  }, [patient, updateNotes, notes, close]);
  const handleDeleteIcon = useCallback(
    note => {
      setNotes({ businessNotes: note.text, id: note.id });
      open();
      setType('delete');
    },
    [open, setType, setNotes]
  );
  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <Filter setPeriod={setPeriod} t={t} />
        <Div display="flex">
          <CRButton mr="10px" onClick={handleAddNotes}>
            Add
          </CRButton>
        </Div>
      </Div>
      <BusinessNotes
        show={visible}
        onCancel={close}
        notes={notes}
        setNotes={setNotes}
        onOk={handleOk}
        t={t}
        type={type}
      />
      <ListPatientNotes notes={patientNotes} onDeleteNote={handleDeleteIcon} />
    </>
  );
};
export default PatientNotes;
