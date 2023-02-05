import Loading from "@components/common/Loading";
import Role from "@constants/Role";
import useApi from "@hooks/useApi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RemoteRepo from "@services/RemoteRepo";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./index.css";
import ExitIcon from "@mui/icons-material/ExitToApp";
import { Fab } from "@mui/material";
import useAuth from "@context/useAuth";
import Clipboard from "react-clipboard.js";

const roles = [
  { label: "مدیریت", role: Role.Admin },
  { label: "کاربر عادی", role: Role.User },
];

const HomePage = () => {
  const { logout } = useAuth();

  const {
    data: response,
    isLoading,
    request: fetchDashboard,
    error,
  } = useApi(RemoteRepo.fetchDashboard, undefined, (error) => {
    toast.error("خطا در دریافت اطلاعات از سرور");
    return error;
  });

  useEffect(() => {
    if (!response && !isLoading && !error) fetchDashboard();
  }, [error, fetchDashboard, isLoading, response]);

  if (isLoading && !response) return <Loading />;

  if (!isLoading) {
    return (
      <Box
        className="iransans"
        sx={{
          height: "100vh",
          background: "rgb(30 41 59)",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            height: "48px",
            background: "rgb(15 23 42)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 0 12px 0 rgba(0,0,0,0.2)",
            padding: "0 8px",
            fontSize: 14,
          }}
        >
          <ExitIcon sx={{ cursor: "pointer" }} onClick={logout} />

          <div>{response?.data?.name || ""}</div>
        </Box>
        <Box
          sx={{
            margin: "10px auto",
            boxShadow: "0 0 10px 0px rgba(0,0,0,0.2)",
            background: "rgb(15 23 42)",
            borderRadius: 10,
            minWidth: "300px",
            maxWidth: "450px",
            width: "95%",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 8,
          }}
        >
          {response && (
            <>
              <Box
                className="iransans"
                sx={{
                  background: "rgb(30 41 59)",
                  height: "100px",
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  color: "white",
                  textAlign: "center",
                  fontSize: 12,
                  userSelect: "none",
                }}
              >
                <div>
                  <div>حجم مانده</div>
                  <div>{`${response.data!.remainGB}GB`}</div>
                </div>
                <div>
                  <div>وضعیت حساب</div>
                  <div
                    style={{
                      color: response.data!.enable ? "greenyellow" : "tomato",
                    }}
                  >
                    {response.data!.enable ? "فعال" : "غیرفعال"}
                  </div>
                </div>
                <div>
                  <div>روز مانده</div>
                  <div>{response.data!.remainDays}</div>
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {response.data!.links.map((l, i) => (
                  <Clipboard
                    data-clipboard-text={l.link}
                    onSuccess={() => toast.success("کانفیگ کپی شد")}
                    onError={() => toast.error("خطا در کپی کردن کانفیگ")}
                    className="iransans clickable"
                    style={{
                      color: "dodgerblue",
                      border: "1px solid dodgerblue",
                      borderRadius: 8,
                      padding: 10,
                      width: "100%",
                    }}
                  >
                    {l.title}
                  </Clipboard>
                  /*<Button
                    key={l.title}
                    fullWidth={true}
                    variant="outlined"
                    onClick={() => {
                      navigator.clipboard.writeText(l.link);
                      toast.success("کانفیگ کپی شد");
                    }}
                  >
                    {l.title}
                  </Button> */
                ))}
              </Box>
            </>
          )}
          {!response && error && (
            <>
              <Button
                fullWidth={true}
                variant="outlined"
                onClick={fetchDashboard}
              >
                تلاش مجدد
              </Button>
            </>
          )}
        </Box>
      </Box>
    );
  }

  if (!isLoading && error) {
  }

  return null;
};

export default HomePage;
