import styled from 'styled-components';
import { Nav } from 'rsuite';

import CRItem from './item';
import CRVItem from './vertical-item';
import CRScoll from './scroll-item';
import { layout } from 'styled-system';

const CRNav = styled(Nav)`
  & .rs-nav-waterline {
    border: none !important;
  }

  & .rs-nav-subtle.rs-nav-vertical .rs-nav-waterline {
    border: none;
    background: none;
    width: 0px !important;
  }
  ${layout}
`;

CRNav.CRItem = CRItem;
CRNav.CRScoll = CRScoll;
CRNav.CRVItem = CRVItem;

export default CRNav;