import React, { useCallback, useMemo } from 'react';
import { Button, Icon, Accordion, View } from 'native-base';

import useFetchPatient from '@/hooks/fetch-patient';
import { CRMainLayout, CRSearchInput, CRText } from '@/components';
import ListPatients from '@/components/patients/list-patients';
import { NAVIGATIONS } from '@/utils/constants';
import { SEARCH_SUBJECTS } from './search.screen';
import AttributeProgress from '@/components/patient-history/attribute-progress';

const HistoryProgressScreen = ({ navigation }) => {
  const id = '843c2857-e784-4eb2-bb98-7b848b1020db';
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
    <CRMainLayout
      header="Patients"
      extra={
        <Button small transparent onPress={() => {}}>
          <Icon name="add" style={{ color: '#000000' }} />
        </Button>
      }
    >
      <Accordion
        dataArray={progressData}
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
        renderContent={({ data }) => <AttributeProgress progress={data} />}
      />
    </CRMainLayout>
  );
};

export default HistoryProgressScreen;
