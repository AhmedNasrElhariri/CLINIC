import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Form, Divider } from 'rsuite';
import NumberFormat from 'react-number-format';
import * as R from 'ramda';

import { CRModal, CRSelectInput, H6, CRButton, Div, H5 } from 'components';
import { SessionNameStyled, DeleteLinkStyled } from './style';
import { CRNumberInput, CRTextInput } from 'components/widgets';

const OTHER = 'Other';

const initValue = {
  notes: '',
  price: 1,
};

function FinishAppointment({ show, onCancel, onOk, clinic }) {
  const [session, setSession] = useState({});
  const [formValue, setFormValue] = useState(initValue);

  const [selectedSessions, setSelectedSessions] = useState([]);

  const sessions = useMemo(() => R.propOr([], 'sessions')(clinic), [clinic]);

  const choices = useMemo(() => {
    const { examinationPrice, followupPrice, urgentPrice } = R.pick([
      'examinationPrice',
      'followupPrice',
      'urgentPrice',
    ])(clinic);

    const allChoices = [
      ...sessions,
      { name: 'Examination', price: examinationPrice },
      { name: 'Followup', price: followupPrice },
      { name: 'Urgent', price: urgentPrice },
      { name: OTHER, price: 0 },
    ];
    return allChoices.map(s => ({ label: s.name, value: s }));
  }, [clinic, sessions]);

  const add = useCallback(() => {
    if (!session) {
      return;
    }
    setSelectedSessions([...selectedSessions, session]);
    setSession({});
  }, [selectedSessions, session]);

  const handleDelete = useCallback(idx => {
    setSelectedSessions(R.remove(idx, 1));
    setSession({});
  }, []);

  const total = useMemo(
    () => selectedSessions.reduce((sum, { price }) => sum + price, 0),
    [selectedSessions]
  );

  const isOtherType = useMemo(() => session.name === OTHER, [session]);

  useEffect(() => {
    if (isOtherType) {
      setSession(value => ({ ...value, price: formValue.price }));
    }
  }, [formValue, isOtherType]);

  return (
    <CRModal
      show={show}
      header="Session Payment"
      onOk={() => onOk(selectedSessions)}
      onHide={onCancel}
      onCancel={onCancel}
    >
      <Form fluid>
        <CRSelectInput
          label="Session Type"
          name="type"
          placeholder="Select Type"
          block
          cleanable={false}
          searchable={false}
          value={session}
          onChange={setSession}
          data={choices}
        />
      </Form>
      {isOtherType && (
        <Div mt={4}>
          <Form fluid formValue={formValue} onChange={setFormValue}>
            <CRTextInput label="Notes" name="notes" />
            <CRNumberInput label="Price" name="price" />
          </Form>
        </Div>
      )}
      <H6 mt={2} color="texts.2">
        Price:{' '}
        <NumberFormat
          value={session.price}
          displayType={'text'}
          thousandSeparator
        />
      </H6>
      <Div textAlign="center">
        <CRButton primary small onClick={add}>
          Add
        </CRButton>
      </Div>
      {selectedSessions.length > 0 && <Divider />}
      <Div my={3}>
        {selectedSessions.map(({ name, price }, idx) => (
          <Div display="flex" justifyContent="space-between" key={idx}>
            <Div display="flex" alignItems="baseline">
              <SessionNameStyled color="texts.1">{name}</SessionNameStyled>
              <DeleteLinkStyled
                cursor="pointer"
                onClick={() => handleDelete(idx)}
              >
                Delete
              </DeleteLinkStyled>
            </Div>
            <H6 color="texts.1">{price}</H6>
          </Div>
        ))}
      </Div>
      <Divider />
      <Div mt={5} display="flex" justifyContent="space-between">
        <H5 color="texts.1">Total</H5>
        <H5 color="texts.1">
          <NumberFormat value={total} displayType={'text'} thousandSeparator />
        </H5>
      </Div>
    </CRModal>
  );
}

FinishAppointment.defaultProps = {
  sessions: [],
  clinic: {},
};

export default FinishAppointment;
