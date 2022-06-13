import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CRNav } from 'components';

const Tabs = ({ activeTab, onSelect }) => {
  const { t } = useTranslation();
  return (
    <CRNav appearance="tabs" activeKey={activeTab} onSelect={onSelect}>
      <CRNav.CRItem eventKey="0">{t('details')}</CRNav.CRItem>
      <CRNav.CRItem eventKey="1">{t('summary')}</CRNav.CRItem>
    </CRNav>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Tabs;
