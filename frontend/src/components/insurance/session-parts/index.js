import { useCallback, useEffect, useState } from 'react';
import {
  CRSelectInput,
  Div,
  CRRadio,
  CRButton,
  CRNumberInput,
} from 'components';
import { feesCalTypes } from 'utils/constants';
import * as R from 'ramda';
import { Form } from 'rsuite';
const SessionsParts = ({
  t,
  sessions,
  selectedSessions,
  setSelectedSessions,
}) => {
  const [item, setItem] = useState({
    number: 1,
    price: 0,
    type: 'percentage',
    patientFees: 0,
    session: {},
  });

  const add = useCallback(() => {
    if (R.isNil(item) || R.isEmpty(item)) {
      return;
    }
    const { session, number, price, patientFees, type } = item;
    const updatedSession = {
      ...session,
      number,
      price,
      patientFees,
      type,
    };
    setSelectedSessions([...selectedSessions, updatedSession]);
  }, [setSelectedSessions, selectedSessions, item]);
  useEffect(() => {
    const session = item?.session;
    setItem(prev => ({ ...prev, price: session.price }));
  }, [item?.session]);
  return (
    <>
      <Form fluid formValue={item} onChange={setItem}>
        <Div display="flex" m="10px 0px" justifyContent="space-between">
          <CRButton mt="10px" onClick={() => add()}>
            {t('add')}
          </CRButton>
        </Div>
        <Div display="flex" justifyContent="space-around">
          <CRSelectInput
            label={t('session')}
            placeholder={t('select')}
            name="session"
            data={sessions}
            style={{ width: '100px' }}
          />
          <CRNumberInput
            label={t('numberOfSessions')}
            name="number"
            style={{ width: '100px' }}
          />
          <CRNumberInput
            label={t('price')}
            name="price"
            style={{ width: '100px' }}
          />
          <CRRadio
            label={t('type')}
            options={feesCalTypes}
            inline
            name="type"
          />
          <CRNumberInput
            name="patientFees"
            label={t('patientFees')}
            style={{ width: '70px' }}
          />
        </Div>
      </Form>
    </>
  );
};
export default SessionsParts;
