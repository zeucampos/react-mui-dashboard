import { Button, Checkbox, FormControlLabel } from "@mui/material";
import MetaTextField from "components/MetaTextField";
import Title from "components/Title/Title";
import { toast } from "react-toastify";

export default function PersonalInfo({ changeForm, form, nextStep, redirect }) {
  const personalInfoIsValid =
    !!form.fullname &&
    !!form.email &&
    !!form.phone &&
    !!form.password &&
    !!form.terms;
  return (
    <>
      <Title fontSize={16} textAlign="center">
        Informações básicas
      </Title>
      <MetaTextField
        margin="normal"
        required
        fullWidth
        label="Nome completo"
        name="fullname"
        autoComplete="fullname"
        autoFocus
        onChangeText={(e) => changeForm("fullname", e)}
        validations={["fullname", "required"]}
        value={form.fullname}
      />
      <MetaTextField
        margin="normal"
        required
        fullWidth
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        onChangeText={(e) => changeForm("email", e)}
        validations={["email", "required"]}
        value={form.email}
      />
      <MetaTextField
        margin="normal"
        required
        fullWidth
        label="Celular/WhatsApp"
        name="phone"
        autoComplete="phone"
        autoFocus
        onChangeText={(e) => changeForm("phone", e)}
        validations={["phone", "required"]}
        maskType="phone"
        placeholder="00 00000 0000"
        value={form.phone}
      />
      <MetaTextField
        margin="normal"
        required
        fullWidth
        label="CPF"
        name="cpf"
        autoComplete="cpf"
        autoFocus
        onChangeText={(e) => changeForm("cpf", e)}
        validations={["cpf", "required"]}
        maskType="cpf"
        placeholder="000000000-00"
        value={form.cpf}
      />
      <MetaTextField
        margin="normal"
        required
        fullWidth
        type="password"
        id="password"
        label="Senha"
        name="password"
        autoFocus
        onChangeText={(e) => changeForm("password", e)}
        value={form.password}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={form.terms}
            color="primary"
            onChange={(e) => changeForm("terms", !form.terms)}
          />
        }
        label="Aceito os termos de uso e política de privacidade."
      />
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={(e) => {
          e.preventDefault();
          if (personalInfoIsValid) nextStep();
          else toast("Preencha todos os campos para continuar.");
        }}
      >
        Próximo
      </Button>
      <Button
        type="button"
        fullWidth
        color="light"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={redirect}
      >
        Voltar para login
      </Button>
    </>
  );
}
