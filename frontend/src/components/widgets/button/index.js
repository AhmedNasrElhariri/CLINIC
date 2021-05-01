import { space, typography, layout, variant, border } from 'styled-system';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { byTheme } from 'services/theme';
import { textTransform } from 'styles/props';

const theme = {
  fontSize: {
    normal: 12,
    large: 20,
  },
};

const smallHeight = {
  height: {
    normal: 38,
    large: 43,
  },
};

const largeHeight = {
  height: {
    normal: 16,
    large: 52,
  },
};

const normalHeight = {
  height: {
    normal: 35,
    large: 59,
  },
};

const getHeight = ({ small, large }) =>
  small
    ? byTheme(smallHeight)
    : large
    ? byTheme(largeHeight)
    : byTheme(normalHeight);

const Button = styled.button.attrs(({ block, uppercase }) => ({
  width: block ? '100%' : 'initial',
  textTransform: uppercase ? 'uppercase' : 'initial',
}))`
  font-stretch: normal;
  font-style: normal;
  line-height: 0;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  padding: 0px 26px;
  position: relative;
  font-weight: 600;

  ${getHeight}

  ${byTheme(theme)};
  ${space}
  ${typography}
  ${layout}
  ${textTransform}
  ${border}


  ${variant({
    variants: {
      primary: {
        background: theme => theme.colors.primary,
      },
      success: {
        background: theme => theme.colors.success,
      },
      light: {
        background: theme => theme.colors.light,
        color: theme => theme.colors.text,
      },
      danger: {
        background: theme => theme.colors.danger,
        color: theme => theme.colors.white,
      },
      dark: {
        background: theme => theme.colors.dark,
        color: theme => theme.colors.white,
      },
    },
  })}

  &:focus,
  &:active,
  &:hover,
  &:visited {
    opacity: 1;
    outline: none;
  }
`;

Button.propTypes = {
  round: PropTypes.bool,
  block: PropTypes.bool,
  bold: PropTypes.bool,
  uppercase: PropTypes.bool,
};

Button.defaultProps = {
  round: false,
  block: false,
  variant: 'primary',
};

export default Button;
