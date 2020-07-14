import React from 'react';
import styled from 'styled-components';

import { Div, H5, H7, P2 } from 'components';

const HistroyBoxStyled = styled.div`
  border-radius: 10px;
  background-color: ${props => props.theme.colors.grey200};
  padding: 20px 25px;
  min-height: 120px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export default function HistoryBox({ title, subtitle, body }) {
  return (
    <HistroyBoxStyled>
      <Div>
        <H5 fontWeight={600} mb={1}>
          {title}
        </H5>
        <P2 fontStyle="italic" mb={2}>
          {subtitle}
        </P2>
        <H7 fontWeigh={400}>{body}</H7>
      </Div>
    </HistroyBoxStyled>
  );
}
