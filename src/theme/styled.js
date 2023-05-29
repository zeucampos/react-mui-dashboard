import styled from "styled-components";
import themeConfig from "theme";

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  gap: ${(props) => props.gap || 0}px;
  align-items: ${(props) => props.alignItems || "flex-start"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};

  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  gap: ${(props) => props.gap || 0}px;
  align-items: ${(props) => props.alignItems || "flex-start"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  flex-direction: column;

  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
`;

export const Card = styled(FlexColumn)`
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  background-color: ${themeConfig.palette.light};

  ${({ shadow }) =>
    shadow &&
    `
    box-shadow: 0 0 16px rgba(0,0,0,.1)
  `}
`;

export const Spacer = styled.div`
  width: ${({ size }) => (size ? `${size}px` : `16px`)};
  height: ${({ size }) => (size ? `${size}px` : `16px`)};
`;
