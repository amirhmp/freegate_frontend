import User from "../models/User";
import { useInternalAuthContext } from "./AuthContext";
import authStorage from "./authStorage";

const useAuth = () => {
  const { user, setUser } = useInternalAuthContext();

  const login = (user: User) => {
    authStorage.storeUser(user);
    setUser(user);
  };
  const logout = () => {
    authStorage.removeUser();
    setUser(undefined);
  };
  return { user, login, logout };
};

export default useAuth;
