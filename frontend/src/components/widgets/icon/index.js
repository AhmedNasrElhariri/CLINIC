import styled from 'styled-components';
import { Icon } from 'rsuite';
import { variant } from 'styled-system';

const IconStyled = styled(Icon).attrs(({ variant }) => ({
  variant,
}))`
  cursor: pointer;
  border-radius: 50%;
  padding: 8px;
  font-weight: 800;

  ${props =>
    variant({
      variants: {
        danger: {
          color: props.theme.colors.danger,
          '&:hover': { color: props.theme.colors.dangerDarker },
        },
      },
    })}
`;

export default IconStyled;
