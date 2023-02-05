import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useContext } from "react"; 
import authStorage from "./authStorage";

interface AuthContextProvidedType {
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
}

const AuthContext = React.createContext<AuthContextProvidedType>(undefined!);

const AuthContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const _token = authStorage.getTokenFromStore();
  const [token, setToken] = useState<string | undefined>(_token);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useInternalAuthContext = () => useContext(AuthContext);
