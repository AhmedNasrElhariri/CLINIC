import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from './date-picker';

const TimePicker = ({ minInterval = 10, ...props }) => {
  return (
    <DatePicker
      format="hh:mm a"
      hideHours={hour => hour < 16 || hour > 22}
      hideMinutes={minute => minute % minInterval !== 0}
      {...props}
    />
  );
};

TimePicker.propTypes = {
  minInterval: PropTypes.oneOf([5, 10, 15, 20]),
};

export default TimePicker;
