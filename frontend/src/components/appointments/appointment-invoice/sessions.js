import ListInvoiceItems from '../list-invoice-items';
import {
  CRSelectInput,
  H6,
  Div,
  CRButton,
  CRNumberInput,
  CRTextInput,
} from 'components';
import NumberFormat from 'react-number-format';
import { Form } from 'rsuite';
import { useCallback, useMemo, useState } from 'react';
import * as R from 'ramda';
import { useSessionDefinition } from 'hooks';

const OTHER = 'Other';

const isOtherType = session => session.name === OTHER;

const initValue = {
  name: '',
  price: 1,
};

export default function Sessions({
  t,
  company,
  sessions,
  selectedSessions,
  setSelectedSessions,
  onChange,
}) {
  const { sessionsDefinition } = useSessionDefinition({});
  const [session, setSession] = useState({});

  const handleOnChange = useCallback(
    sessions => {
      setSelectedSessions(sessions);
      onChange(sessions);
      setFormValue(initValue);
      setSession({});
    },
    [onChange, setSelectedSessions]
  );

  const handleDelete = useCallback(
    idx => {
      handleOnChange(R.remove(idx, 1));
    },
    [handleOnChange]
  );
  const updatedSessionDefinitions = sessionsDefinition.map(s => {
    return {
      name: s.name,
      id: s,
    };
  });
  const choices = useMemo(() => {
    const allChoices = [...sessions];
    return allChoices.map(s => ({ name: s.name, id: s }));
  }, [sessions]);
  const [sessionNumber, setSessionNumber] = useState(1);

  const [formValue, setFormValue] = useState(initValue);
  const add = useCallback(() => {
    if (R.isNil(session) || R.isEmpty(session)) {
      return;
    }
    const updatedSession = { ...session, number: sessionNumber };
    const sessionData = isOtherType(session)
      ? { ...formValue }
      : updatedSession;
    handleOnChange([...selectedSessions, sessionData]);
  }, [formValue, handleOnChange, sessionNumber, selectedSessions, session]);
  return (
    <>
      <Form>
        <CRButton onClick={() => add()}>{t('add')}</CRButton>
        <div className="flex gap-3">
          {company == null ? (
            <CRSelectInput
              onChange={val => (val == null ? setSession({}) : setSession(val))}
              value={session}
              label={t('session')}
              data={updatedSessionDefinitions}
              className="w-[8.5rem] sm:!w-[17rem] md:!w-[11rem] lg:!w-[16rem]"
            />
          ) : (
            <CRSelectInput
              label={t('session')}
              placeholder={t('select')}
              value={session}
              onChange={val => (val == null ? setSession({}) : setSession(val))}
              data={choices}
              className="w-[8.5rem] sm:!w-[17rem] md:!w-[11rem] lg:!w-[16rem]"
            />
          )}
          <CRNumberInput
            label={t('numberOfSessions')}
            name="sessionsNumber"
            value={sessionNumber}
            onChange={setSessionNumber}
          ></CRNumberInput>
        </div>
      </Form>
      {isOtherType(session) && (
        <Div mt={4}>
          <Form fluid formValue={formValue} onChange={setFormValue}>
            <CRTextInput label={t('name')} name="name" />
            <CRNumberInput label={t('price')} name="price" />
          </Form>
        </Div>
      )}
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
