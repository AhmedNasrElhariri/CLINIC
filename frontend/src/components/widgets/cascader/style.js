import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Div } from "components/widgets";

export const ItemsBox = styled(Div)`
  padding: 4px 6px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

export const SelectItem = styled(Div)`
  padding: 4px 6px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Item = styled(Div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ItemSelect = styled(Div)`
  padding: 4px 6px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &::after {
    content: "";
    width: 5px;
    height: 3px;
    background: gray;
    margin: 0 5px;
  }
  &:last-of-type {
    &::after {
      display: none;
    }
  }
`;
export const DeleteBtn = styled.button`
  background: none;
  color: red;
  margin: 20px;
`;
