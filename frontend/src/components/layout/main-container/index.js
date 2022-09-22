import React from 'react';

import { CRCard, H3, Div } from 'components';

export default function MainContainer({
  title = null,
  children,
  nobody,
  more = null,
}) {
  return (
    <>
      <Div
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={64}
        mt={5}
      >
        {title ? <H3>{title}</H3> : ''}
        {more}
      </Div>
      {!nobody && <CRCard borderless>{children}</CRCard>}
    </>
  );
}
