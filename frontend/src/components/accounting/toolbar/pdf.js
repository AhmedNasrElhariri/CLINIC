import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';

import { CRButton } from 'components';
import PdfDocument from './pdf-document';

const PdfView = ({ data }) => {
  const [pdfData, setPdfData] = useState({ loaded: false });

  useEffect(() => {
    (async () => {
      const blob = await pdf(<PdfDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);

      setPdfData({
        loaded: true,
        url,
        blob,
      });
    })();
  }, [data]);

  return !pdfData.loaded ? (
    'loading'
  ) : (
    <div>
      <a href={pdfData.url} download="accounting.pdf" type="application/pdf">
        <CRButton primary small ml={1}>
          Print
        </CRButton>
      </a>
    </div>
  );
};

export default PdfView;
