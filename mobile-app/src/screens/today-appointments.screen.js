import React, { useState, useMemo } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import useFetchAppointments from '@/hooks/fetch-appointments';
import { CRMainLayout } from '@/components';
import ListTodayAppointments from '@/components/today-appointments/list';
import TodayAppointmentsTabs from '@/components/today-appointments/tabs';
import { Button, Icon, Spinner } from 'native-base';
import Filter from '@/components/today-appointments/filter';
import { NAVIGATIONS } from '@/utils/constants';
import crVariables from '@/utils/cr-variables';
import useFilter from '@/components/today-appointments/use-filter';

const TodayAppointments = ({ navigation }) => {
  const {
    todayAppointments,
    refetch,
    fetching,
    refetching,
  } = useFetchAppointments();
  const [active, setActive] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);

  const appointments = useMemo(() => {
    const statuses = active === 0 ? ['Scheduled'] : ['Closed'];
    return todayAppointments.filter(p => statuses.includes(p.status));
  }, [active, todayAppointments]);

  const {
    filter,
    clinicsNames,
    types,
    onSwitch,
    onSwitchAll,
    filteredAppointments,
  } = useFilter(appointments);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <CRMainLayout
      header="Appointments"
      newAppointment
      noBack
      search
      refreshControl={
        <RefreshControl onRefresh={() => refetch()} refreshing={refetching} />
      }
      extra={
        <Button small transparent>
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <Icon name="ios-options" style={{ color: '#000000' }} />
          </TouchableOpacity>
        </Button>
      }
    >
      {fetching ? (
        <Spinner color={crVariables.primaryColor} />
      ) : (
        <>
          <TodayAppointmentsTabs
            onPress={active => setActive(active)}
            active={active}
          />
          <ListTodayAppointments
            appointments={filteredAppointments}
            onNew={() => navigation.navigate(NAVIGATIONS.NEW_APPOINTMENT)}
          />
          <Filter
            filter={filter}
            clinics={clinicsNames}
            types={types}
            onSwitch={onSwitch}
            onSwitchAll={onSwitchAll}
            onDone={() => {
              setFilterVisible(false);
            }}
            isVisible={filterVisible}
          />
        </>
      )}
    </CRMainLayout>
  );
};

export default TodayAppointments;
