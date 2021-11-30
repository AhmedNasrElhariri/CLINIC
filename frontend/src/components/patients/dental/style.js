import styled from 'styled-components';
import { space } from 'styled-system';
export const Container = styled.div`
  width: 710px;
  height: 327px;
  position: absolute;
  top: 268px;
  left: 360px;
  border: 1px solid #eef1f1;
  background-color: #eef1f1;
  border: 1px solid #eef1f1;
  opacity: 1;
`;

export const NumberHeader = styled.img.attrs(({ src }) => ({
  src,
}))`
  ${space}
  top: ${props => props.top};
  left: ${props => props.left};
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
`;

export const DentalIcon = styled.img.attrs(props => ({
  src: props.img,
}))`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
`;
