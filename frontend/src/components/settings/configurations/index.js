import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';

import { H3, Div, CRButton } from 'components';
import SessionDefinitions from '../session-definations';
import EnableInvoiceCounter from './enable-invoice-counter/index';
import useConfigurations from 'hooks/configurations';
import { boolean } from 'yup';

const initialValues = {
  sessions: [],
  enableInvoiceCounter: false,
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

  const updateEnable = useCallback(
    enable => {
      setFormValue({
        ...formValue,
        enableInvoiceCounter: enable,
      });
    },
    [formValue]
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
      <EnableInvoiceCounter setEnable={updateEnable} />
    </>
  );
};

export default Configurations;
