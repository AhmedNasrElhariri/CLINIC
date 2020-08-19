import React from 'react';
import * as R from 'ramda';
import { List, ListItem, Left, Right, Icon } from 'native-base';

import useFetchPatient from '@/hooks/fetch-patient';
import { CRMainLayout, CRText } from '@/components';
import { NAVIGATIONS } from '@/utils/constants';
import PatientSummary from '@/components/patient-history/session-summary';

const screens = [
  {
    id: 0,
    name: 'About',
    navigateTo: NAVIGATIONS.PATIENT_INFO,
  },
  {
    id: 1,
    name: 'Summary',
    navigateTo: NAVIGATIONS.HISTORY_SUMMARY,
  },
  {
    id: 2,
    name: 'Progress',
    navigateTo: NAVIGATIONS.HISTORY_PROGRESS,
  },
  {
    id: 3,
    name: 'Labs',
    navigateTo: NAVIGATIONS.PATIENT_LABS,
  },
];

const Patient = ({ navigation, route: { params } }) => {
  const id = R.prop('id')(params);
  const { patient } = useFetchPatient(id);

  return (
    <CRMainLayout header="Patient">
      <PatientSummary {...patient} />
      <List>
        {screens.map(({ id, name, navigateTo, params }) => (
          <ListItem
            key={id}
            noBorder
            button
            style={{ height: 60 }}
            onPress={() =>
              navigation.navigate(navigateTo, { ...params, patient })
            }
          >
            <Left>
              <CRText size={16}>{name}</CRText>
            </Left>
            <Right>
              <Icon name="ios-arrow-forward" />
            </Right>
          </ListItem>
        ))}
      </List>
    </CRMainLayout>
  );
};

export default Patient;
