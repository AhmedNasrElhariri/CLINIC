import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Button, Text, View } from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';

// import React from 'react';
// import { DatePicker } from 'native-base';
import crVariables from '@/utils/cr-variables';
import useDatePicker from './use-date-picker';

const DatePicker = () => {
  const { visible, open, close } = useDatePicker();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    open(Platform.OS === 'ios');
    // setDate(currentDate);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={open}
        style={{
          borderWidth: crVariables.borderWidth,
          borderColor: crVariables.borderColor,
          borderRadius: crVariables.borderRadius,
          marginBottom: crVariables.fieldMarginBottom,
          paddingLeft: crVariables.fieldPaddingLeft,
          paddingRight: crVariables.fieldPaddingRight,
          height: crVariables.fieldHeight,
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <Text>Date</Text>
      {/* <Button
        onPress={open}
        title="Show date picker!"
        style={{
          borderWidth: crVariables.borderWidth,
          borderColor: crVariables.borderColor,
          borderRadius: crVariables.borderRadius,
          marginBottom: crVariables.fieldMarginBottom,
          paddingLeft: crVariables.fieldPaddingLeft,
          paddingRight: crVariables.fieldPaddingRight,
          height: crVariables.fieldHeight,
          backgroundColor:'transparent',
          justifyContent: 'center',
          flexGrow: 1,
          shadowColor:'none'
        }}
      >
        <Text>Date</Text>
      </Button> */}
      </TouchableOpacity>
      {visible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

// export default ({ field: { name }, form, ...props }) => {
//   const onDateChange = val => form.setFieldValue(name, val);

//   return (
//     <DatePicker
//       minimumDate={new Date()}
//       locale="en"
//       timeZoneOffsetInMinutes={undefined}
//       modalTransparent={false}
//       animationType="fade"
//       androidMode="default"
//       placeHolderText="Select date"
//       textStyle={{ color: crVariables.textColor }}
//       placeHolderTextStyle={{ color: '#d3d3d3' }}
//       onDateChange={onDateChange}
//     />
//   );
// };
