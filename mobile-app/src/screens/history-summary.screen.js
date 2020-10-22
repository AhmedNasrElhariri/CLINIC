import React, { useMemo } from 'react';
import * as R from 'ramda';
import { Icon, Accordion, View } from 'native-base';

import useFetchPatient from '@/hooks/fetch-patient';
import { CRMainLayout, CRText } from '@/components';
import SessionSummary from '@/components/patient-history/session-summary';

const HistorySummaryScreen = ({ route }) => {
  const id = R.path(['params', 'patient', 'id'])(route);
  console.log(id);
  const { summary } = useFetchPatient(id);

  const sessionsSummary = useMemo(
    () =>
      summary.map((s, idx) => ({
        data: s,
        title: `Session ${idx + 1}`,
      })),
    [summary]
  );

  return (
    <CRMainLayout header="Patient Summary">
      <Accordion
        dataArray={sessionsSummary}
        icon="add"
        expandedIcon="remove"
        renderHeader={({ data, title }, expanded) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 60,
              }}
            >
              <CRText size={16}>{title}</CRText>
              {expanded ? (
                <Icon style={{ fontSize: 18 }} name="ios-arrow-down" />
              ) : (
                <Icon style={{ fontSize: 18 }} name="ios-arrow-forward" />
              )}
            </View>
          );
        }}
        renderContent={({ data }) => <SessionSummary session={data} />}
      />
    </CRMainLayout>
  );
};

export default HistorySummaryScreen;
