import React from 'react';
import { View, Icon } from 'native-base';

import { CRText, CRPrimaryButton } from '@/components';
import { getFontColor } from '@/utils/cr-variables';

const NoAppointments = ({ onNew }) => {
  return (
    <View style={{ justifyContent: 'center', height: 400 }}>
      <View
        style={{
          alignItems: 'center',
          height: 150,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <CRText weight="semiBold" size={18}>
          No Appointments
        </CRText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CRText variant="light" size={12}>
            Create new appointment by tapping{' '}
          </CRText>
          <Icon
            type="MaterialIcons"
            name="edit"
            style={{ fontSize: 12, color: getFontColor('light') }}
          />
        </View>
        <CRText variant="light" size={12}>
          OR
        </CRText>
        <CRPrimaryButton onPress={onNew}>
          Create New Appointment
        </CRPrimaryButton>
      </View>
    </View>
  );
};

export default NoAppointments;
