import useApi from "@hooks/useApi";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import RemoteRepo from "@services/remote/RemoteRepo";
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
      {/* <NestedTable data={} schema={[]} /> */}

      <Button
        className="w-24 h-12 absolute top-1 left-1"
        variant="contained"
        onClick={handleSync}
      >
        {isLoading ? <CircularProgress size={16} color="warning" /> : "Sync"}
      </Button>
    </div>
  );
};

export default AdminPage;
