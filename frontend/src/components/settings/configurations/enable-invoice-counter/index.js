import React from 'react';
import { Toggle } from 'rsuite';
import { CRCard, H4, Div } from 'components';
const EnableInvoiceCounter = ({ setEnable }) => {
  return (
    <CRCard borderless style={{ marginTop: '10px' }}>
      <Div display="flex" justifyContent="space-between" mb={3}>
        <H4>Enable Invoice Counter</H4>
        <Toggle onChange={setEnable} />
      </Div>
    </CRCard>
  );
};

EnableInvoiceCounter.propTypes = {};

EnableInvoiceCounter.defaultProps = {};

export default EnableInvoiceCounter;
