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

export const ContentSyled = styled.div`
  word-break: break-all;
  white-space: pre;
`;

export const PrescriptionSyled = styled.div`
  padding: 130px 70px;

  /* & .body {
    flex-grow: 1;
    & p {
      padding-left: 40px;
      padding-right: 20px;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
  } */

  /* display: flex;
  flex-direction: column;
  height: 100vh;
  font-size: 18px;

  & .content-container {
    flex-grow: 1;
    display: flex;
    border: 2px solid black;
    border-radius: 10px;
    margin-top: 15px;
    padding: 0px 14px;
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
  } */
`;

export const PrescriptionContentSyled = styled(Div)`
  white-space: pre-wrap;
`;

export const HeaderStyled = styled(Div)`
  display: flex;
  justify-content: space-between;
  top: 0px;
  transition: 0.3s;
  /* position: sticky; */

  /* &.sticky {
    background: white;
    padding: 20px;
    height: 90px;

    z-index: 100;
    border-bottom: ${props => `1px solid ${props.theme.colors.grey100}`};
  } */
`;

export const PatientContainerStyled = styled(Div)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.texts[2]};
  padding: 10px 5px 20px 5px;
`;

export const PatientInfoStyled = styled(Div)`
  display: flex;
  line-height: 35px;

  & .name {
    width: 80px;
    font-weight: bold;
  }

  & .value {
    flex-grow: 1;
    margin-left: 20px;
  }
`;
