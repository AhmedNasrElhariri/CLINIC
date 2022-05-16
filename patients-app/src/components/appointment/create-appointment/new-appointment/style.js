import styled from "styled-components";
import { Button } from "rsuite";
export const Container = styled.div`
  display: flex;
  direction: ${(props) => props.dir};
`;
export const LeftContainer = styled.div`
  width: 320px;
  margin-right: 20px;
`;
export const RightContainer = styled.div`
  width: 320px;
`;
export const SecondRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Header = styled.div`
  text-align: center;
  margin-top: ${(props) => props.mt};
  font-size: 30px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
export const LogOutButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 10px;
`;
