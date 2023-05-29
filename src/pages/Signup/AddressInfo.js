import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import MetaTextField from "components/MetaTextField";
import Title from "components/Title/Title";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddressInfo({
  changeForm,
  form,
  onSubmit,
  prevStep,
  setForm,
  isLoading
}) {
  const addressInfoIsValid =
    !!form.cep &&
    !!form.logradouro &&
    !!form.bairro &&
    !!form.cidade &&
    !!form.uf &&
    !!form.complemento &&
    !!form.numero;

  const searchCEP = useCallback(async () => {
    if (form.cep.length >= 8) {
      const endereco = await axios.get(
        `https://viacep.com.br/ws/${form.cep}/json/`
      );
      setForm({
        ...form,
        bairro: endereco.data.bairro,
        complemento: endereco.data.complemento,
        uf: endereco.data.uf,
        logradouro: endereco.data.logradouro,
        cidade: endereco.data.localidade
      });
    }
  }, [form.cep]);

  useEffect(() => {
    searchCEP();
  }, [form.cep]);

  return (
    <>
      <Title fontSize={16} textAlign="center">
        Informações de endereço
      </Title>
      <MetaTextField
        margin="normal"
        required
        fullWidth
        id="cep"
        label="CEP"
        name="cep"
        autoComplete="cep"
        autoFocus
        onChangeText={(e) => changeForm("cep", e)}
        validations={["cep", "required"]}
        value={form.cep}
      />
      <MetaTextField
        margin="normal"
        required
        fullWidth
        id="logradouro"
        label="Logradouro"
        name="logradouro"
        onChangeText={(e) => changeForm("logradouro", e)}
        value={form.logradouro}
      />
      <MetaTextField
        margin="normal"
        required
        fullWidth
        id="uf"
        label="UF"
        name="uf"
        onChangeText={(e) => changeForm("uf", e)}
        value={form.uf}
      />
      <MetaTextField
        margin="normal"
        required
        fullWidth
        id="cidade"
        label="Cidade"
        name="cidade"
        onChangeText={(e) => changeForm("cidade", e)}
        value={form.cidade}
      />
      <MetaTextField
        margin="normal"
        required
        fullWidth
        id="bairro"
        label="Bairro"
        name="bairro"
        value={form.bairro}
      />
      <MetaTextField
        margin="normal"
        required
        fullWidth
        id="complemento"
        label="Complemento"
        name="complemento"
        onChangeText={(e) => changeForm("complemento", e)}
        value={form.complemento}
      />
      <MetaTextField
        margin="normal"
        required
        fullWidth
        id="numero"
        label="Número"
        name="numero"
        onChangeText={(e) => changeForm("numero", e)}
        value={form.numero}
      />

      <Button
        type="button"
        fullWidth
        disabled={isLoading}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => {
          if (addressInfoIsValid) {
            onSubmit();
          } else toast("Preencha todos os campos para continuar.");
        }}
      >
        {isLoading ? <CircularProgress color="light" /> : "Finalizar cadastro"}
      </Button>
      <Button
        type="button"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        onClick={() => prevStep()}
      >
        Voltar
      </Button>
    </>
  );
}
