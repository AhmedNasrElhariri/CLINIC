import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';

import { H3, Div, CRButton } from 'components';
import SessionDefinitions from '../session-definations';

import useConfigurations from 'hooks/configurations';

const initialValues = {
  sessions: [],
};

const Configurations = () => {
  const [formValue, setFormValue] = useState(initialValues);

  const { configurations, update } = useConfigurations();

  useEffect(() => {
    const sessions = R.pipe(
      R.propOr([], 'sessions'),
      R.map(R.pick(['name', 'price']))
    )(configurations);
    setFormValue({
      sessions,
    });
  }, [configurations]);

  const handleSave = useCallback(() => {
    update(formValue);
  }, [formValue, update]);

  const sessions = useMemo(() => R.propOr([], 'sessions')(formValue), [
    formValue,
  ]);

  const updateSession = useCallback(
    session => {
      setFormValue({
        ...formValue,
        sessions: [...sessions, session],
      });
    },
    [formValue, sessions]
  );

  const handleDelete = useCallback(
    idx => {
      setFormValue({
        ...formValue,
        sessions: R.remove(idx, 1)(sessions),
      });
    },
    [formValue, sessions]
  );

  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <H3 mb={64}>Configurations</H3>
        <Div>
          <CRButton onClick={handleSave} primary small>
            Save
          </CRButton>
        </Div>
      </Div>
      <SessionDefinitions
        sessions={sessions}
        onChange={updateSession}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Configurations;
