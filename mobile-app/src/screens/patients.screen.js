import React, { useCallback } from 'react';
import { Button, Icon } from 'native-base';

import useFetchPatients from '@/hooks/fetch-patients';
import { CRMainLayout, CRSearchInput } from '@/components';
import ListPatients from '@/components/patients/list-patients';
import { NAVIGATIONS } from '@/utils/constants';
import { SEARCH_SUBJECTS } from './search.screen';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Patients = ({ navigation }) => {
  const { patients, refetch, refetching } = useFetchPatients();

  const navigate = useCallback(
    id =>
      navigation.navigate(NAVIGATIONS.PATIENT, {
        id,
      }),
    [navigation]
  );

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <CRMainLayout
      header="Patients"
      extra={
        <Button
          small
          transparent
          onPress={() => navigation.navigate(NAVIGATIONS.NEW_PATIENT)}
        >
          <Icon name="add" style={{ color: '#000000' }} />
        </Button>
      }
      refreshControl={
        <RefreshControl onRefresh={() => refetch()} refreshing={refetching} />
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
