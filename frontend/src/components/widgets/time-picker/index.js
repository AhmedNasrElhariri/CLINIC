import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../date-picker';
import { MIN_EXAMINATION_DURATION } from 'utils/constants';

const TimePicker = ({ minInterval, startHour, endHour, ...props }) => {
  return (
    <DatePicker
      format="hh:mm a"
      hideHours={hour => hour < startHour || hour > endHour}
      hideMinutes={minute => minute % minInterval !== 0}
      {...props}
    />
  );
};

TimePicker.defaultProps = {
  minInterval: MIN_EXAMINATION_DURATION,
  startHour: 12,
  endHour: 24,
};

TimePicker.propTypes = {
  minInterval: PropTypes.oneOf([5, 10, 15, 20]),
};

export default TimePicker;
