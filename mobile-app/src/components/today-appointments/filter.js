import React from 'react';
import Modal from 'react-native-modal';
import { View, List } from 'native-base';

import { CRText, CRButton } from '@/components';
import PropFilter from './prop-filter';

const Filter = ({
  clinics,
  types,
  isVisible,
  onDone,
  onClear,
  onSwitch,
  filter,
  onSwitchAll,
}) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        coverScreen
        backdropColor="#ffffff"
        backdropOpacity={1}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CRText size={20} weight="bold">
              Filter
            </CRText>
            <CRButton onPress={onDone} transparent size={14}>
              Done
            </CRButton>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CRText size={18} weight="bold">
              Filter By
            </CRText>
            <CRButton transparent size={14} onPress={onClear}>
              Clear All
            </CRButton>
          </View>
          <List>
            <PropFilter
              name="Appointment Type"
              filter={filter.types}
              list={types}
              onSwitch={onSwitch('types')}
              onSwitchAll={onSwitchAll('types', types)}
            />
            <PropFilter
              name="Branch"
              filter={filter.clinics}
              list={clinics}
              onSwitch={onSwitch('clinics')}
              onSwitchAll={onSwitchAll('clinics', clinics)}
            />
          </List>
        </View>
      </Modal>
    </View>
  );
};

Filter.defaultProps = {
  appointments: [],
};

export default Filter;
