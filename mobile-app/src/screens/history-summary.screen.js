import React from 'react';
import { Button, Icon, Accordion, View } from 'native-base';

import useFetchPatient from '@/hooks/fetch-patient';
import { CRMainLayout, CRText } from '@/components';
import SessionSummary from '@/components/patient-history/session-summary';

const HistorySummaryScreen = ({ navigation }) => {
  const id = '843c2857-e784-4eb2-bb98-7b848b1020db';
  const { summary } = useFetchPatient(id);

  const sessionsSummary = summary.map((s, idx) => ({
    data: s,
    title: `Session ${idx + 1}`,
  }));

  return (
    <CRMainLayout
      header="Patients"
      extra={
        <Button small transparent onPress={() => {}}>
          <Icon name="add" style={{ color: '#000000' }} />
        </Button>
      }
    >
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
