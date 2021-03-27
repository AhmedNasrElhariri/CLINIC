import styled from 'styled-components';
import { FormGroup } from 'rsuite';
import { variant } from 'styled-system';

export const FormGroupStyled = styled(FormGroup)`
  ${variant({
    prop: 'layout',
    variants: {
      inline: {
        display: 'flex',
        width: '100%',
        'margin-top': 0,
        'margin-bottom': 0,
      },
      vertical: {
        display: 'normal',
      },
    },
  })}
`;
