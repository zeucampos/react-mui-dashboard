import http from "./http";

const store = async (form) => {
  return await http.service.post("/brands/store", form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

const update = async (form) => {
  return await http.service.put(`/brands/update/${form.id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

const show = async (id) => {
  return await http.service.get(`/brands/show/${id}`);
};

const index = async (page) => {
  const res = await http.get(`/brands/index?page=${page}`);
  return res.data;
};

const all = async (page) => {
  const res = await http.get(`/brands/all`);
  return res.data;
};

const destroy = async (id) => {
  const res = await http.del(`/brands/delete/${id}`);
  return res.data;
};

const BrandService = {
  store,
  index,
  update,
  show,
  destroy,
  all
};

export default BrandService;
