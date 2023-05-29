import http from "./http";

const store = async (form) => {
  return await http.service.post("/banners/store", form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

const update = async (form) => {
  return await http.service.put(`/banners/update/${form.id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

const show = async (id) => {
  return await http.service.get(`/banners/show/${id}`);
};

const index = async (page) => {
  const res = await http.get(`/banners/index?page=${page}`);
  return res.data;
};

const destroy = async (id) => {
  const res = await http.del(`/banners/${id}`);
  return res.data;
};

const BannerService = {
  store,
  index,
  update,
  show,
  destroy
};

export default BannerService;
