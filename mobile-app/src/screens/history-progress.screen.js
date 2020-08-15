import React, { useMemo } from 'react';
import { Icon, Accordion, View } from 'native-base';
import * as R from 'ramda';

import useFetchPatient from '@/hooks/fetch-patient';
import { CRMainLayout, CRText } from '@/components';
import AttributeProgress from '@/components/patient-history/attribute-progress';

const HistoryProgressScreen = ({ route }) => {
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
    <CRMainLayout header="Patient Progress">
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
