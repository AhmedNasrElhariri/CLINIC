import React, { useState, useMemo } from 'react';
import * as R from 'ramda';

import useFetchAppointments from '@/hooks/fetch-appointments';
import { CRMainLayout } from '@/components';
import ListTodayAppointments from '@/components/today-appointments/list';
import TodayAppointmentsTabs from '@/components/today-appointments/tabs';
import { Button, Icon } from 'native-base';
import Filter from '@/components/today-appointments/filter';

const TodayAppointments = () => {
  const { todayAppointments } = useFetchAppointments();
  const [active, setActive] = useState(0);
  const [filter, setfilter] = useState({ type: ['All'] });
  const [filterVisible, setFilterVisible] = useState(false);

  const activeAppointments = useMemo(() => {
    const statuses = active === 0 ? ['Scheduled'] : ['Done', 'Archived'];
    return todayAppointments.filter(p => statuses.includes(p.status));
  }, [active, todayAppointments]);

  const appointments = useMemo(() => {
    return activeAppointments.filter(
      p => filter.type.includes('All') || filter.type.includes(p.type)
    );
  }, [filter, activeAppointments]);

  return (
    <CRMainLayout
      header="Appointments"
      search
      extra={
        <Button small transparent onPress={() => setFilterVisible(true)}>
          <Icon name="ios-options" style={{ color: '#000000' }} />
        </Button>
      }
    >
      <TodayAppointmentsTabs
        onPress={active => setActive(active)}
        active={active}
      />
      <ListTodayAppointments appointments={appointments} />
      <Filter
        onDone={() => setFilterVisible(false)}
        onClear={() =>
          setfilter({
            type: [],
          })
        }
        isVisible={filterVisible}
        onChange={filter => {
          setfilter(filter);
        }}
        filter={filter}
      />
    </CRMainLayout>
  );
};

export default TodayAppointments;
