import AppRoutes from "@constants/appRoutes";
import Role from "@constants/Role";
import useAuth from "@context/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC<{ roles?: Role[] }> = ({ roles }) => {
  const { token } = useAuth();
  if (!token) return <Navigate replace to={AppRoutes.Login} />;

  return <Outlet />;
};

export default PrivateRoute;
