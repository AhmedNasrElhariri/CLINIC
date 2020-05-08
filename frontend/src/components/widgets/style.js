import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ControlLabel } from 'rsuite';

export const ControlLabelStyled = styled(ControlLabel)`
  margin-bottom: 0px;
  font-size: 13px;
  /* font-weight: 600; */
`;

ControlLabelStyled.propTypes = {
  inline: PropTypes.bool,
};
