import { H7, Div, CRLabel } from 'components';
import { DeleteLinkStyled, Item } from './style';
import { Form, InputNumber } from 'rsuite';
import { useCallback } from 'react';
function ListInvoiceItems({
  items,
  priceKey,
  onDelete,
  setItems,
  insurance,
  handleChangeSessions,
}) {
  const handleChangePrice = useCallback(
    (value, indx) => {
      const item = items[indx];
      const newItem = { ...item, price: Number(value) };
      const newItems = items.map((i, index) => (index === indx ? newItem : i));
      setItems(newItems);
      handleChangeSessions(newItems);
    },
    [items]
  );
  const handleChangePatientFees = useCallback(
    (value, indx) => {
      const item = items[indx];
      const newItem = { ...item, patientFees: Number(value) };
      const newItems = items.map((i, index) => (index === indx ? newItem : i));
      setItems(newItems);
      handleChangeSessions(newItems);
    },
    [items]
  );
  return (
    <Div>
      {items.map((item, idx) => (
        <Item key={idx}>
          <Div display="flex" alignItems="center">
            <H7 color="texts.1">
              {item.number}
              {' / '}
            </H7>
            <H7 color="texts.1" textDecoration="underline">
              {item.name}
            </H7>
            {insurance && (
              <Form>
                <Div display="flex">
                  <CRLabel style={{ marginBottom: '0px', margin: '0px 3px' }}>
                    price
                  </CRLabel>
                  <InputNumber
                    value={item.price}
                    onChange={v => handleChangePrice(v, idx)}
                    style={{
                      width: '70px',
                      height: '30px',
                      marginRight: '5px',
                      marginLeft: '5px',
                    }}
                  />
                  <CRLabel style={{ marginBottom: '0px', margin: '0px 3px' }}>
                    patient
                  </CRLabel>
                  <InputNumber
                    value={item?.patientFees || 0}
                    onChange={v => handleChangePatientFees(v, idx)}
                    style={{ width: '70px', height: '30px' }}
                  />
                </Div>
              </Form>
            )}

            <DeleteLinkStyled cursor="pointer" onClick={() => onDelete(idx)}>
              Delete
            </DeleteLinkStyled>
          </Div>
          <Div display="flex" alignItems="center">
            <H7 color="texts.1">EGP {item[priceKey] * item?.number}</H7>
          </Div>
        </Item>
      ))}
    </Div>
  );
}

ListInvoiceItems.defaultProps = {
  items: [],
  priceKey: 'price',
};

export default ListInvoiceItems;
