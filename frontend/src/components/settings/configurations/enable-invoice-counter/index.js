import React from 'react';
import { Toggle } from 'rsuite';
import { CRCard, H4, Div } from 'components';
import { useTranslation } from 'react-i18next';

const EnableInvoiceCounter = ({ onChange, value }) => {
  const { t } = useTranslation();
  return (
    <CRCard borderless style={{ marginTop: '10px' }}>
      <Div display="flex" justifyContent="space-between" mb={3}>
        <H4>{t('enableInvoiceCounter')}</H4>
        <Toggle onChange={onChange} checked={value} />
      </Div>
    </CRCard>
  );
};

EnableInvoiceCounter.propTypes = {};

EnableInvoiceCounter.defaultProps = {};

export default EnableInvoiceCounter;
