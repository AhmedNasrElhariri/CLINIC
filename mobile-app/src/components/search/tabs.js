import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { CRPrimaryButton } from '@/components';

const TabButton = ({ disabled, children, onPress }) => (
  <CRPrimaryButton
    disabled={disabled}
    width={100}
    small
    rounded={false}
    onPress={onPress}
  >
    {children}
  </CRPrimaryButton>
);

const SearchTabs = ({ onPress, active = 0 }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TabButton disabled={active !== 0} onPress={() => onPress(0)}>
        All
      </TabButton>
      <TabButton disabled={active !== 1} onPress={() => onPress(1)}>
        Patients
      </TabButton>
      <TabButton disabled={active !== 2} onPress={() => onPress(2)}>
        Snippet
      </TabButton>
    </View>
  );
};

SearchTabs.propTypes = {
  onPress: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired,
};

export default SearchTabs;
