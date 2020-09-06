import React from 'react';
import { CRPanel, Div, H5 } from 'components';

import { SinppetBodyStyled } from './style';

export default function Snippets({ snippets }) {
  return (
    <Div>
      {snippets.map(({ id, title, body }) => (
        <Div my={3} key={id}>
          <CRPanel header={<H5 fontWeight={600}>{title}</H5>} collapsible>
            <SinppetBodyStyled>{body}</SinppetBodyStyled>
          </CRPanel>
        </Div>
      ))}
    </Div>
  );
}

Snippets.propTypes = {};

Snippets.defaultProps = {
  snippets: [],
};
