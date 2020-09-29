import React, { useMemo } from 'react';
import { Text } from 'native-base';
import * as R from 'ramda';

import useFetchPatient from '@/hooks/fetch-patient';
import { CRMainLayout } from '@/components';

const NotificationScreen = ({ route }) => {
  const id = R.path(['params', 'patient', 'id'])(route);
  const { progress } = useFetchPatient(id);

  const progressData = useMemo(
    () =>
      Object.entries(progress).map(([title, data]) => ({
        title,
        data,
      })),
    [progress]
  );

  return (
    <CRMainLayout header="Notifications">
      <Text>notifications</Text>
    </CRMainLayout>
  );
};

export default NotificationScreen;
