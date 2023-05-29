import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000
});

const getToken = () => {
  return localStorage.getItem("token");
};

const addTokenToHeader = (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

service.interceptors.request.use(addTokenToHeader);

const get = (endpoint) => {
  return service.get(endpoint);
};

const post = (endpoint, data) => {
  return service.post(endpoint, data);
};

const put = (endpoint, data) => {
  return service.put(endpoint, data);
};

const del = (endpoint) => {
  return service.delete(endpoint);
};

const http = {
  get,
  post,
  put,
  del,
  service
};

export default http;
