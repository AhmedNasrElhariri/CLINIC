import React, { useMemo } from 'react';
import { Text } from 'native-base';
import * as R from 'ramda';

import useFetchPatient from '@/hooks/fetch-patient';
import { CRMainLayout } from '@/components';

const ProfileScreen = ({ route }) => {
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
    <CRMainLayout header="Profile">
      <Text>profile screen</Text>
    </CRMainLayout>
  );
};

export default ProfileScreen;
