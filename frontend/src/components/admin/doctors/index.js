import { useCallback, useState } from 'react';
import * as R from 'ramda';
import { MainContainer, CRTabs } from 'components';
import NewSessionToDoctor from './new-session-to-doctor';
import { useDoctor, useModal, useSessionDefinition } from 'hooks';
import { useTranslation } from 'react-i18next';
import DoctorSessions from './list-sessions';
import DoctorFees from './doctor-fees/index';
import Doctors from './list-doctors';
const initialValues = {
  doctorId: null,
  sessionId: null,
  feesCalculationMethod: null,
  feesCalculationType: null,
  fees: 0,
};
export default function UsersContainer() {
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
  });
  const handleClickAddSessionToDoctor = useCallback(
    data => {
      const doctorId = R.propOr('', 'id')(data);
      setType('newSession');
      setFormValue({ ...formValue, doctorId: doctorId });
      open();
    },
    [open, setFormValue, setType]
  );
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
      <MainContainer title={t('doctors')} nobody></MainContainer>

      <CRTabs defaultValue={3}>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>{t('doctorFees')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('doctors')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('doctorSessions')}</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <DoctorFees />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <Doctors
              users={doctors}
              onAddSessionToDoctor={handleClickAddSessionToDoctor}
            />
          </CRTabs.CRContent>

          <CRTabs.CRContent>
            <DoctorSessions
              sessions={doctorSessionsDefinations}
              onDeleteSession={handleDeleteSession}
              filter={filter}
              setFilter={setFilter}
              users={doctors}
              t={t}
            />
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
      <NewSessionToDoctor
        show={visible}
        onHide={close}
        onCancel={close}
        onOk={handleAdd}
        formValue={formValue}
        onChange={setFormValue}
        type={type}
        sessionsDefinition={sessionsDefinition}
      />
    </>
  );
}

UsersContainer.propTypes = {};

UsersContainer.defaultProps = {};
