import React, { useMemo, useState } from 'react';
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

const medicine = [
  {
    id: 1,
    name: 'Panadol',
    treatDays: '30 days treat',
    number: '3 pills per day',
  },
  {
    id: 2,
    name: 'Panadol',
    treatDays: '30 days treat',
    number: '3 pills per day',
  },
  {
    id: 3,
    name: 'Panadol',
    treatDays: '30 days treat',
    number: '3 pills per day',
  },
  {
    id: 4,
    name: 'Panadol',
    treatDays: '30 days treat',
    number: '3 pills per day',
  },
];
let newPrescription = [];
function Prescription({ visible, onClose }) {
  const header = useMemo(() => 'Prescription');
  const [prescription, setPrescription] = useState(medicine);
  const removeItem = indx => {
    newPrescription = prescription.filter((element, index) => {
      return index != indx;
    });
    setPrescription(newPrescription);
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
      {prescription.map((element, indx) => (
        <Container>
          <Medicine>
            <Ul>
              <Li>{element.name}</Li>
              <li>
                {element.treatDays} - {element.number}
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
