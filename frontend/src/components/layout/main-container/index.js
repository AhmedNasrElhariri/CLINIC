import React from 'react';

import { CRCard, H3 } from 'components';

export default ({ title, children }) => (
  <>
    <H3 mb={64}>{title}</H3>
    <CRCard borderless>{children}</CRCard>
  </>
);
