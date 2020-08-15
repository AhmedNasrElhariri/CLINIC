import React from 'react';
import { Thumbnail, View, List, ListItem } from 'native-base';

import { CRMainLayout, CRText } from '@/components';
import person from '../../assets/images/person.jpg';

const items = [
  {
    title: 'Name',
    prop: 'name',
  },
  {
    title: 'Phone No',
    prop: 'phoneNo',
  },
  {
    title: 'Sex',
    prop: 'sex',
  },
  {
    title: 'Age',
    prop: 'age',
  },
  {
    title: 'Membership Type',
    prop: 'type',
  },
];

const InfoAttribute = ({ name, value }) => (
  <View>
    <CRText size={12} variant="light" weight="semiLight">
      {name}
    </CRText>
    <CRText size={14} weight="semiLight">
      {value}
    </CRText>
  </View>
);

const PatientInfo = ({ route: { params: { patient } = { patient: {} } } }) => {
  return (
    <CRMainLayout header="Patient Main Info">
      <View style={{ alignItems: 'center' }}>
        <Thumbnail source={person} circular large />
      </View>
      <List style={{ marginTop: 30 }}>
        {items.map(({ title, prop }, idx) => (
          <ListItem key={idx} noBorder button style={{ height: 60 }}>
            <InfoAttribute name={title} value={patient[prop]} />
          </ListItem>
        ))}
      </List>
    </CRMainLayout>
  );
};

export default PatientInfo;
