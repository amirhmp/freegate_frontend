import AppRoutes from "@constants/appRoutes";
import Role from "@constants/Role";
import useAuth from "@context/useAuth";
import Forbidden from "@ui/pages/Forbidden";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC<{ roles?: Role[] }> = ({
  roles = [Role.Admin, Role.User],
}) => {
  const { authInfo } = useAuth();
  if (!authInfo) return <Navigate replace to={AppRoutes.Login} />;
  if (!roles?.includes(authInfo.roleId)) return <Forbidden />;

  return <Outlet />;
};

export default PrivateRoute;
