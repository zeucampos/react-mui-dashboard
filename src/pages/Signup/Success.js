import { Button } from "@mui/material";
import Title from "components/Title/Title";
import { Spacer } from "theme/styled";

export default function Success({ form, redirect }) {
  return (
    <>
      <Title>Cadastro realizado com sucesso!</Title>
      <Spacer />
      <p>
        Acesse sua conta e comece a anunciar seu CADCAM.
      </p>
      <Spacer />

      <Button variant="contained" fullWidth onClick={redirect}>
        Ir para login
      </Button>
    </>
  );
}
