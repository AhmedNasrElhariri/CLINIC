import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

import { CRButton } from 'components';
import PdfDocument from './pdf-document';

const PdfFile = ({ history }) => {
  useEffect(() => {
    (async () => {
      const blob = await pdf(<PdfDocument data={history} />).toBlob();
      const url = URL.createObjectURL(blob);

      saveAs.saveAs(url, `history.pdf`);

      // onDone();
    })();
  }, [history]);

  return null;
};

const Print = ({ history }) => {
  const [printable, setPrintable] = useState(false);

  const handleClick = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      setPrintable(true);
    },
    [setPrintable]
  );

  return (
    <>
      <CRButton primary small ml={1} onClick={handleClick}>
        Print
      </CRButton>
      {printable && (
        <PdfFile
          // onDone={() => {
          //   setSelected(false);
          //   setAllChecked(false);
          //   setChecked({});
          // }}
          history={history}
        />
      )}
    </>
  );
};

Print.defaultProps = {
  history: [],
};

export default Print;
