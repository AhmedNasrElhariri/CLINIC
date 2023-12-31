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
      <Div className="flex justify-between items-center flex-col sm:flex-row mb-5 sm:mt-5 sm:mb-7">
        {title ? <H3>{title}</H3> : ''}
        {more}
      </Div>
      {!nobody && <CRCard borderless>{children}</CRCard>}
    </>
  );
}
