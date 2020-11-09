import React from 'react';

import { Div } from 'components';

import { PrescriptionSyled, ContentSyled } from './style';

const PrescriptionPrint = React.forwardRef(({ content }, ref) => {
  console.log(content);
  return (
    <Div height={0} overflow="hidden">
      <PrescriptionSyled ref={ref}>
        <ContentSyled>{content}</ContentSyled>
      </PrescriptionSyled>
    </Div>
  );
});

export default PrescriptionPrint;
