import * as React from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
  Link
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import PublicLayout from "./containers/PublicLayout";
import { AuthProvider, useAuth } from "./providers/AuthProvider";
import "./index.css";
import AuthLayout from "containers/AuthLayout";
import { createTheme, ThemeProvider } from "@mui/material";
import themeConfig from "theme";
import AdList from "pages/Ad/AdList";
import { AdProvider } from "providers/AdProvider";
import MyAds from "pages/Ad/MyAds";
import CreateAd from "pages/Ad/CreateAd";
import PlanList from "pages/Plans/PlanList";
import Signup from "pages/Signup";
import EditAd from "pages/Ad/EditAd";
import BannerList from "pages/Banner/BannerList/BannerList";
import EditPlan from "pages/Plans/EditPlan/EditPlan";
import Checkout from "pages/Checkout/Checkout";
import CreditCard from "pages/Checkout/CreditCardMP";
import Boleto from "pages/Checkout/Boleto";
import BrandsList from "pages/Brands/BrandsList/BrandsList";
import EditBrand from "pages/Brands/EditBrand/EditBrand";
import CreateBrand from "pages/Brands/CreateBrand/CreateBrand";
import UsersList from "pages/Users/UsersList/UsersList";
import CreateUser from "pages/Users/CreateBrand/CreateUser";
import EditUser from "pages/Users/EditUser/EditUser";

const mdTheme = createTheme(themeConfig);

export default function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route
            path="/auth"
            element={
              <RequireAuth>
                <AuthLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />
            <Route
              path="/auth/ads"
              element={
                <AdProvider>
                  <Outlet />
                </AdProvider>
              }
            >
              <Route index element={<AdList />} />
              <Route path="/auth/ads/my" element={<MyAds />} />
              <Route path="/auth/ads/create" element={<CreateAd />} />
              <Route path="/auth/ads/edit" element={<EditAd />} />
              <Route path="/auth/ads/checkout/:id" element={<Checkout />} />
              <Route
                path="/auth/ads/checkout/:id/credit-card"
                element={<CreditCard />}
              />
              <Route
                path="/auth/ads/checkout/:id/boleto"
                element={<Boleto />}
              />
            </Route>
            <Route
              path="/auth/users"
              element={
                <AdProvider>
                  <Outlet />
                </AdProvider>
              }
            >
              <Route index element={<UsersList />} />
              <Route path="/auth/users/edit" element={<EditUser />} />
              <Route path="/auth/users/create" element={<CreateUser />} />
            </Route>
            <Route
              path="/auth/plans"
              element={
                <AdProvider>
                  <Outlet />
                </AdProvider>
              }
            >
              <Route index element={<PlanList />} />
              <Route path="/auth/plans/edit" element={<EditPlan />} />
            </Route>
            <Route
              path="/auth/brands"
              element={
                <AdProvider>
                  <Outlet />
                </AdProvider>
              }
            >
              <Route index element={<BrandsList />} />
              <Route path="/auth/brands/edit" element={<EditBrand />} />
              <Route path="/auth/brands/create" element={<CreateBrand />} />
            </Route>
            <Route
              path="/auth/banners"
              element={
                <AdProvider>
                  <Outlet />
                </AdProvider>
              }
            >
              <Route index element={<BannerList />} />
              <Route path="/auth/banners/create" element={<CreateUser />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
