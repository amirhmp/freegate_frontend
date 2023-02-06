import IAuthInfo from "@models/AuthInfo";
import { useInternalAuthContext } from "./AuthContext";
import authStorage from "./authStorage";

const useAuth = () => {
  const { authInfo, setAuthInfo } = useInternalAuthContext();

  const login = (authInfo: IAuthInfo) => {
    authStorage.storeToken(authInfo);
    setAuthInfo(authInfo);
  };
  const logout = () => {
    authStorage.removeUser();
    setAuthInfo(undefined);
  };
  return { authInfo, login, logout };
};

export default useAuth;
