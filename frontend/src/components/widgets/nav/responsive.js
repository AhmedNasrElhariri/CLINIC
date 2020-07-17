import styled from 'styled-components';
import Nav from '@rsuite/responsive-nav';

import CRItem from './responsive-item';

const CRResponsiveNav = styled(Nav)`
  & .rs-nav-waterline {
    border: none !important;
  }

  & .rs-nav-subtle.rs-nav-vertical .rs-nav-waterline {
    border: none;
    background: none;
    width: 0px !important;
  }

  & li {
    vertical-align: middle !important;
  }

  & .rs-dropdown-item-content {
    font-size: 18px;
    padding: 15px 30px;
  }

  & .rs-dropdown-menu {
    border-radius: 10px;
  }

  & .rs-dropdown-item-active {
    & .rs-dropdown-item-content {
      color: ${props => props.theme.colors.primary} !important;
    }
  }

  & .rs-dropdown-menu-active ~ .rs-dropdown-toggle {
    color: ${props => props.theme.colors.primary} !important;
    font-weight: 600;
  }
`;

CRResponsiveNav.CRItem = CRItem;

export default CRResponsiveNav;
