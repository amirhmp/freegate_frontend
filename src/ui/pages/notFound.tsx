import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="p-2 bg-slate-900 h-full">
      <h1>404 not found</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFound;
