import Button from "@mui/material/Button";
import { Slide, toast, ToastOptions } from "react-toastify";

export interface ISnackProps {
  id: number;
  message: string;
  color?: string;
  action?: {
    title?: string;
    onPress: () => void;
    color?: string;
  };
}

const Snack: React.FC<ISnackProps> = ({
  message,
  action,
  color = "whitesmoke",
  id,
}) => {
  const handleAction = () => {
    toast.dismiss(id);
    action!.onPress();
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: 60,
        backgroundColor: "black",
        alignItems: "stretch",
        flexDirection: "row",
        justifyContent: "space-between",
        display: "flex",
        boxShadow: "0 0 20px 0 #00000033",
        borderRadius: 4,
        padding: 8,
      }}
    >
      {action && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            sx={{
              flex: 1,
              minWidth: 100,
              fontSize: 12,
              marginRight: 0.5,
              color: action.color,
            }}
            variant="text"
            onClick={handleAction}
          >
            {action.title || "تلاش مجدد"}
          </Button>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: "iransans",
            textAlign: "right",
            fontSize: 13,
            margin: 0,
            color,
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

function snack(message: string, props?: Omit<ISnackProps, "id" | "message">): void {
  if (toastIDs.length >= 3) {
    toast.dismiss(toastIDs.shift());
  }
  toastIDs.push(
    toast(
      <Snack message={message} id={toastIDs.length} {...props} />,
      toastOptions
    )
  );
}

export default snack;
