import React, { memo, useEffect, useMemo } from 'react';
import { CRTextInput, CRSelectInput, Div } from 'components';

const MultipleSelector = ({ choices, onChange, value, disabled, ...props }) => {
  useEffect(() => {
    let newValue = value || [];
    onChange(newValue);
  }, []);
  const handleOnChange = (valueIndex, val) => {
    let newValue = [...value];
    newValue[valueIndex] = val;
    onChange(newValue);
  };
  return (
    <Div>
      <Div display="flex">
        <CRSelectInput
          value={value ? value[0] : ''}
          onChange={val => handleOnChange(0, val)}
          data={choices}
          style={{ width: '200px', marginRight: '30px' }}
        />
        <CRTextInput
          value={value ? value[1] : ''}
          onChange={val => handleOnChange(1, val)}
        />
      </Div>
    </Div>
  );
};

export default memo(MultipleSelector);
