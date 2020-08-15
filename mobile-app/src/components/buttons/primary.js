import React from 'react';
import { Button, Text } from 'native-base';

import { primaryStyle } from './style';

const { button, text } = primaryStyle;

const PrimaryButton = ({ children, onPress, disabled, width, ...props }) => {
  return (
    <Button
      style={Object.assign({
        width,
        ...(disabled ? button.disabled : button.normal),
      })}
      onPress={onPress}
      {...props}
    >
      <Text style={disabled ? text.disabled : text.normal}>{children}</Text>
    </Button>
  );
};

PrimaryButton.defaultProps = {
  rounded: true,
};

export default PrimaryButton;
