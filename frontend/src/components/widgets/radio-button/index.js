import React , {memo} from 'react';

import { Radio } from 'rsuite';


const RadioButton =  ({ value, label,...rest}) => {
    return (
      <Radio value={value} {...rest}>{label}</Radio>
    );
};

export default memo(RadioButton);