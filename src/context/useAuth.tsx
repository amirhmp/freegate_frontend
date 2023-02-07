import IAuthInfo from "@models/AuthInfo";
import LocalRepo from "@services/local/LocalRepo";
import { useInternalAuthContext } from "./AuthContext"; 

const useAuth = () => {
  const { authInfo, setAuthInfo } = useInternalAuthContext();

  const login = (authInfo: IAuthInfo) => {
    LocalRepo.auth.save(authInfo);
    setAuthInfo(authInfo);
  };
  const logout = () => {
    LocalRepo.auth.remove();
    setAuthInfo(undefined);
  };
  return { authInfo, login, logout };
};

export default useAuth;
