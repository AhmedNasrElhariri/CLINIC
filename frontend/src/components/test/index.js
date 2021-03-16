import React from 'react';
import PropTypes from 'prop-types';

import { CRTabs } from 'components';

const Test = props => {
  return (
    <div>
      <h1>test</h1>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>sssssssssssssss</CRTabs.CRTab>
          <CRTabs.CRTab>two</CRTabs.CRTab>
          <CRTabs.CRTab>three</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>

        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>content one</CRTabs.CRContent>
          <CRTabs.CRContent>content two</CRTabs.CRContent>
          <CRTabs.CRContent>content three</CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
    </div>
  );
};

Test.propTypes = {};

export default Test;
