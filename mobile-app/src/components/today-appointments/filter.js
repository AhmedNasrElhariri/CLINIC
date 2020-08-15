import React from 'react';
import Modal from 'react-native-modal';
import { View, List } from 'native-base';

import { CRText, CRButton } from '@/components';
import AppointmentTypeFilter from './type-filter';
import BranchFilter from './branches-filter';

const Filter = ({ isVisible, onDone, onClear, filter, onChange }) => {
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
            <AppointmentTypeFilter
              filter={filter.type}
              onChange={type => onChange({ ...filter, type })}
            />
            <BranchFilter />
          </List>
        </View>
      </Modal>
    </View>
  );
};

export default Filter;
