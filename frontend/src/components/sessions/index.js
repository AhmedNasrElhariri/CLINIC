import ListInvoiceItems from './list-invoice-items';
import { CRSelectInput, H6, CRButton, CRNumberInput } from 'components';
import NumberFormat from 'react-number-format';
import { Form } from 'rsuite';
import { useCallback, useState } from 'react';
import * as R from 'ramda';

export default function Sessions({ t, selectedSessions, setSelectedSessions,sessions }) {
  const [session, setSession] = useState({});
  const [sessionNumber, setSessionNumber] = useState(1);
  const handleOnChange = useCallback(
    sessions => {
      setSelectedSessions(sessions);
      setSession({});
    },
    [setSelectedSessions]
  );

  const handleDelete = useCallback(
    idx => {
      handleOnChange(R.remove(idx, 1));
    },
    [handleOnChange]
  );

  const add = useCallback(() => {
    if (R.isNil(session) || R.isEmpty(session)) {
      return;
    }
    const updatedSession = { ...session, number: sessionNumber };

    handleOnChange([...selectedSessions, updatedSession]);
  }, [handleOnChange, sessionNumber, selectedSessions, session]);
  return (
    <>
      <Form>
        <CRButton onClick={() => add()}>{t('add')}</CRButton>
        <div className="flex gap-3">
          <CRSelectInput
            label={t('session')}
            placeholder={t('select')}
            value={session}
            onChange={val => (val == null ? setSession({}) : setSession(val))}
            data={sessions}
            className="w-[8.5rem] sm:!w-[17rem] md:!w-[11rem] lg:!w-[16rem]"
          />

          <CRNumberInput
            label={t('numberOfSessions')}
            name="sessionsNumber"
            value={sessionNumber}
            onChange={setSessionNumber}
          ></CRNumberInput>
        </div>
      </Form>
      <H6 mt={2} color="texts.2">
        <NumberFormat
          value={session.price}
          displayType="text"
          thousandSeparator
        />
      </H6>
      <div className="my-3">
        <ListInvoiceItems items={selectedSessions} onDelete={handleDelete} />
      </div>
    </>
  );
}
