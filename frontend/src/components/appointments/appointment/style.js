import styled from 'styled-components';
import { Panel, FlexboxGrid } from 'rsuite';
import { styles } from 'components/widgets/html';
import css from '@styled-system/css';

import { Div } from 'components';

export const FlexboxGridItemStyled = styled(FlexboxGrid.Item)`
  ${styles}
`;

export const PanelStyled = styled(Panel)`
  display: 'inline-block';
  width: '100%';
`;

export const HomeSidebarStyled = styled(Div)`
  ${css({
    width: [100, 200, 200, 240, 300],
  })}
`;

export const PrescriptionSyled = styled.div`
  /* @media screen {
    overflow: hidden; height: 0; 
  } */

  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-size: 18px;

  & .info {
    display: flex;
    line-height: 35px;
  }

  & .name {
    width: 80px;
    text-align: right;
    font-weight: bold;
  }

  & .value {
    flex-grow: 1;
    margin-left: 20px;
  }

  & .content-container {
    flex-grow: 1;
    display: flex;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 15px;
    padding-left: 14px;
    display: flex;
    flex-direction: column;
  }

  & .body {
    flex-grow: 1;
    & p {
      padding-left: 40px;
      padding-right: 20px;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
  }

  & .footer {
    padding: 20px;
    border-top: 1px solid #eeeeee;
  }

  & .rx {
    width: 60px;
    height: 60px;
    display: block;
  }

  & .logo {
    border-radius: 4px;
  }
`;

export const PrescriptionContentSyled = styled(Div)`
  white-space: pre-wrap;
`;

export const HeaderStyled = styled(Div)`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0px;
  transition: 0.3s;

  &.sticky {
    background: white;
    padding: 20px;
    height: 90px;

    z-index: 100;
    border-bottom: ${props => `1px solid ${props.theme.colors.grey100}`};
  }
`;
