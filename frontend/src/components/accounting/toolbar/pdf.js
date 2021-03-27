import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';

import { CRButton } from 'components';
import PdfDocument from './pdf-document';

const PdfView = ({ data, period }) => {
  const [pdfData, setPdfData] = useState({ loaded: false });

  useEffect(() => {
    (async () => {
      const blob = await pdf(
        <PdfDocument data={data} period={period} />
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
      <a href={pdfData.url} download="accounting.pdf" type="application/pdf">
        <CRButton variant="primary" ml={1}>
          Print
        </CRButton>
      </a>
    </div>
  );
};

export default PdfView;
