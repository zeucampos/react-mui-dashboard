import styled from "styled-components";

const Title = styled.h1`
  font-weight: 700;
  color: black;
  line-height: 120%;
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}px`};
`;

export default Title;
