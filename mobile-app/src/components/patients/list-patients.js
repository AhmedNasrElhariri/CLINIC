import React from 'react';
import { Text, List, ListItem } from 'native-base';
import { CRText } from '@/components';

const ListPatients = ({ patients, onPress }) => {
  return (
    <List>
      {patients.map(patient => (
        <ListItem
          key={patient.id}
          noBorder
          button
          onPress={() => onPress(patient)}
        >
          <CRText size={16}>{patient.name}</CRText>
        </ListItem>
      ))}
    </List>
  );
};

ListPatients.defaultProps = {
  patients: [],
};

export default ListPatients;
