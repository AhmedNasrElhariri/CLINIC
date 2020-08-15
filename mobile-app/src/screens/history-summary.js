import React, { useCallback } from 'react';
import { Button, Icon } from 'native-base';

import useFetchPatients from '@/hooks/fetch-patients';
import { CRMainLayout, CRSearchInput } from '@/components';
import ListPatients from '@/components/patients/list-patients';
import { NAVIGATIONS } from '@/utils/constants';
import { SEARCH_SUBJECTS } from './search.screen';
import SessionSummary from '@/components/patient-history/session-summary';

const HistorySummaryScreen = ({ navigation }) => {
  const { summary } = useFetchPatients();
  console.log(summary);

  return (
    <CRMainLayout
      header="Patients"
      extra={
        <Button small transparent onPress={() => {}}>
          <Icon name="add" style={{ color: '#000000' }} />
        </Button>
      }
    >
      {/* {summary.map((s, idx) => (
        <SessionSummary session={s} />
      ))} */}
    </CRMainLayout>
  );
};

export default HistorySummaryScreen;
