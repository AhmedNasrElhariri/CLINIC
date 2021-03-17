import React, { useMemo, useState, useCallback } from 'react';
import { Form } from 'rsuite';
import NumberFormat from 'react-number-format';
import * as R from 'ramda';
import {
  StyledSeesion,
  StyledDiscount,
  Container,
  Button,
  SummaryStyled,
  StyledInput,
  PriceStyled,
  ButtonsDiv,
} from './style';
import { CRSelectInput, H6, H7, Div } from 'components';
import { CRNumberInput, CRTextInput } from 'components/widgets';
import ListInvoiceItems from '../list-invoice-items';
import PrintInvoice from '../print-invoice/index';

const OTHER = 'Other';

const initValue = {
  name: '',
  price: 1,
};

const Price = ({ name, price, Color }) => (
  <Div display="flex" justifyContent="space-between" mb={1}>
    <H7 color={Color ? Color : 'texts.1'}>{name}</H7>
    <H7 color={Color ? Color : 'texts.1'}>
      EGP <NumberFormat value={price} displayType="text" thousandSeparator />
    </H7>
  </Div>
);

const isOtherType = session => session.name === OTHER;

function AppointmentInvoice({
  onChange,
  discount,
  onDiscountChange,
  sessions,
  organization,
  handleOk,
  onCancel
}) {
  const [session, setSession] = useState({});
  const [formValue, setFormValue] = useState(initValue);

  const [selectedSessions, setSelectedSessions] = useState([]);

  const choices = useMemo(() => {
    const allChoices = [...sessions, { name: OTHER, price: 0 }];
    return allChoices.map(s => ({ label: s.name, value: s }));
  }, [sessions]);

  const handleOnChange = useCallback(
    sessions => {
      setSelectedSessions(sessions);
      onChange(sessions);
      setFormValue(initValue);
      setSession({});
    },
    [onChange]
  );

  const add = useCallback(() => {
    if (R.isNil(session) || R.isEmpty(session)) {
      return;
    }
    const sessionData = isOtherType(session) ? { ...formValue } : session;
    handleOnChange([...selectedSessions, sessionData]);
  }, [formValue, handleOnChange, selectedSessions, session]);

  const handleDelete = useCallback(
    idx => {
      handleOnChange(R.remove(idx, 1));
    },
    [handleOnChange]
  );

  const subtotal = useMemo(
    () => selectedSessions.reduce((sum, { price }) => sum + price, 0),
    [selectedSessions]
  );

  const total = useMemo(() => subtotal - discount, [discount, subtotal]);

  return (
    <>
      <Container>
        <StyledSeesion>
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
              onSelect={add()}
            />
          </Form>
          {isOtherType(session) && (
            <Div mt={4}>
              <Form fluid formValue={formValue} onChange={setFormValue}>
                <CRTextInput label="Name" name="name" />
                <CRNumberInput label="Price" name="price" />
              </Form>
            </Div>
          )}
          <H6 mt={2} color="texts.2">
            Price:{' '}
            <NumberFormat
              value={session.price}
              displayType="text"
              thousandSeparator
            />
          </H6>
          <Div my={3}>
            <ListInvoiceItems
              items={selectedSessions}
              onDelete={handleDelete}
            />
          </Div>
        </StyledSeesion>
        <StyledDiscount>
          <Form>
            <StyledInput>
              <CRTextInput
                label="Discount"
                name="amount"
                value={discount}
                onChange={onDiscountChange}
                width={244}
              ></CRTextInput>
              <Button
                width="61px"
                padding="9.5px 9px 9.5px 10px"
                bgColor="#e50124"
                color="#ffffff"
                height="38px"
                marginTop="41px"
              >
                Applied
              </Button>
            </StyledInput>
          </Form>
          <SummaryStyled>Session Summary</SummaryStyled>
          <PriceStyled>
            <Price
              name="Subtotal "
              price={subtotal}
              overriden
              Color="#283148"
            />
            <Price
              name="Discount "
              price={discount}
              overriden
              Color="#e50124"
            />
          </PriceStyled>
          <Price name="Total" price={total} Color="#283148" />
        </StyledDiscount>
      </Container>
      <ButtonsDiv>
        <PrintInvoice
          items={selectedSessions}
          subtotal={subtotal}
          total={total}
          discount={discount}
          organization={organization}
        />
        <Button
          width="81px"
          padding="9px 24px 10px 25px"
          bgColor="#b6b7b7"
          color="#283148"
          marginLeft="370px"
          height="35px"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          width="106px"
          padding="9px 40px"
          bgColor="#50c7f2"
          color="#ffffff"
          marginLeft="26px"
          height="35px"
          onClick={handleOk}
        >
          Next
        </Button>
      </ButtonsDiv>
    </>
  );
}

AppointmentInvoice.defaultProps = {
  sessions: [],
};

export default AppointmentInvoice;
