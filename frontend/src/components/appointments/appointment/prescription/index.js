import React, { useMemo, useState } from 'react';
import { Schema } from 'rsuite';

import { CRModal } from 'components';
import {
  Title,
  Container,
  Medicine,
  Button,
  Ul,
  Li,
  FooterButton,
} from './style';
const model = Schema.Model({});
let newPrescription = [];
function Prescription({ visible, onClose, medicine ,onChange:setFormValue2 }) {
  const header = useMemo(() => 'Prescription');
  const removeItem = indx => {
    newPrescription = medicine.filter((element, index) => {
      return index != indx;
    });
    setFormValue2(newPrescription);
  };
  return (
    <CRModal
      show={visible}
      header={header}
      width={489}
      height={404}
      onHide={onClose}
      CancelFooter={true}
      bodyStyle={{ padding: '0px' }}
      headerStyle={{ borderBottom: 'none', padding: '27px' }}
    >
      <Title>Medicine</Title>
      {medicine.map((element, indx) => (
        <Container>
          <Medicine>
            <Ul>
              <Li>{element.medicine}</Li>
              <li>
                {element.timing} - {element.numDuration} -{' '}
                {element.periodDuration}
              </li>
            </Ul>
          </Medicine>
          <Button onClick={() => removeItem(indx)}>Delete</Button>
        </Container>
      ))}
      <FooterButton
        marginLeft="231px"
        bkColor="#40c173"
        color="#fbfbfb"
        width="136px"
      >
        Send on WhatsApp
      </FooterButton>
      <FooterButton
        marginLeft="13px"
        bkColor="#50c7f2"
        color="#fbfbfb"
        width="81px"
      >
        Print
      </FooterButton>
    </CRModal>
  );
}

Prescription.defaultProps = {
  type: 'create',
};

export default Prescription;
