import Filter from './filter';
import ListSessions from './list-sessions';
import NewSessionToDoctor from './new-session-to-doctor';
import { useDoctor, useModal, useSessionDefinition } from 'hooks';
import { useCallback, useState } from 'react';
import * as R from 'ramda';
import { useTranslation } from 'react-i18next';
const initialValues = {
  doctorId: null,
  sessionId: null,
  feesCalculationMethod: null,
  feesCalculationType: null,
  fees: 0,
};
const DoctorSessions = () => {
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState(initialValues);
  const [type, setType] = useState('');
  const [filter, setFilter] = useState({ doctorId: null, status: 'Draft' });
  const { t } = useTranslation();
  const { sessionsDefinition } = useSessionDefinition({});
  const {
    doctors,
    addSessionToDoctor,
    deleteSessionToDoctor,
    doctorSessionsDefinations,
  } = useDoctor({
    onCreateUser: close,
    onEditUser: close,
    onCreateSessionToDoctor: () => {
      close();
      setFormValue(initialValues);
    },
    doctorId: filter?.doctorId,
  });
  const handleClickAddSessionToDoctor = useCallback(() => {
    setType('newSession');
    open();
  }, [open, setType]);
  const handleDeleteSession = useCallback(
    data => {
      const sessionId = R.propOr('', 'id')(data);
      setType('delete');
      setFormValue({ sessionId: sessionId });
      open();
    },
    [open, setFormValue, setType]
  );
  const handleAdd = useCallback(() => {
    if (type === 'newSession') {
      addSessionToDoctor(formValue);
    } else {
      deleteSessionToDoctor({ variables: { sessionId: formValue.sessionId } });
    }
  }, [addSessionToDoctor, deleteSessionToDoctor, formValue, type]);
  return (
    <>
      <Filter
        filter={filter}
        setFilter={setFilter}
        doctors={doctors}
        t={t}
        onAddSessionToDoctor={handleClickAddSessionToDoctor}
      />
      <ListSessions
        sessions={doctorSessionsDefinations}
        onDeleteSession={handleDeleteSession}
        t={t}
      />
      <NewSessionToDoctor
        show={visible}
        onHide={close}
        onCancel={close}
        onOk={handleAdd}
        formValue={formValue}
        onChange={setFormValue}
        type={type}
        sessionsDefinition={sessionsDefinition}
        users={doctors}
        t={t}
      />
    </>
  );
};
export default DoctorSessions;
