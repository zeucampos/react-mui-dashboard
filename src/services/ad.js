import { toast } from "react-toastify";
import http from "./http";

const store = async (form) => {
  const res = await http.service.post("/equipaments/store", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // if (res.status === 413) {
    toast.error(
      "Arquivo de imagem muito pesado. Por favor, tente uma imagem menor. Ou recorte para diminuir."
    );
  // }

  return res.data;
};

const update = async (form) => {
  return await http.service.put(`/equipaments/approve/${form.id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const show = async (id) => {
  return await http.service.get(`/equipaments/show/${id}`);
};

const totalActive = async (id) => {
  const res = await http.service.get(`/equipaments/active-count`);
  return res.data;
};

const index = async (page) => {
  const res = await http.get(`/equipaments/index?page=${page}`);
  return res.data;
};

const destroy = async (id) => {
  const res = await http.del(`/equipaments/delete/${id}`);
  return res.data;
};

const destroyPhoto = async (id) => {
  const res = await http.del(`/equipament-photos/delete/${id}`);
  return res.data;
};

const findPayment = async (id) => {
  const res = await http.get(`/equipaments/find-payment/${id}`);
  return res.data;
};

const AdService = {
  findPayment,
  store,
  index,
  update,
  show,
  destroy,
  destroyPhoto,
  totalActive,
};

export default AdService;
