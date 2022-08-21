import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

interface IProps {
  title: string;
  description: string;
  action: () => void;
  onCloseClicked: () => void;
  open: boolean;
}
export default function AlertDialog({
  title,
  description,
  action,
  open,
  onCloseClicked,
}: IProps) {
  return (
    <Dialog
      open={open}
      onClose={onCloseClicked}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          textAlign: "right",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={action} autoFocus>
          بله
        </Button>
        <Button onClick={onCloseClicked}>خیر</Button>
      </DialogActions>
    </Dialog>
  );
}
