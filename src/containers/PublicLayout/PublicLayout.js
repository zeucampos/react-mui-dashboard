import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import { FlexColumn } from "theme/styled";
import * as S from "./styled";
import { Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";

export default function PublicLayout() {
  return (
    <Grid
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
      }}
    >
      <Navbar />
      <FlexColumn style={{ paddingTop: 80 + 32 }} gap={32}>
        <ToastContainer />
        <Outlet />
      </FlexColumn>
    </Grid>
  );
}
