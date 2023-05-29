import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAds } from "providers/AdProvider";
import { Box, TextField } from "@mui/material";
import Title from "components/Title";

export default function CreateBanner() {
  const { current } = useAds();

  return (
    <>
      <Title>Novo anúncio</Title>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
      />
    </>
  );
}
