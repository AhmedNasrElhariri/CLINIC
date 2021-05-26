import React, { useState, useEffect } from 'react';
import { pdf ,Font } from '@react-pdf/renderer';

import { CRButton } from 'components';
import PdfDocument from './pdf-document';
import PdfSalesDocument from './pdf-sales';

import font from '../../../fonts/Tajawal-Regular.ttf';

Font.register({
  family: 'Tajawal',
  format: 'truetype',
  src: font,
});
const PdfView = ({ data, period, sales }) => {
  const [pdfData, setPdfData] = useState({ loaded: false });

  useEffect(() => {
    (async () => {
      let blob = await pdf(
        sales ? (
          <PdfSalesDocument data={data} period={period} />
        ) : (
          <PdfDocument data={data} period={period} />
        )
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
      {sales ? (
        <a href={pdfData.url} download="sales.pdf" type="application/pdf">
          <CRButton variant="primary" ml={1}>
            Print
          </CRButton>
        </a>
      ) : (
        <a href={pdfData.url} download="accounting.pdf" type="application/pdf">
          <CRButton variant="primary" ml={1}>
            Print
          </CRButton>
        </a>
      )}
    </div>
  );
};

export default PdfView;
