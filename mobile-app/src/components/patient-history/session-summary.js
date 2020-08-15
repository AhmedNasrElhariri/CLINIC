import React from 'react';
import { View, Thumbnail } from 'native-base';

import { CRText } from '@/components';

const SessionSummary = ({ session }) => {
  return (
    <>
      {Object.entries(session).map(([name, value]) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <CRText size={14} weight="semiBold">
            {name}
            {':  '}
          </CRText>
          <CRText size={12}>{value}</CRText>
        </View>
      ))}
    </>
  );
};

SessionSummary.defaultProps = {
  session: {},
};

export default SessionSummary;
