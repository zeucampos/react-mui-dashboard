import styled from "styled-components";
import theme from "theme";

export const Wrapper = styled.div`
  border-radius: 24px;
  width: min-content;
  background-color: ${theme.palette.bg};
  display: flex;
`;

export const Item = styled.div`
  border-radius: 24px;
  font-weight: 500;
  padding: 16px;
  color: black;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }

  ${({ active }) =>
    active && `background-color: ${theme.palette.primary.main};`};
`;
