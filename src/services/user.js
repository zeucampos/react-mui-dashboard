import http from "./http";

const store = async (form) => {
  return await http.service.post("/users/store", form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

const update = async (form) => {
  return await http.service.put(`/users/update/${form.id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

const show = async (id) => {
  return await http.service.get(`/users/show/${id}`);
};

const index = async (page) => {
  const res = await http.get(`/users/index?page=${page}`);
  return res.data;
};

const destroy = async (id) => {
  const res = await http.del(`/users/delete/${id}`);
  return res.data;
};

const UserService = {
  store,
  index,
  update,
  show,
  destroy
};

export default UserService;
