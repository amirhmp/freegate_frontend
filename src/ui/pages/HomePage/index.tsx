import Loading from "@components/common/Loading";
import NestedTable, { TableSchema } from "@components/common/NestedTable";
import Role from "@constants/Role";
import CreateUserRequest from "@DTOs/api/CreateUserRequest";
import useApi from "@hooks/useApi";
import User from "@models/User";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import RemoteRepo from "@services/RemoteRepo";
import FloatLabelTextField from "@ui/components/common/FloatLabelTextField";
import RtlMui from "@ui/components/common/RtlMui";
import snack from "@ui/components/common/Snack";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./index.css";

const roles = [
  { label: "مدیریت", role: Role.Admin },
  { label: "کاربر عادی", role: Role.User },
  { label: "مدیر سیستم", role: Role.SuperAdmin },
];

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<CreateUserRequest>({} as CreateUserRequest);

  const userToUpdate = useRef<number | undefined>(undefined);

  const {
    data: users,
    isLoading,
    request: fetchUsers,
    setData,
  } = useApi(RemoteRepo.getAllUsers, undefined, (error) => {
    snack(error.message, fetchUsers);
    return undefined;
  });

  const { request: deleteUser } = useApi(
    RemoteRepo.deleteUser,
    (response) => {
      const foundIndex = users!.findIndex((u) => u.id === response.id);
      users!.splice(foundIndex, 1);
      setData([...users!]);
      return undefined;
    },
    (error, id) => {
      snack(error.message, () => deleteUser(id));
      return undefined;
    }
  );

  const { isLoading: newUserRequestLoading, request: createUser } = useApi(
    RemoteRepo.createUser,
    (response) => {
      setOpen(false);
      setData([
        ...users!,
        {
          ...response,
        },
      ]);
      setUser({} as CreateUserRequest);
      return undefined;
    },
    (error) => {
      snack(error.message, handleSubmit);
      return undefined;
    }
  );

  const { 
    isLoading: updateUserRequestLoading,
    request: updateUser,
  } = useApi(
    RemoteRepo.updateUser,
    (response) => {
      if (response) {
        setOpen(false);
        userToUpdate.current = undefined;
        const _users = [...users!];
        const foundIndex = _users.findIndex((u) => u.id === response.id);
        _users[foundIndex] = response;
        setData(_users);
        setUser({} as CreateUserRequest);
      }
      return undefined;
    },
    (error) => {
      snack(error.message, handleSubmit);
      return undefined;
    }
  );

  const {
    data: centers,
    isLoading: fetchCentersLoading,
    request: fetchCenters,
  } = useApi(RemoteRepo.fetchCenters, undefined, (error) => {
    snack("خطا در دریافت مراکز از سرور", fetchCenters);
    return undefined;
  });

  useEffect(() => {
    fetchUsers();
    fetchCenters();
  }, []);

  const schema: TableSchema = [
    {
      label: "نام کاربر",
      extractor: (user: User) => (
        <Button
          onClick={() => {
            setUser({
              centerID: user.centerID,
              mobile: user.mobile,
              name: user.name,
              roleID: user.role,
              password: "",
            });
            userToUpdate.current = user.id;
            setOpen(true);
          }}
        >
          {user.name}
        </Button>
      ),
      style: {
        fontWeight: "bold",
      },
    },
    {
      label: "شماره تلفن",
      extractor: (user: User) => user.mobile,
    },
    {
      label: "مرکز",
      extractor: (user: User) => user.centerName,
    },
    {
      label: "سمت",
      extractor: (user: User) => {
        const { role } = user;
        if (role === Role.SuperAdmin) return "مدیر سیستم";
        if (role === Role.Admin) return "مدیریت";
        if (role === Role.User) return "کاربر عادی";
        return "نامشخص";
      },
    },
    {
      label: "",
      extractor: (user: User) => (
        <Button
          color="error"
          onClick={() =>
            snack(
              "کاربر حذف میشود. ادامه میدهید؟",
              () => deleteUser(user.id),
              "حذف کاربر",
              {
                actionColor: "red",
                messageColor: "tomato",
              },
              10000
            )
          }
        >
          حذف
        </Button>
      ),
    },
  ];

  const handleClose = () => {
    userToUpdate.current = undefined;
    setUser({} as CreateUserRequest);
    setOpen(false);
  };

  const handleOnCentersComboClicked = () => {
    if (!centers) fetchCenters();
  };

  const validateRequest = () => {
    if (!user.name || user.name.length < 4)
      return snack("نام کاربری کوتاه میباشد");
    if (!user.mobile || user.mobile.length !== 11)
      return snack("تلفن همراه صحیح نمیباشد");
    if (!user.password || user.password.length < 4)
      return snack("گذرواژه کوتاه میباشد");
    if (!user.centerID) return snack("مرکز را مشخص کنید");
    if (!user.roleID) return snack("سمت را مشخص کنید");
  };

  const handleSubmit = () => {
    toast.dismiss();
    validateRequest();
    if (userToUpdate.current) updateUser(userToUpdate.current, user);
    else createUser(user);
  };

  if (isLoading && !users) return <Loading />;
  if (!isLoading && users) {
    return (
      <>
        <div className="container">
          <Box
            sx={{
              padding: 1,
            }}
          >
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => {
                setOpen(true);
              }}
            >
              <AddIcon />
            </Fab>
          </Box>
          <NestedTable
            reverse
            className="my-table"
            data={users}
            schema={schema}
          />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: `30%`,
              height: "600px",
              minWidth: "200px",
              bgcolor: "white",
              borderRadius: 4,
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ textAlign: "right" }}>
              ایجاد کاربر
            </Typography>
            <Box
              sx={{
                mt: 2,
                mb: 2,
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <FloatLabelTextField
                value={user.name}
                label="نام کاربر"
                onChange={(name) => setUser({ ...user, name })}
              />
              <FloatLabelTextField
                value={user.mobile}
                label="تلفن همراه"
                onChange={(mobile) => setUser({ ...user, mobile })}
              />
              <FloatLabelTextField
                value={user.password}
                label="گذرواژه"
                onChange={(password) => setUser({ ...user, password })}
              />
              <Box sx={{ position: "relative" }}>
                <RtlMui>
                  <Autocomplete
                    onFocus={handleOnCentersComboClicked}
                    value={centers?.find((c) => c.id === user.centerID) || null}
                    onChange={(event, value) =>
                      value && setUser({ ...user, centerID: value.id })
                    }
                    disablePortal
                    options={centers || []}
                    sx={{ minWidth: 200 }}
                    getOptionLabel={(center) => center.name}
                    renderInput={(params) => (
                      <TextField {...params} label="مرکز" />
                    )}
                  />
                </RtlMui>
                {fetchCentersLoading && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      margin: `0 50px`,
                      top: "50%",
                      transform: `translateY(-50%)`,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={20} />
                  </Box>
                )}
              </Box>
              <RtlMui>
                <Autocomplete
                  value={roles[user.roleID - 1] || null}
                  onChange={(event, value) =>
                    value && setUser({ ...user, roleID: value.role })
                  }
                  disablePortal
                  options={roles}
                  sx={{ minWidth: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="سمت" />
                  )}
                />
              </RtlMui>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <Button onClick={handleSubmit}>
                {!(newUserRequestLoading || updateUserRequestLoading) && (
                  <>تایید</>
                )}
                {(newUserRequestLoading || updateUserRequestLoading) && (
                  <CircularProgress size="20px" />
                )}
              </Button>
              <Button onClick={handleClose}>لغو</Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }
  return null;
};

export default HomePage;
