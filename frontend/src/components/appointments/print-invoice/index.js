import React, { useRef ,useState } from 'react';
import { Icon } from 'rsuite';
import ReactToPrint from 'react-to-print';

import { CRButton, Div } from 'components';
import InvoicePrintout from './invoice-printout';

const PrintInvoice = props => {
  console.log(props.organization);
  const ref = useRef();
  return (
    <Div>
      <ReactToPrint
        trigger={() => (
          <CRButton primary small data-trigger width={106} height={34}>
            Print <Icon icon="print" data-trigger />
          </CRButton>
        )}
        content={() => ref.current}
      />
      <InvoicePrintout ref={ref} {...props}/>
    </Div>
  );
};

PrintInvoice.defaultProps = {
  items: [],
  gross: 0,
  total: 0,
};

export default PrintInvoice;
