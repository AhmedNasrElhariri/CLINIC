import React, { useRef } from 'react';
import { Icon } from 'rsuite';
import ReactToPrint from 'react-to-print';
import { CRButton, Div } from 'components';
import InvoicePrintout from './invoice-printout';

const PrintInvoice = props => {
  const ref = useRef();
  return (
    <Div>
      <ReactToPrint
        trigger={() => (
          <CRButton variant="primary" data-trigger width={106} height={34}>
            {props.printName} <Icon icon="print" data-trigger />
          </CRButton>
        )}
        content={() => ref.current}
      />
      <InvoicePrintout ref={ref} {...props} />
    </Div>
  );
};

PrintInvoice.defaultProps = {
  items: [],
  gross: 0,
  total: 0,
};

export default PrintInvoice;
