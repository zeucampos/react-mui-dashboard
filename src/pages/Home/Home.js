import "react-responsive-carousel/lib/styles/carousel.min.css";
import Lottie from "lottie-react";
import dashboard from "assets/lotties/dashboard-developer.json";
import { FlexColumn } from "theme/styled";
import { Title } from "@mui/icons-material";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <FlexColumn alignItems="center">
      <Lottie
        style={{ width: "50%", marginRight: "auto", marginLeft: "auto" }}
        animationData={dashboard}
        loop={true}
      />

      <Typography variant="h5" fontWeight="bold">
        Seja bem-vindo(a) ao seu painel!
      </Typography>
      <Typography variant="p">Gerencie tudo sobre seus anuncios!</Typography>
    </FlexColumn>
  );
}
