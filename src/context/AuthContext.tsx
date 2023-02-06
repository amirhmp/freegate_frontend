import IAuthInfo from "@models/AuthInfo";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useContext } from "react";
import authStorage from "./authStorage";

interface AuthContextProvidedType {
  authInfo: IAuthInfo | undefined;
  setAuthInfo: Dispatch<SetStateAction<IAuthInfo | undefined>>;
}

const AuthContext = React.createContext<AuthContextProvidedType>(undefined!);

const AuthContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const _authInfo = authStorage.getTokenFromStore();
  const [authInfo, setAuthInfo] = useState<IAuthInfo | undefined>(_authInfo);
  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useInternalAuthContext = () => useContext(AuthContext);
