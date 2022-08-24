import Card from "@components/common/Card";
import Role from "@constants/Role";
import useAuth from "@context/useAuth";
import { Button } from "@mui/material";
import AlertDialog from "@ui/components/common/AlertDialog";
import { useState } from "react";

const Profile = () => {
  const { logout, user } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Card
        style={{
          width: "60%",
          margin: "80px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "40px",
          borderRadius: 8,
        }}
      >
        <h1>حساب کاربری</h1>
        <h2>{user?.name}</h2>
        <h2>{user?.mobile}</h2>
        <h2>{user?.role === Role.SuperAdmin ? "مدیر سیستم" : "کاربر عادی"}</h2>
        <Button
          sx={{
            width: "30%",
            padding: 1,
          }}
          variant="outlined"
          color="error"
          onClick={() => setOpen(true)}
        >
          خروج
        </Button>
      </Card>
      <AlertDialog
        title={"خروج"}
        description={"آیا از حساب کاربری خود خارج میشوید؟"}
        action={logout}
        open={open}
        onCloseClicked={() => setOpen(false)}
      />
    </div>
  );
};

export default Profile;
