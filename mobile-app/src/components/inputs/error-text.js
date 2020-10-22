import React from 'react';
import CRText from '../text';

const ErrorText = ({ children }) => {
  return (
    <CRText variant="danger" style={{ marginLeft: 5 }}>
      {children}
    </CRText>
  );
};

export default ErrorText;
