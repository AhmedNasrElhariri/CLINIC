import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';

import { CRButton } from 'components';
import PdfSalesDocument from './pdf-sales';

const PdfView = ({
  data,
  period,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}) => {
  const [pdfData, setPdfData] = useState({ loaded: false });

  useEffect(() => {
    (async () => {
      let blob = await pdf(
        <PdfSalesDocument
          data={data}
          period={period}
          marginTop={marginTop}
          marginRight={marginRight}
          marginBottom={marginBottom}
          marginLeft={marginLeft}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);

      setPdfData({
        loaded: true,
        url,
        blob,
      });
    })();
  }, [data, period]);

  return !pdfData.loaded ? (
    'loading'
  ) : (
    <div>
      <a href={pdfData.url} download="sales.pdf" type="application/pdf">
        <CRButton variant="primary" ml={1}>
          Print
        </CRButton>
      </a>
    </div>
  );
};

export default PdfView;
