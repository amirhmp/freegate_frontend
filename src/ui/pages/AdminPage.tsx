import useAuth from "@context/useAuth";
import useApi from "@hooks/useApi";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import RemoteRepo from "@services/remote/RemoteRepo";
import Appbar from "@ui/components/app/Appbar";
import React from "react";
import { toast } from "react-toastify";

const AdminPage = () => {
  const { logout } = useAuth();

  const { isLoading, request: sync } = useApi(
    RemoteRepo.sync,
    ({ message }) => {
      toast.info(message);
      return undefined;
    },
    (error) => {
      toast.error(error.message);
      return undefined;
    }
  );

  const handleSync = React.useCallback(() => {
    if (!isLoading) sync();
  }, [isLoading, sync]);

  return (
    <div className="h-screen bg-slate-800">
      {/* <NestedTable data={} schema={[]} /> */}
      <Appbar username="" onLogoutClicked={logout} />
      <div className="p-2">
        <Button variant="contained" onClick={handleSync} className="w-24 h-12">
          {isLoading ? <CircularProgress size={16} color="warning" /> : "Sync"}
        </Button>
      </div>
    </div>
  );
};

export default AdminPage;
