import { useInternalAuthContext } from "./AuthContext";
import authStorage from "./authStorage";

const useAuth = () => {
  const { token, setToken } = useInternalAuthContext();

  const login = (token: string) => {
    authStorage.storeToken(token);
    setToken(token);
  };
  const logout = () => {
    authStorage.removeUser();
    setToken(undefined);
  };
  return { token, login, logout };
};

export default useAuth;
