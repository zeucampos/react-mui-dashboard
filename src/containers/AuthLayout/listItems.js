import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import Logout from "@mui/icons-material/Logout";
import { Money, Person } from "@mui/icons-material";
import { ADMIN, CLIENT } from "utils/userType";

export const MainListItems = ({ navigate, user }) => {
  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/auth/")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      {user.user_type === ADMIN && (
        <>
          <ListItemButton onClick={() => navigate("/auth/ads")}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Anúncios" />
          </ListItemButton>

          {/* <ListItemButton onClick={() => navigate("/auth/banners")}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Banners" />
          </ListItemButton> */}

          <ListItemButton onClick={() => navigate("/auth/plans")}>
            <ListItemIcon>
              <Money />
            </ListItemIcon>
            <ListItemText primary="Planos de anúncio" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/auth/brands")}>
            <ListItemIcon>
              <Money />
            </ListItemIcon>
            <ListItemText primary="Marcas" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/auth/users")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItemButton>
        </>
      )}

      {user.user_type === CLIENT && (
        <>
          <ListItemButton onClick={() => navigate("/auth/ads/my")}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Meus Anúncios" />
          </ListItemButton>
          {/* <ListItemButton onClick={() => navigate("/auth/ads/my")}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Minha conta" />
          </ListItemButton> */}
        </>
      )}
    </React.Fragment>
  );
};

export const secondaryListItems = ({ onLogout }) => (
  <ListItemButton onClick={onLogout}>
    <ListItemIcon>
      <Logout />
    </ListItemIcon>
    <ListItemText primary="Sair" />
  </ListItemButton>
);
