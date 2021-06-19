import React, { useCallback, useState } from 'react';
import { Schema } from 'rsuite';

import { CRButton, CRCard, H4, Div } from 'components';
import { useModal } from 'hooks';
import DefineSession from '../define-session';
import ListSessionDefinations from '../list-session-definations';

const { StringType } = Schema.Types;

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
});

const initialValues = {
  name: '',
  price: 1,
};

const SessionDefinitions = ({ sessions, onChange, onDelete }) => {
  const { visible, open, close } = useModal();
  const [formValue, setFormValue] = useState(initialValues);
  const onCreate = useCallback(() => {
    onChange(formValue);
    close();
    setFormValue(initialValues);
  }, [close, formValue, onChange]);

  return (
    <Div mt={4}>
      <CRCard borderless>
        <Div display="flex" justifyContent="space-between" mb={3}>
          <H4>Sessions Definitions</H4>
          <CRButton onClick={open} variant="primary">
            Add Session Type
          </CRButton>
        </Div>
        <DefineSession
          onCreate={onCreate}
          onChange={setFormValue}
          formValue={formValue}
          model={model}
          show={visible}
          onHide={close}
          onCancel={close}
        />
        <ListSessionDefinations sessions={sessions} onDelete={onDelete} />
      </CRCard>
    </Div>
  );
};

SessionDefinitions.propTypes = {};

SessionDefinitions.defaultProps = {};

export default SessionDefinitions;
