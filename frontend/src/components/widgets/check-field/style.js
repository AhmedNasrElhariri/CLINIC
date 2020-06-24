import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ControlLabel } from 'rsuite';

export const ControlLabelStyled = styled(ControlLabel)`
  margin-bottom: 0px;
  font-size: 13px;
`;

ControlLabelStyled.propTypes = {
  inline: PropTypes.bool,
};
