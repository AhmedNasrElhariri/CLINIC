import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import { getFontWeight, getFontColor } from '@/utils/cr-variables';

const CRText = ({ children, size, weight, variant, style, ...props }) => {
  return (
    <Text
      style={{
        ...style,
        fontSize: size,
        fontFamily: getFontWeight(weight),
        color: getFontColor(variant),
      }}
      {...props}
    >
      {children}
    </Text>
  );
};

CRText.propTypes = {
  size: PropTypes.number,
  weight: PropTypes.oneOf(['normal', 'bold', 'semiBold', 'semiLight']),
  variant: PropTypes.oneOf(['normal', 'light', 'primary']),
};

CRText.defaultProps = {
  size: 12,
  weight: 'normal',
  variant: 'normal',
};

export default CRText;
