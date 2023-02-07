import IAuthInfo from "@models/AuthInfo";
import LocalRepo from "@services/local/LocalRepo";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useContext } from "react";

interface AuthContextProvidedType {
  authInfo: IAuthInfo | undefined;
  setAuthInfo: Dispatch<SetStateAction<IAuthInfo | undefined>>;
}

const AuthContext = React.createContext<AuthContextProvidedType>(undefined!);

const AuthContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const _authInfo = LocalRepo.auth.load();
  const [authInfo, setAuthInfo] = useState<IAuthInfo | undefined>(_authInfo);
  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useInternalAuthContext = () => useContext(AuthContext);
