import useApi from "@hooks/useApi";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import RemoteRepo from "@services/RemoteRepo";
import React from "react";
import { toast } from "react-toastify";

const AdminPage = () => {
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
    <div className="h-screen bg-slate-900 p-2">
      <Button className="w-24 h-12" variant="contained" onClick={handleSync}>
        {!isLoading ? "Sync" : <CircularProgress size={16} color="warning" />}
      </Button>
    </div>
  );
};

export default AdminPage;
