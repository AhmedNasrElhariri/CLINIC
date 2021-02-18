import styled from 'styled-components';
import { Panel } from 'rsuite';
export const Header = styled.p`
  width: 155px;
  height: 32px;
  margin: 25.5px 710px 100px 26.5px;
  font-family: SegoeUI;
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #1b253a;
`;

export const StyledPanel = styled(Panel)`
  cursor: pointer;
  &.rs-panel-collapsible > .rs-panel-heading {
    width: 100px;
    position: relative;
  }
  &.rs-panel-collapsible > .rs-panel-heading .rs-panel-title {
    margin: 0;
    position: absolute;
    left: 30px;
    color: ${props => props.color};
    font-size: 12px;
    font-weight: 600;
  }
  &.rs-panel-collapsible > .rs-panel-heading::before {
    position: absolute;
    font-family: 'rsuite-icon-font';
    top: 20px;
    left: 7px;
    background-color: ${props => props.color};
    border-radius: 50%;
    color: white;
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
`;
