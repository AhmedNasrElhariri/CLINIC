import React from 'react';
import { Button, Text } from 'native-base';

import { primaryStyle } from './style';

export default ({ children, onPress, disabled, ...props }) => {
  return (
    <Button
      style={
        disabled ? primaryStyle.button.disabled : primaryStyle.button.normal
      }
      onPress={onPress}
      {...props}
      block
      rounded
    >
      <Text
        uppercase={false}
        style={disabled ? primaryStyle.text.disabled : primaryStyle.text.normal}
      >
        {children}
      </Text>
    </Button>
  );
};
