import styled from 'styled-components';
import { ControlLabel } from 'rsuite';
import { byTheme } from 'services/theme';

const labelTheme = {
  fontSize: {
    normal: 14,
    large: 24,
  },
};

const CRLabel = styled(ControlLabel)`
  ${byTheme(labelTheme)}
  line-height: 32px;
  color: ${props => props.theme.colors.text};
  margin: 0;
  margin-bottom: ${({ noLabel }) => (noLabel ? '0px' : '10px')};
`;

CRLabel.defaultProps = {
  noLabel: false,
};

export default CRLabel;
