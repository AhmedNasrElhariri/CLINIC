import React, { useState, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';

import { H3, Div, CRButton } from 'components';

import EnableInvoiceCounter from './enable-invoice-counter/index';
import { useConfigurations } from 'hooks';
const initialValues = {
  enableInvoiceCounter: false,
};
const Configurations = () => {
  const [formValue, setFormValue] = useState(initialValues);
  const { configurations, update } = useConfigurations();
  useEffect(() => {
    const enableInvoiceCounter = R.propOr(
      false,
      'enableInvoiceCounter'
    )(configurations);
    setFormValue({
      enableInvoiceCounter,
    });
  }, [configurations]);
  const handleSave = useCallback(() => {
    update(formValue);
  }, [formValue, update]);

  const updateEnable = useCallback(
    enable => {
      setFormValue({
        ...formValue,
        enableInvoiceCounter: enable,
      });
    },
    [formValue]
  );
  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <H3 mb={64}>Configurations</H3>
        <Div>
          <CRButton onClick={handleSave} variant="primary">
            Save
          </CRButton>
        </Div>
      </Div>
      <EnableInvoiceCounter
        onChange={updateEnable}
        value={formValue?.enableInvoiceCounter}
      />
    </>
  );
};

export default Configurations;
