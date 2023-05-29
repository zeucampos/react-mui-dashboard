import { useState } from "react";
import { Menu } from "react-feather";
import {
  Logo,
  MenuButton,
  MenuItem,
  MenuWrapper,
  MobileMenuWrapper,
  NavbarWrapper,
  NavbarRow,
  NavbarContainer
} from "./styled";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuButtonClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <NavbarRow alignItems="center" justifyContent="space-between">
          <a href={process.env.REACT_APP_WEBAPP_URL}>
            <Logo src="/assets/img/logo.svg" alt="Logo" />
          </a>
          <MenuWrapper>
            <MenuItem
              href={process.env.REACT_APP_WEBAPP_URL}
              target="_blank"
            >
              Comprar
            </MenuItem>
            <MenuItem href={`/`}>Login</MenuItem>
            <MenuItem href={`/signup`}>Cadastre-se</MenuItem>
          </MenuWrapper>
          <MenuButton onClick={handleMenuButtonClick}>
            <Menu color="white" />
          </MenuButton>
        </NavbarRow>
      </NavbarWrapper>

      <MobileMenuWrapper showMenu={showMenu}>
        <MenuItem href={`${process.env.REACT_APP_WEBAPP_URL}`} target="_blank">
          Comprar
        </MenuItem>
        <MenuItem href={`/`}>Login</MenuItem>
        <MenuItem href={`/signup`}>Cadastre-se</MenuItem>
      </MobileMenuWrapper>
    </NavbarContainer>
  );
}
