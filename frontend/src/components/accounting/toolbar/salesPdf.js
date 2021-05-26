import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';

import { CRButton } from 'components';
import PdfSalesDocument from './pdf-sales';

const PdfView = ({ data, period, sales }) => {
  const [pdfData, setPdfData] = useState({ loaded: false });

  useEffect(() => {
    (async () => {
      let blob = await pdf(
        data ? <PdfSalesDocument data={data} period={period} /> : <></>
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
