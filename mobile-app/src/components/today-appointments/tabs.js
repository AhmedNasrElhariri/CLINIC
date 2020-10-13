import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';

import { CRPrimaryButton } from '@/components';

const TodayAppointmentsTabs = ({ onPress, active }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <CRPrimaryButton
        disabled={active !== 0}
        width={150}
        small
        rounded={false}
        onPress={() => onPress(0)}
      >
        Upcoming
      </CRPrimaryButton>
      <CRPrimaryButton
        disabled={active !== 1}
        width={150}
        small
        rounded={false}
        onPress={() => onPress(1)}
      >
        Completed
      </CRPrimaryButton>
    </View>
  );
};

TodayAppointmentsTabs.propTypes = {
  onPress: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
};

export default TodayAppointmentsTabs;
