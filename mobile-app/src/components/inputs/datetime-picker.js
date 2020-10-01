import React, { useCallback } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View } from 'native-base';
import moment from 'moment';

import useDatePicker from './use-date-picker';
import DateTimeLabel from './datetime-label';
import { formatDate } from '@/services/date';

export const DATE_TIME_MODE = Object.freeze({
  DATE: 'date',
  TIME: 'time',
});

const getValue = ({ value, mode }) => {
  return mode === DATE_TIME_MODE.TIME
    ? moment(value)
        .add(5 - (moment(value).minutes() % 5), 'minutes')
        .toDate()
    : value;
};

const getLabel = ({ value, mode }, defaultVal) => {
  switch (mode) {
    case DATE_TIME_MODE.DATE:
      return formatDate(value);
    case DATE_TIME_MODE.TIME:
      return formatDate(value, 'hh : mm a');
    default:
      return defaultVal;
  }
};

const CRDateTimePicker = ({
  mode,
  placeholder,
  form,
  field: { name, value },
}) => {
  const { visible, open, close } = useDatePicker();

  const handleChange = useCallback(
    (event, value) => {
      if (event.type === 'dismissed') {
        close();
        return;
      }
      if (event.type === 'set') {
        close();
        form.setFieldValue(name, getValue({ value, mode }));
      }
    },
    [close, form, name, mode]
  );
  return (
    <View>
      <DateTimeLabel
        placeholder={value ? getLabel({ value, mode }) : placeholder}
        onPress={open}
      />
      {visible && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          is24Hour
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default CRDateTimePicker;
