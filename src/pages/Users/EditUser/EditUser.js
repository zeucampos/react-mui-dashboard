import { Button, Checkbox, FormControlLabel } from "@mui/material";
import MetaTextField from "components/MetaTextField";
import Title from "components/Title/Title";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "services/user";

export default function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const changeForm = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const personalInfoIsValid = useMemo(
    () =>
      !!form.fullname && !!form.email && !!form.phone && !!form.cpf && [form]
  );

  const save = async () => {
    const res = await UserService.update(form);

    if (res) {
      toast("Usuário editado com sucesso!");
      window.history.back();
    }
  };

  useEffect(() => {
    setForm(location.state.row);
  }, []);

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
        disabled
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

      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={(e) => {
          e.preventDefault();
          console.log(form);
          if (personalInfoIsValid) save();
          else toast("Preencha todos os campos para continuar.");
        }}
      >
        Próximo
      </Button>
    </>
  );
}
