import PrivateRoute from "@components/common/PrivateRoute";
import AppRoutes from "@constants/appRoutes";
import Role from "@constants/Role";
import useAuth from "@context/useAuth";
import Forbidden from "@pages/Forbidden";
import HomePage from "@pages/HomePage";
import NotFound from "@pages/notFound";
import SignIn from "@pages/SignIn";
import { ApiClientConfig } from "@services/remote/apiclient/ApiClient";
import AdminPage from "@ui/pages/AdminPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";

const App = () => {
  const { authInfo, logout } = useAuth();

  if (authInfo) {
    ApiClientConfig.setClientToken(authInfo.token);
    ApiClientConfig.setOnUnAuthorized(() => {
      toast.dismiss();
      toast.error(
        "فرد دیگری با حساب کاربری شما وارد شده است. شما نیاز به ورود مجدد دارید."
      );
      ApiClientConfig.setClientToken(authInfo.token);
      logout();
    });
  } else {
    ApiClientConfig.setClientToken(undefined);
    ApiClientConfig.setOnUnAuthorized(undefined);
  }

  return (
    <>
      <div>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={AppRoutes.Home} element={<HomePage />} />
          </Route>
          <Route element={<PrivateRoute roles={[Role.Admin]} />}>
            <Route path={AppRoutes.Admin} element={<AdminPage />} />
          </Route>
          <Route path={AppRoutes.NotFound} element={<NotFound />} />
          <Route path={AppRoutes.Forbidden} element={<Forbidden />} />
          <Route
            path={AppRoutes.Login}
            element={authInfo ? <Navigate to={AppRoutes.Home} /> : <SignIn />}
          />
          <Route path="/" element={<Navigate replace to={AppRoutes.Home} />} />
          <Route
            path="*"
            element={<Navigate replace to={AppRoutes.NotFound} />}
          />
        </Routes>
      </div>
      <ToastContainer
        closeOnClick
        pauseOnFocusLoss={false}
        toastStyle={{
          backgroundColor: "rgb(24 24 27)",
          color: "white",
          fontFamily: "iransans",
          textAlign: "right",
          fontSize: 12,
        }}
      />
    </>
  );
};

export default App;
