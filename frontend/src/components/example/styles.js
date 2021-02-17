import styled from 'styled-components';

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

export const Type = styled.h1`
  width: 74px;
  height: 16px;
  margin: ${props => props.margin};
  font-family: SegoeUI;
  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: ${props => props.color};
`;




