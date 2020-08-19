import React from 'react';
import { DatePicker } from 'native-base';
import crVariables from '@/utils/cr-variables';

export default ({ field: { name }, form, ...props }) => {
  const onDateChange = val => form.setFieldValue(name, val);

  return (
    <DatePicker
      minimumDate={new Date()}
      locale="en"
      timeZoneOffsetInMinutes={undefined}
      modalTransparent={false}
      animationType="fade"
      androidMode="default"
      placeHolderText="Select date"
      textStyle={{ color: crVariables.textColor }}
      placeHolderTextStyle={{ color: '#d3d3d3' }}
      onDateChange={onDateChange}
    />
  );
};
