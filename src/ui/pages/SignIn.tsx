import backgroundImage4 from "@assets/pics/bg4.jpg";
import AppRoutes from "@constants/appRoutes";
import useAuth from "@context/useAuth";
import useApi from "@hooks/useApi";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import RemoteRepo from "@services/remote/RemoteRepo";
import RtlMui from "@ui/components/common/RtlMui";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { request: userLogin, isLoading: isRequesting } = useApi(
    RemoteRepo.login,
    (authInfo) => {
      login(authInfo);
      toast.dismiss();
      navigate(AppRoutes.Home);
      return undefined;
    },
    (error) => {
      toast.error(
        error.code === 404
          ? "نام کاربری یا گذرواژه اشتباه میباشد"
          : error.message
      );
      return undefined;
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username");
    const password = data.get("password");
    const u = username?.toString().trim() || "";
    const p = password?.toString().trim() || "";
    if (u.length === 0 || p.length === 0)
      return toast.error("لطفا نام کاربری و رمز عبور خود را وارد کنید");

    if (p.length <= 3 || u.length <= 3)
      return toast.error("نام کاربری یا پسورد کوتاه است");

    userLogin({
      username: u,
      password: p,
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ورود به حساب کاربری
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <RtlMui style={{ width: "350px" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="نام کاربری"
                name="username"
                autoFocus
              />
            </RtlMui>
            <RtlMui style={{ width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="گذرواژه"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </RtlMui>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: 50 }}
            >
              {isRequesting && (
                <CircularProgress
                  size={20}
                  sx={{ margin: 1, color: "white" }}
                />
              )}
              {!isRequesting && "ورود"}
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${backgroundImage4})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
