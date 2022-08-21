import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useContext } from "react";
import User from "../models/User";
import authStorage from "./authStorage";

interface AuthContextProvidedType {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

const AuthContext = React.createContext<AuthContextProvidedType>(undefined!);

const AuthContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const _user = authStorage.getUserFromStore();
  const [user, setUser] = useState<User | undefined>(_user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useInternalAuthContext = () => useContext(AuthContext);
