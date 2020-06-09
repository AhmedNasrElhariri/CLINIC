import React, { useState } from 'react';
import moment from 'moment';
import { RangeSlider } from 'rsuite';

function Range({ disabled, value, onChange }) {
  return (
    <RangeSlider
      disabled={disabled}
      value={value}
      step={30}
      graduated
      progress
      tooltip
      min={0}
      max={690}
      renderMark={mark => {
        if (mark % 60 === 0) {
          const label = moment()
            .set({
              hour: 12,
              minute: mark,
              second: 0,
              millisecond: 0,
            })
            .format('HH:mm');
          return <span>{label}</span>;
        }
        return null;
      }}
      onChange={onChange}
    />
  );
}

export default Range;
