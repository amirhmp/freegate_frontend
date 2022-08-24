import PrivateRoute from "@components/common/PrivateRoute";
import AppRoutes from "@constants/appRoutes";
import Role from "@constants/Role";
import useAuth from "@context/useAuth";
import Forbidden from "@pages/Forbidden";
import HomePage from "@pages/HomePage";
import NotFound from "@pages/notFound";
import Profile from "@pages/Profile";
import SignIn from "@pages/SignIn";
import { ApiClientConfig } from "@services/apiclient/ApiClient";
import AdminAppBar from "@ui/components/AdminAppbar";
import snack from "@ui/components/common/Snack";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

const App = () => {
  const { user, logout } = useAuth();

  if (user) {
    ApiClientConfig.setClientToken(user.token);
    ApiClientConfig.setOnUnAuthorized(() => {
      snack(
        "فرد دیگری با حساب کاربری شما وارد شده است. شما نیاز به ورود مجدد دارید."
      );
      ApiClientConfig.setClientToken(user.token);
      logout();
    });
  } else {
    ApiClientConfig.setClientToken(undefined);
    ApiClientConfig.setOnUnAuthorized(undefined);
  }

  return (
    <>
      <div>
        {user && <AdminAppBar />}
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={AppRoutes.Profile} element={<Profile />} />
          </Route>
          <Route element={<PrivateRoute roles={[Role.SuperAdmin]} />}>
            <Route path={AppRoutes.Home} element={<HomePage />} />
          </Route>
          <Route path={AppRoutes.NotFound} element={<NotFound />} />
          <Route path={AppRoutes.Forbidden} element={<Forbidden />} />
          <Route
            path={AppRoutes.Login}
            element={user ? <Navigate to={AppRoutes.Profile} /> : <SignIn />}
          />
          <Route path="/" element={<Navigate replace to={AppRoutes.Home} />} />
          <Route
            path="*"
            element={<Navigate replace to={AppRoutes.NotFound} />}
          />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
