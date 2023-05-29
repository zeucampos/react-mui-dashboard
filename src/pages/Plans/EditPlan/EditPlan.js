import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, CircularProgress, MenuItem, Select } from "@mui/material";
import Title from "components/Title";
import Selector from "components/Selector";
import { useEffect, useState } from "react";
import { Spacer } from "theme/styled";
import MetaTextField from "components/MetaTextField";
import { toast } from "react-toastify";
import AdService from "services/ad";
import { useLocation, useNavigate } from "react-router-dom";
import PlanService from "services/plan";
import MetaMoneyField from "components/MetaMoneyField";

export default function CreatePlan() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    priority: "alta",
  });

  const fullFilled =
    !!form.title && !!form.description && !!form.priority && !!form.price;

  const changeForm = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullFilled) {
      toast("Preencha todos os campos obrigatórios.");
      return;
    }
    setIsLoading(true);

    try {
      await PlanService.update({ ...form });

      window.history.back();
    } catch (error) {
      toast(error);
    }
    setIsLoading(false);
  };

  const fetchPlan = async () => {
    const res = await PlanService.show(location.state.row.id);
    setForm(res.data);
    form.priority = priorityMap;
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const reversePriorityMap = {
    alta: 1,
    média: 2,
    baixa: 3,
  };

  const priorityMap = {
    1: "alta",
    2: "média",
    3: "baixa",
  };

  const installmentOptions = () => {
    let options = [];
    for (let installment = 1; installment <= 10; installment++) {
      options.push(
        <MenuItem
          value={installment.toString()}
          key={`installment-${installment}`}
        >
          {installment.toString()}
        </MenuItem>
      );
    }

    return options;
  };

  return (
    <>
      <Title>Editar plano de anuncio</Title>
      <Spacer />
      <form onSubmit={handleSubmit}>
        <label>Nome do plano</label>
        <MetaTextField
          value={form.title}
          onChange={(e) => changeForm("title", e.target.value)}
          fullWidth
          label=""
          autoFocus
        />
        <Spacer />
        <label>Descrição do plano</label>
        <MetaTextField
          value={form.description}
          onChange={(e) => changeForm("description", e.target.value)}
          fullWidth
          autoFocus
        />
        <Spacer />
        <label>Preço</label>
        <MetaMoneyField
          required
          value={form.price}
          onChange={(value) => changeForm("price", value)}
          fullWidth
          id="price"
        />
        <Spacer />
        <label>Quantidade de dias ativo</label>
        <MetaTextField
          value={form.time_days}
          onChange={(e) => changeForm("time_days", e.target.value)}
          fullWidth
          autoFocus
        />

        <Spacer />
        <label htmlFor="installments">Parcelas</label>
        <Select
          fullWidth
          id="installments"
          value={form.installments}
          label="installments_id"
          onChange={(e) => changeForm("installments", e.target.value)}
        >
          <MenuItem value={""} key={`installments-initial`}>
            Todo o período
          </MenuItem>
          {installmentOptions()}
        </Select>
        <Spacer />
        <label>Valor da parcela</label>
        <MetaMoneyField
          required
          value={form.installment_value}
          onChange={(value) => changeForm("installment_value", value)}
          fullWidth
          id="installment_value"
        />
        <Spacer />

        <label>Selecione a prioridade em visibilidade</label>
        <Selector
          selected={priorityMap[form.priority]}
          options={["alta", "média", "baixa"]}
          onSelect={(e) => changeForm("priority", reversePriorityMap[e])}
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
          {isLoading ? <CircularProgress color="light" /> : "Salvar alterações"}
        </Button>
      </form>
    </>
  );
}
