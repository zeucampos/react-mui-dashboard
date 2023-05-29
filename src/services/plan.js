import http from "./http";

const store = async (form) => {
  return await http.service.post("/ad-plans/store", form);
};

const update = async (form) => {
  return await http.service.put(`/ad-plans/update/${form.id}`, form);
};

const show = async (id) => {
  return await http.service.get(`/ad-plans/show/${id}`);
};

const all = async (page) => {
  const res = await http.get(`/ad-plans/all`);
  return res.data;
};

const index = async (page) => {
  const res = await http.get(`/ad-plans/index?page=${page}`);
  return res.data;
};

const destroy = async (id) => {
  const res = await http.del(`/ad-plans/${id}`);
  return res.data;
};

const PlanService = {
  store,
  all,
  index,
  update,
  show,
  destroy
};

export default PlanService;
