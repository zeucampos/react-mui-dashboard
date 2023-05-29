import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Title from "components/Title";
import Selector from "components/Selector";
import { useEffect, useState } from "react";
import { FlexColumn, FlexRow, Spacer } from "theme/styled";
import * as S from "./styled";
import MetaTextField from "components/MetaTextField";
import { toast } from "react-toastify";
import AdService from "services/ad";
import { useNavigate } from "react-router-dom";
import BrandService from "services/brand";
import PlanService from "services/plan";
import PlanSelectionDialog from "containers/Dialogs/PlanSelectionDialog/PlanSelectionDialog";
import { useAds } from "providers/AdProvider";
import axios from "axios";
import { CloudUpload } from "@mui/icons-material";
import MetaMoneyField from "components/MetaMoneyField";

export default function CreateAd() {
  const navigate = useNavigate();
  const { setCurrent } = useAds();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    type: "",
    // model: "",
    serie_number: "",
    brandId: "",
    history: "",
    price: "",
    plan_id: null,
  });
  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [plans, setPlans] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [planSelectionOpenStatus, setPlanSelectionOpenStatus] = useState(false);

  const fullFilled =
    !!form.title &&
    !!form.type &&
    !!form.serie_number &&
    !!form.brandId &&
    !!form.history &&
    !!form.year &&
    !!form.uf &&
    !!form.price &&
    !!form.city &&
    images.length >= 1;

  function handleImageUpload(event) {
    const newImages = [...images];
    for (let i = 0; i < event.target.files.length; i++) {
      newImages.push(event.target.files[i]);
    }
    setImages(newImages);
  }

  function removeImage(index) {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }

  const changeForm = (key, value) => setForm({ ...form, [key]: value });

  const nextStep = async (event) => {
    event.preventDefault();

    if (!fullFilled) {
      toast("Preencha todos os campos para cadastrar seu equipamento.");
      return;
    }

    setPlanSelectionOpenStatus(true);
  };

  const handleSubmit = async (planId) => {
    setIsLoading(true);

    try {
      const created = await AdService.store({ ...form, images, planId });

      setCurrent(created);
      setTimeout(() => {
        navigate(`/auth/ads/checkout/${created.id}`);
      }, 500);
    } catch (error) {
      toast(error);
    }
    setIsLoading(false);
  };

  const getBrands = async () => {
    const brands = await BrandService.all();

    setBrands(brands);
  };

  const getPlans = async () => {
    const plans = await PlanService.all();

    setPlans(plans);
  };

  const getDistricts = async () => {
    const res = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    );
    setDistricts(res.data);
  };

  const getCities = async () => {
    const res = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.uf}/municipios`
    );
    setCities(res.data);
  };

  useEffect(() => {
    getCities();
  }, [form.uf]);

  useEffect(() => {
    if (brands.length === 0) getBrands();
    if (plans.length === 0) getPlans();
    if (districts.length === 0) getDistricts();
  }, []);

  return (
    <>
      <Title>Novo anúncio</Title>
      <Spacer />
      <form onSubmit={handleSubmit}>
        <label>Selecione o tipo de equipamento que deseja anunciar</label>
        <Selector
          selected={form.type}
          options={["Escâner", "Fresadora", "Impressora 3D"]}
          onSelect={(e) => changeForm("type", e)}
        />
        <MetaTextField
          margin="normal"
          required
          onChange={(e) => changeForm("title", e.target.value)}
          fullWidth
          id="title"
          label="Título do anuncio"
          autoFocus
        />
        <MetaTextField
          margin="normal"
          required
          onChange={(e) => changeForm("serie_number", e.target.value)}
          fullWidth
          id="serie_number"
          label="Nº de série"
        />
        <MetaTextField
          margin="normal"
          required
          onChange={(e) => changeForm("year", e.target.value)}
          fullWidth
          id="year"
          label="Ano de fabricação"
        />
        <MetaTextField
          margin="normal"
          required
          onChange={(e) => changeForm("history", e.target.value)}
          fullWidth
          id="history"
          label="Histórico do equipamento"
        />
        <MetaMoneyField
          required
          value={form.price}
          onChange={(value) => changeForm("price", value)}
          fullWidth
          id="price"
          label="Valor"
          placeholder="100.000,00"
        />
        <Spacer />
        <div>
          <label htmlFor="brand">Marca</label>
          <Select
            fullWidth
            id="brand"
            value={form.brandId}
            label="brand_id"
            onChange={(e) => changeForm("brandId", e.target.value)}
          >
            {brands.map((brand) => (
              <MenuItem value={brand.id} key={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Spacer />
        <FlexColumn>
          <label>Estado</label>
          <Select
            fullWidth
            id="uf"
            value={form.uf}
            displayEmpty={true}
            renderValue={(r) => <p>{form.uf}</p>}
            onChange={(e) => changeForm("uf", e.target.value)}
          >
            <MenuItem selected={form.uf === ""} value="" key="empty">
              Todos os estados
            </MenuItem>
            {districts?.map((uf) => (
              <MenuItem
                selected={form.uf === uf.sigla}
                value={uf.sigla}
                key={uf.sigla}
              >
                {uf.sigla}
              </MenuItem>
            ))}
          </Select>
        </FlexColumn>
        <Spacer />
        <FlexColumn>
          <label>Cidade</label>
          <Select
            fullWidth
            id="city"
            value={form.city}
            displayEmpty={true}
            renderValue={(r) => <p>{form.city}</p>}
            onChange={(e) => changeForm("city", e.target.value)}
          >
            <MenuItem selected={form.city === ""} value="" key="empty-city">
              Todas as cidades
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.nome}>
                {city.nome}
              </MenuItem>
            ))}
          </Select>
        </FlexColumn>
        <Spacer />

        {/* <MetaTextField
          margin="normal"
          required
          onChange={(e) => changeForm("city", e.target.value)}
          fullWidth
          id="city"
          label="Cidade"
        />
        <Spacer /> */}

        <PlanSelectionDialog
          open={planSelectionOpenStatus}
          selectedValue={form.selectedPlan}
          onSelect={handleSubmit}
          onClose={() => setPlanSelectionOpenStatus(false)}
          plans={plans}
          r
        />

        <Spacer />

        <Card sx={{ boxShadow: "none" }}>
          <CardContent>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              porttitor orci eget nunc blandit, at vehicula mauris mattis.
              Vivamus id accumsan arcu, a consequat enim. Aliquam nisl enim,
              pulvinar in nisi ac, rutrum consectetur sem. Maecenas ullamcorper
              tempus fermentum. Quisque nisi diam, tempor ac iaculis in, varius
              placerat leo.
            </Typography>
            <Spacer />
            <Stack direction="row" spacing={1} alignItems="center">
              <label htmlFor="upload-file" style={{ width: "100%" }}>
                <input
                  id="upload-file"
                  name="upload-file"
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <Button
                  color="info"
                  size="large"
                  fullWidth
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  Selecionar fotos do equipamento
                </Button>
              </label>
            </Stack>
          </CardContent>
        </Card>

        <Spacer />
        {/* <div>
          <label htmlFor="image-upload">Fotos do equipamento:</label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </div> */}
        <S.ImagesContainer>
          {images.map((image, index) => (
            <S.ImageContainer key={index}>
              <S.Image src={URL.createObjectURL(image)} alt="Preview" />
              <FlexRow justifyContent="space-between">
                <Button color="error" onClick={() => removeImage(index)}>
                  Remover
                </Button>
                <Button
                  color="info"
                  onClick={() => changeForm("thumbnail", image.name)}
                >
                  Definir capa
                </Button>
              </FlexRow>
            </S.ImageContainer>
          ))}
        </S.ImagesContainer>
        <Spacer />
        <Button
          disabled={isLoading}
          onClick={nextStep}
          type="submit"
          fullWidth
          size="large"
          variant="contained"
        >
          {isLoading ? <CircularProgress color="light" /> : "Continuar"}
        </Button>
      </form>
    </>
  );
}
