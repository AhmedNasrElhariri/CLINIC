import styled from 'styled-components';
import { Divider } from 'rsuite';
import { layout } from 'styled-system';

export default styled(Divider).attrs(() => ({
  vertical: true,
}))`
  width: 2px;
  height: 20px;
  background-color: ${props => props.theme.colors.texts[2]};
  ${layout}
`;

