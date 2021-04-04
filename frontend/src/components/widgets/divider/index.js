import styled from 'styled-components';
import { Divider } from 'rsuite';
import { layout } from 'styled-system';

export default styled(Divider)`
  background-color: ${props => props.theme.colors.texts[2]};
  ${layout}
`;
