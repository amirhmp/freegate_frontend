import Loading from "@components/common/Loading";
import NestedTable, { TableSchema } from "@components/common/NestedTable";
import snack from "@components/common/Snack";
import Role from "@constants/Role";
import useApi from "@hooks/useApi";
import RemoteRepo from "@services/RemoteRepo";
import { useEffect } from "react";
import "./index.css";

const schema: TableSchema = [
  {
    label: "نام کاربر",
    extractor: (user) => user.name,
    style: { 
      fontWeight: "bold",
    },
  },
  {
    label: "شماره تلفن",
    extractor: (user) => user.mobile,
  },
  {
    label: "مرکز",
    extractor: (user) => user.center.name,
  },
  {
    label: "سمت",
    extractor: (user) => {
      const { role } = user;
      if (role === Role.SuperAdmin) return "مدیر سیستم";
      if (role === Role.Admin) return "مدیریت";
      if (role === Role.User) return "کاربر عادی";
      return "نامشخص";
    },
  },
];

const HomePage = () => {
  const {
    data,
    error,
    isLoading,
    request: getUsers,
  } = useApi(RemoteRepo.getAllUsers);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (error)
      snack(error!.message, {
        action: {
          onPress: () => {
            console.log("try again");
          },
        },
      });
  }, [error]);

  if (isLoading) return <Loading />;
  if (!isLoading && data) {
    return (
      <div>
        <NestedTable reverse className="my-table" data={data} schema={schema} />
      </div>
    );
  }
  return null;
};

export default HomePage;
