import React , {memo} from 'react';

import { Radio } from 'rsuite';


const RadioButton =  ({ value, label}) => {
    return (
      <Radio value={value}>{label}</Radio>
    );
};

export default memo(RadioButton);