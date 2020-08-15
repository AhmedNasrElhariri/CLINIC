import React, { useCallback } from 'react';
import { Button, Icon } from 'native-base';

import useFetchPatients from '@/hooks/fetch-patients';
import { CRMainLayout, CRSearchInput } from '@/components';
import ListPatients from '@/components/patients/list-patients';
import { NAVIGATIONS } from '@/utils/constants';
import { SEARCH_SUBJECTS } from './search.screen';

const Patients = ({ navigation }) => {
  const { patients } = useFetchPatients();

  const navigate = useCallback(
    id =>
      navigation.navigate(NAVIGATIONS.PATIENT, {
        id,
      }),
    [navigation]
  );

  return (
    <CRMainLayout
      header="Patients"
      extra={
        <Button small transparent onPress={() => {}}>
          <Icon name="add" style={{ color: '#000000' }} />
        </Button>
      }
    >
      <CRSearchInput
        onFocus={() =>
          navigation.navigate(NAVIGATIONS.SEARCH, {
            searchFor: [SEARCH_SUBJECTS.PATIENTS],
            onPress: ({ id }) => navigate(id),
          })
        }
      />
      <ListPatients patients={patients} onPress={({ id }) => navigate(id)} />
    </CRMainLayout>
  );
};

export default Patients;
