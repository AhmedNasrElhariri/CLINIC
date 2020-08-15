import React from 'react';
import { View } from 'native-base';

import { CRText } from '@/components';
import { format } from '@/services/date';

const AttributeProgress = ({ progress }) => {
  console.log(progress);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 20,
        }}
      >
        <CRText size={14} variant="lighter">
          Date
        </CRText>
        <CRText size={14} variant="lighter">
          Value
        </CRText>
      </View>
      {progress.map(({ value, date }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
          }}
        >
          <CRText size={14}>{format(date)}</CRText>
          <CRText size={14} weight="bold">
            {value}
          </CRText>
        </View>
      ))}
    </>
  );
};

AttributeProgress.defaultProps = {
  progress: [],
};

export default AttributeProgress;
