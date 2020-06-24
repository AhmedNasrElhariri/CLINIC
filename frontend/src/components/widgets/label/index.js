import styled from 'styled-components';
import { ControlLabel } from 'rsuite';
import { byTheme } from 'services/theme';

const labelTheme = {
  fontSize: {
    normal: 10,
    large: 24,
  },
};

export default styled(ControlLabel)`
  ${byTheme(labelTheme)}
  line-height: 32px;
  color: ${props => props.theme.colors.text};
  margin: 0;
  margin-bottom: 10px;
`;
