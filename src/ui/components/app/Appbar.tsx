import ExitIcon from "@mui/icons-material/ExitToApp";

interface IProps {
  username: string;
  onLogoutClicked: () => void;
}
const Appbar = ({ username, onLogoutClicked }: IProps) => {
  return (
    <div className="text-white h-12 bg-slate-900 flex justify-between items-center shadow-lg p-2 text-sm">
      <ExitIcon sx={{ cursor: "pointer" }} onClick={onLogoutClicked} />
      <div>{username}</div>
    </div>
  );
};

export default Appbar;
