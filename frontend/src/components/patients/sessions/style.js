import styled from "styled-components";
import { Panel } from "rsuite";

export const SessionsPanel = styled(Panel)`
  > {
    color: red;
    &::before {
      display: none;
    }
  }
`;

export const SlimText = styled.div`
  font-size: 1em;
  color: #97969b;
  font-weight: lighter;
  padding-bottom: 5;
`;

export const TitleStyle = styled.div`
  padding-bottom: 5px;
  white-space: nowrap;
  font-weight: 500;
  font-size: 25px;
`;
export const BtnClick = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  color: #51c6f3;
  font-size: 1.5rem;
  font-weight: 500;
`;
