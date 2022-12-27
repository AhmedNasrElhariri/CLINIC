import React, { useCallback, useState } from 'react';
import * as R from 'ramda';
import {
  NewSessionToDoctor,
  MainContainer,
  CRSelectInput,
  Doctors,
  Div,
} from 'components';
import { usePermissions, useModal, useSessionDefinition } from 'hooks';
import { useTranslation } from 'react-i18next';
import { Form } from 'rsuite';
import DoctorSessions from '../list-sessions';
const initialValues = {
  doctorId: null,
  sessionId: null,
  feesCalculationMethod: '',
  feesCalculationType: '',
};
export default function UsersContainer() {
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState(initialValues);
  const [filter, setFilter] = useState({ doctorId: null });
  const [type, setType] = useState('');
  const { t } = useTranslation();
  const { sessionsDefinition } = useSessionDefinition({});
  const {
    doctors,
    addSessionToDoctor,
    deleteSessionToDoctor,
    doctorSessionsDefinations,
  } = usePermissions({
    onCreateUser: close,
    onEditUser: close,
    onCreateSessionToDoctor: () => {
      close();
      setFormValue(initialValues);
    },
    doctorId: filter?.doctorId,
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
      <Doctors
        users={doctors}
        onAddSessionToDoctor={handleClickAddSessionToDoctor}
      />
      <Div display="flex" justifyContent="center" alignItems="center" mt="30px">
        <Form formValue={filter} onChange={setFilter}>
          <CRSelectInput
            label={t('doctor')}
            name="doctorId"
            labelKey="name"
            valueKey="id"
            block
            data={doctors}
            style={{ width: '200px' }}
          />
        </Form>
      </Div>
      <DoctorSessions
        sessions={doctorSessionsDefinations}
        onDeleteSession={handleDeleteSession}
      />
    </>
  );
}

UsersContainer.propTypes = {};

UsersContainer.defaultProps = {};
