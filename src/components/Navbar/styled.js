import styled from "styled-components";
import theme from "theme";
import { FlexColumn } from "theme/styled";

export const NavbarContainer = styled(FlexColumn)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
`;

export const NavbarWrapper = styled(FlexColumn)`
  justify-content: center;
  align-items: space-between;
  height: 80px;
  padding: 0.5rem 1rem;
  flex-basis: 1;
  background-color: ${theme.palette.dark.main};
  z-index: 10;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const Logo = styled.img`
  height: 48px;
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileMenuWrapper = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
  padding: 24px 0;
  background-color: ${theme.palette.primary.main};

  @media (max-width: 768px) {
    display: ${({ showMenu }) => (showMenu ? "flex" : "none")};
  }
`;

export const MenuItem = styled.a`
  color: ${theme.palette.light};
  font-weight: light;
  text-decoration: none;

  &:hover {
    color: #666;
  }
`;

export const MenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    color: #333;
    padding: 0.5rem;
  }
`;

export const NavbarRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
