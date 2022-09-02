import Loading from "@components/common/Loading";
import NestedTable, { TableSchema } from "@components/common/NestedTable";
import Role from "@constants/Role";
import CreateUserRequest from "@DTOs/api/CreateUserRequest";
import useApi from "@hooks/useApi";
import GetAllUsersResponse from "@models/GetAllUsersResponse";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import RemoteRepo from "@services/RemoteRepo";
import FloatLabelTextField from "@ui/components/common/FloatLabelTextField";
import OnlineState from "@ui/components/common/OnlineState";
import RtlMui from "@ui/components/common/RtlMui";
import snack from "@ui/components/common/Snack";
import { ArrayElement } from "@utils/utils";
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
    setData: setUsers,
  } = useApi(RemoteRepo.getAllUsers, undefined, (error) => {
    snack(error.message, fetchUsers);
    return undefined;
  });

  const { request: deleteUser } = useApi(
    RemoteRepo.deleteUser,
    (response) => {
      const foundIndex = users!.findIndex((u) => u.id === response.id);
      users!.splice(foundIndex, 1);
      setUsers([...users!]);
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
      setUsers([
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

  const { isLoading: updateUserRequestLoading, request: updateUser } = useApi(
    RemoteRepo.updateUser,
    (response) => {
      if (response) {
        setOpen(false);
        userToUpdate.current = undefined;
        const _users = [...users!];
        const foundIndex = _users.findIndex((u) => u.id === response.id);
        _users[foundIndex] = response;
        setUsers(_users);
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

  const { request: disableUser } = useApi(
    RemoteRepo.disableUser,
    undefined,
    (error, id, isDisable) => {
      disableUserInUI(id, !isDisable);
      snack(error.message, () => handleUserDisable(id, isDisable));
      return undefined;
    }
  );

  const { data: onlineIDs, request: fetchOnlineUsers } = useApi(
    RemoteRepo.fetchOnlineUsers
  );

  useEffect(() => {
    if (!users) fetchUsers();
    if (!centers) fetchCenters();
    fetchOnlineUsers();
    const handler = setInterval(() => {
      fetchOnlineUsers();
    }, 60000);
    return () => {
      clearInterval(handler);
    };
  }, []);

  const disableUserInUI = (userID: number, isDisable: boolean) => {
    const _users = [...users!];
    const _user = _users.find((u) => u.id === userID);
    console.log(_user);
    _user!.isEnable = !isDisable;
    setUsers(_users);
  };

  const handleUserDisable = (userID: number, isDisable: boolean) => {
    disableUserInUI(userID, isDisable);
    disableUser(userID, isDisable);
  };

  const handleClose = () => {
    userToUpdate.current = undefined;
    setUser({} as CreateUserRequest);
    setOpen(false);
  };

  const handleOnCentersComboClicked = () => {
    if (!centers || centers.length === 0) fetchCenters();
  };

  const handleSubmit = () => {
    toast.dismiss();
    //validate
    if (!user.name || user.name.length < 4)
      return snack("نام کاربری کوتاه میباشد");
    if (!user.mobile || user.mobile.length !== 11)
      return snack("تلفن همراه صحیح نمیباشد");
    if (!user.password || user.password.length < 4)
      return snack("گذرواژه کوتاه میباشد");
    if (!user.roleID) return snack("سمت را مشخص کنید");
    if (user.roleID === Role.User) {
      if (!user.centerID) return snack("مرکز را مشخص کنید");
    } else {
      user.centerID = 0;
    }

    //
    if (userToUpdate.current) updateUser(userToUpdate.current, user);
    else createUser(user);
  };

  const schema: TableSchema = [
    {
      label: "نام کاربر",
      extractor: (user: ArrayElement<GetAllUsersResponse>) => (
        <Button
          onClick={() => {
            setUser({
              centerID: user.centerID,
              mobile: user.mobile,
              name: user.name,
              roleID: user.role,
              password: user.password,
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
      extractor: (user: ArrayElement<GetAllUsersResponse>) => user.mobile,
    },
    {
      label: "مرکز",
      extractor: (user: ArrayElement<GetAllUsersResponse>) => user.centerName,
    },
    {
      label: "سمت",
      extractor: (user: ArrayElement<GetAllUsersResponse>) => {
        const { role } = user;
        if (role === Role.SuperAdmin) return "مدیر سیستم";
        if (role === Role.Admin) return "مدیریت";
        if (role === Role.User) return "کاربر عادی";
        return "نامشخص";
      },
    },
    {
      label: "",
      extractor: (user: ArrayElement<GetAllUsersResponse>) => (
        <Button
          color="error"
          onClick={() =>
            snack(
              `کاربر "${user.name}" حذف میشود. ادامه میدهید؟`,
              () => deleteUser(user.id),
              "حذف کاربر",
              {
                actionColor: "tomato",
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
    {
      label: "فعال بودن",
      extractor: (user: ArrayElement<GetAllUsersResponse>) => {
        return (
          <Switch
            checked={user.isEnable}
            onChange={(_, enabled) => {
              handleUserDisable(user.id, !enabled);
            }}
          />
        );
      },
    },
    {
      label: "آنلاین بودن",
      extractor: (user: ArrayElement<GetAllUsersResponse>) => {
        return <OnlineState online={onlineIDs?.includes(user.id)} />;
      },
    },
  ];

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
              width: "70%",
              maxWidth: "450px",
              minWidth: "300px",
              transform: "translate(-50%, -50%)",
              height: "600px",
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
              <Box sx={{ position: "relative" }}>
                <RtlMui>
                  <Autocomplete
                    disabled={!(user.roleID && user.roleID === Role.User)}
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
