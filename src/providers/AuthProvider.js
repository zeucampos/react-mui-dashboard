import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "services/auth";

let AuthContext = createContext({});

export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  const navigate = useNavigate();

  let signin = async (form, callback) => {
    await AuthService.authenticate({
      email: form.email,
      password: form.password
    }).catch((e) => {
      toast.error(
        e.response.data.message ||
          "Verifique suas informações e tente novamente."
      );
    });

    const user = await AuthService.getAuthUser();
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/auth");
  };

  let signout = async (callback) => {
    await AuthService.handleLogout();
    setUser(null);
    navigate("/");
  };

  let value = { user, signin, signout };

  const checkAuth = useCallback(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      navigate("/auth");
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
