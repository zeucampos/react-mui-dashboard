import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Title from "components/Title";
import { useNavigate } from "react-router-dom";
import MetaTextField from "components/MetaTextField";
import { useAuth } from "providers/AuthProvider";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Usados CADCAM
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { signin, signout } = useAuth();

  const [form, setForm] = React.useState({
    email: "",
    password: ""
  });

  const isValidForm = !!form.email && !!form.password;

  const changeForm = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidForm) {
      toast.error("Informe seu e-mail e senha para acessar.");
      return;
    }

    signin(form);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        boxShadow={1}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
        bgcolor="light"
        padding={3}
      >
        <Avatar color="light" sx={{ m: 1, bgcolor: "grey.900" }}>
          <LockOutlinedIcon color="primary" />
        </Avatar>
        <Title textAlign="center">
          Faça login para começar a vender seus equipamentos
        </Title>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            value={form.password}
            onChangeText={(e) => changeForm("password", e)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.remember}
                onChange={(event) =>
                  changeForm("remember", event.target.checked)
                }
                color="primary"
              />
            }
            label="Lembre de mim"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Acessar
          </Button>
          <Link
            href="#"
            onClick={() => navigate("/signup")}
            variant="body2"
            color="secondary"
          >
            {"Não tem uma conta? Cadastre-se"}
          </Link>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
