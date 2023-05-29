import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";
import Title from "components/Title";
import Selector from "components/Selector";
import { useEffect, useState } from "react";
import { FlexColumn, FlexRow, Spacer } from "theme/styled";
import * as S from "./styled";
import MetaTextField from "components/MetaTextField";
import { toast } from "react-toastify";
import AdService from "services/ad";
import { useLocation, useNavigate } from "react-router-dom";
import BrandService from "services/brand";
import { confirmAlert } from "react-confirm-alert";
import MetaMoneyField from "components/MetaMoneyField";
import axios from "axios";

export default function EditAd() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [districts, setDistricts] = useState([]);

  const fullFilled =
    !!form.title &&
    !!form.type &&
    !!form.serie_number &&
    !!form.brand_id &&
    !!form.history &&
    !!form.year &&
    !!form.city &&
    !!form.price;

  function handleImageUpload(event) {
    const newImages = [...images];
    for (let i = 0; i < event.target.files.length; i++) {
      newImages.push(event.target.files[i]);
    }
    setImages(newImages);
  }

  const getDistricts = async () => {
    const res = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    );
    setDistricts(res.data);
  };

  function removeImage(index) {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }

  const handleDeletePhoto = async (id, index) => {
    confirmAlert({
      title: "Atenção!",
      message: "Tem certeza de que deseja deletar este item?",
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            AdService.destroyPhoto(id).then((res) => {
              toast("Foto apagada com sucesso!");
              const newForm = {
                ...form,
                photos: form.photos.filter((r) => r.id !== id),
              };
              setForm(newForm);
            });
          },
        },
        {
          label: "Não",
          onClick: () => null,
        },
      ],
    });
  };

  const changeForm = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("🚀 ~ file: EditAd.js:89 ~ handleSubmit ~ form:", form);

    if (!fullFilled) {
      toast("Preencha todos os campos para atualizar seu anuncio.");
      return;
    }
    setIsLoading(true);

    try {
      await AdService.update({ ...form, images });

      window.history.back();
    } catch (error) {
      toast(error);
    }
    setIsLoading(false);
  };

  const getBrands = async () => {
    const brands = await BrandService.all();

    setBrands(brands);
  };

  const getEquipament = async () => {
    const res = await AdService.show(location.state.row.id);
    setForm(res.data.data);
  };

  useEffect(() => {
    if (brands.length === 0) getBrands();
    if (districts.length === 0) getDistricts();
    getEquipament();
  }, []);

  return (
    <>
      <Title>
        #{form.id} - {form.title}
      </Title>
      <Spacer />
      <form onSubmit={handleSubmit}>
        <label>Selecione o tipo de equipamento que deseja anunciar</label>
        <Selector
          selected={form.type}
          options={["Escâner", "Fresadora", "Impressora 3D"]}
          onSelect={(e) => null}
        />
        <Spacer />
        <label>Título do anuncio</label>
        <MetaTextField
          value={form.title}
          onChange={(e) => changeForm("title", e.target.value)}
          fullWidth
          disabled
          id="title"
          autoFocus
        />
        <Spacer />
        <label>Número de série</label>
        <MetaTextField
          disabled
          value={form.serie_number}
          onChange={(e) => changeForm("serie_number", e.target.value)}
          fullWidth
          id="serie_number"
        />
        <Spacer />
        <label>Ano de fabricação</label>
        <MetaTextField
          disabled
          margin="normal"
          value={form.year}
          onChange={(e) => changeForm("year", e.target.value)}
          fullWidth
          id="year"
          label="Ano de fabricação"
        />
        <Spacer />
        <label>Histórico do equipamento</label>
        <MetaTextField
          required
          value={form.history}
          onChange={(e) => changeForm("history", e.target.value)}
          fullWidth
          id="history"
        />
        <Spacer />
        <label>Valor</label>

        <MetaMoneyField
          disabled
          value={form.price}
          onChange={(value) => changeForm("price", value)}
          fullWidth
          id="price"
          label="Valor"
          placeholder="100.000,00"
        />
        <Spacer />
        <MetaTextField
          disabled
          margin="normal"
          value={form.brand?.name}
          onChange={(e) => changeForm("brand", e.target.value)}
          fullWidth
          id="brand"
          label="Marca"
        />
        <FlexColumn>
          <label>Estado</label>
          <Select
            disabled
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
        <MetaTextField
          disabled
          margin="normal"
          value={form.city}
          onChange={(e) => changeForm("city", e.target.value)}
          fullWidth
          id="city"
          label="Cidade"
        />
        <Spacer />

        {/* <Stack direction="row" spacing={1} alignItems="center">
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
        </Stack> */}

        <S.ImagesContainer>
          {images.map((image, index) => (
            <S.ImageContainer key={index}>
              <S.Image src={URL.createObjectURL(image)} alt="Preview" />
              <FlexRow justifyContent="space-between">
                <Button color="error" onClick={() => null}>
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

        <S.ImagesContainer>
          {form.photos?.map((image, index) => (
            <S.ImageContainer key={index}>
              <S.Image
                src={`${process.env.REACT_APP_API_URL}${image.image_url}`}
                alt="Preview"
              />
              <FlexRow justifyContent="space-between">
                <Button color="error" onClick={() => null}>
                  Remover
                </Button>
              </FlexRow>
            </S.ImageContainer>
          ))}
        </S.ImagesContainer>

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
            "Atualizar meu anuncio"
          )}
        </Button>
      </form>
    </>
  );
}
