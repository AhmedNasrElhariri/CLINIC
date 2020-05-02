import React from 'react';
import { DatePicker } from 'native-base';

export default ({ field: { name }, form, ...props }) => {
  const onDateChange = val => form.setFieldValue(name, val);

  return (
    <DatePicker
      minimumDate={new Date()}
      locale={'en'}
      timeZoneOffsetInMinutes={undefined}
      modalTransparent={false}
      animationType={'fade'}
      androidMode={'default'}
      placeHolderText='Select date'
      textStyle={{ color: 'green' }}
      placeHolderTextStyle={{ color: '#d3d3d3' }}
      onDateChange={onDateChange}
    />
  );
};
