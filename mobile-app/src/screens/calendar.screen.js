import React, { useMemo } from 'react';
import moment from 'moment';
import { Agenda } from 'react-native-calendars';
import * as R from 'ramda';
import { View } from 'native-base';

import MainLayout from '@/components/layout/main';
import { CRText } from '@/components';
import useFetchAppointments from '@/hooks/fetch-appointments';
import { formatDate, getMonthDays } from '@/services/date';
import { CALENDAR_DATE_FORMAT } from '@/services/constants';
import { getCalendarEventBgColor } from '@/utils/cr-variables';

const renderItem = (item, firstItem) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {/* <View style={{ height: 10, color: 'green', width: 3 }} /> */}
      <View
        style={{
          width: 80,
          backgroundColor: getCalendarEventBgColor(item.type),
          borderRadius: 3,
          paddingLeft: 6,
        }}
      >
        <CRText weight="semiBold" variant="white">
          {item.patient.name}
        </CRText>
      </View>
    </View>
  );
};

const CalendarScreen = props => {
  const { appointments } = useFetchAppointments();

  const items = useMemo(() => {
    const days = getMonthDays();
    const groupByDays = R.groupBy(
      R.pipe(R.prop('date'), R.partialRight(formatDate, [CALENDAR_DATE_FORMAT]))
    )(appointments);
    return days.reduce(
      (acc, day) => ({ ...acc, [day]: groupByDays[day] || [] }),
      {}
    );
  }, [appointments]);

  return (
    <MainLayout {...props}>
      <View>
        <Agenda
          theme={{ backgroundColor: 'white' }}
          items={items}
          selected={moment().format('YYYY-MM-DD')}
          renderItem={(item, firstItemInDay) => {
            return renderItem(item, firstItemInDay);
          }}
        />
      </View>
    </MainLayout>
  );
};

export default CalendarScreen;
