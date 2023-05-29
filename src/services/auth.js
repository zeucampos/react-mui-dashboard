import http from "./http";

const authenticate = async (form) => {
  const response = await http.post("/authenticate", form);
  const { token } = response.data;
  localStorage.setItem("token", token);
  return token;
};

const getAuthUser = async () => {
  const res = await http.service.get(`/users/auth`);
  return res.data;
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Faça o logout do usuário ou redirecione para a página de login
};

const AuthService = { authenticate, handleLogout, getAuthUser };

export default AuthService;
