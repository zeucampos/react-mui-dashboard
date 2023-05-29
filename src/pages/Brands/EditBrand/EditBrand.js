import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, CircularProgress } from "@mui/material";
import Title from "components/Title";
import { useEffect, useState } from "react";
import { Spacer } from "theme/styled";
import MetaTextField from "components/MetaTextField";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import BrandService from "services/brand";

export default function EditBrand() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});

  const fullFilled = !!form.name;


  const changeForm = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullFilled) {
      toast("Preencha todos os campos para atualizar seu anuncio.");
      return;
    }
    setIsLoading(true);

    try {
      await BrandService.update(form);

      window.history.back();
    } catch (error) {
      toast(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (location.state.row) setForm(location.state.row);
  }, []);

  return (
    <>
      <Title>
        #{form.id} - {form.name}
      </Title>

      <Spacer />
      <form onSubmit={handleSubmit}>
        <label>Nome da marca</label>
        <MetaTextField
          required
          value={form.name}
          onChange={(e) => changeForm("name", e.target.value)}
          fullWidth
          id="name"
          autoFocus
        />

        <Spacer />
        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          type="submit"
          fullWidth
          size="large"
          variant="contained"
        >
          {isLoading ? (
            <CircularProgress color="light" />
          ) : (
            "Atualizar dados"
          )}
        </Button>
      </form>
    </>
  );
}
