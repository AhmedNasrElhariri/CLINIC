import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';

import { getFontWeight } from '@/utils/cr-variables';

const CRButton = ({ children, onPress, disabled, weight, size, ...props }) => {
  return (
    <Button onPress={onPress} {...props}>
      <Text
        style={{
          fontSize: size,
          fontFamily: getFontWeight(weight),
        }}
      >
        {children}
      </Text>
    </Button>
  );
};

CRButton.propTypes = {
  size: PropTypes.number,
  weight: PropTypes.oneOf(['normal', 'bold', 'semiBold', 'semiLight']),
};

CRButton.defaultProps = {
  rounded: false,
  weight: 'normal',
};

export default CRButton;
