import AppRoutes from "@constants/appRoutes";
import Role from "@constants/Role";
import useAuth from "@context/useAuth";
import Forbidden from "@pages/Forbidden";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC<{ roles?: Role[] }> = ({ roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate replace to={AppRoutes.Login} />;
  if (roles && !roles.includes(user.role)) return <Forbidden />;

  return <Outlet />;
};

export default PrivateRoute;
