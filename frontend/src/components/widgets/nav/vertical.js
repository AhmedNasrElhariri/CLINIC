import styled from 'styled-components';
import { Nav } from 'rsuite';
import CRItem from './vertical-items';
import CRVItem from './vertical-item';
import CRScoll from './scroll-item';

const CRNav = styled(Nav)`
  &.rs-nav-tabs.rs-nav-vertical .rs-nav-waterline {
    display: none;
  }
  &.rs-nav > ul {
    width: 152px;
  }
  border-right: ${props => props.borderRight};
  border-left: ${props => props.borderLeft};
  margin: 0px 2px;
`;

CRNav.CRItem = CRItem;
CRNav.CRScoll = CRScoll;
CRNav.CRVItem = CRVItem;

export default CRNav;
