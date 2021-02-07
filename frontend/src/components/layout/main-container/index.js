import React from 'react';

import { CRCard, H3, Div } from 'components';

export default ({ title = null, children, nobody, more = null }) => (
  <>
    <Div
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={64}
    >
      {title ? <H3>{title}</H3> : ''}
      {more}
    </Div>
    {!nobody && <CRCard borderless>{children}</CRCard>}
  </>
);
