import Button from "@mui/material/Button";
import { Slide, toast, ToastOptions } from "react-toastify";
import "./snack.css";

export interface ISnackProps {
  id: number;
  message: string;
  action?: () => void;
  actionText?: string;
  messageColor?: string;
  actionColor?: string;
}

const Snack: React.FC<ISnackProps> = ({
  id,
  message,
  action: onPress,
  actionText = "تلاش مجدد",
  actionColor = "dodgerblue",
  messageColor = "white",
}) => {
  const handleAction = () => {
    toast.dismiss(id);
    onPress!();
  };

  return (
    <div className="snack-wrapper">
      {onPress && (
        <div className="snack-btn-wrapper">
          <Button
            sx={{
              flex: 1,
              minWidth: 100,
              fontSize: 11,
              marginRight: 0.5,
              color: actionColor,
            }}
            variant="text"
            onClick={handleAction}
          >
            {actionText}
          </Button>
        </div>
      )}
      <div className="snack-message-wrapper">
        <p
          className="snack-message"
          style={{
            color: messageColor,
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

const toastOptions: ToastOptions = {
  position: "bottom-left",
  autoClose: 60000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  transition: Slide,
  rtl: false,
  closeButton: false,
};

const toastIDs: any[] = [];

function snack(
  message: string,
  action?: ISnackProps["action"],
  actionText?: ISnackProps["actionText"],
  styles?: Omit<ISnackProps, "id" | "message" | "action" | "actionText">,
  duration?: number
): void {
  if (toastIDs.length >= 3) {
    toast.dismiss(toastIDs.shift());
  }
  toastIDs.push(
    toast(
      <Snack
        message={message}
        id={toastIDs.length}
        action={action}
        actionText={actionText}
        {...styles}
      />,
      duration ? { ...toastOptions, autoClose: duration } : toastOptions
    )
  );
}

export default snack;
