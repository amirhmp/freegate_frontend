import React, { CSSProperties } from "react";
import "./index.css";

interface IProps {
  style?: CSSProperties | undefined;
  children: React.ReactNode;
}
const Card: React.FC<IProps> = ({ children, style }) => {
  return <div className="card" style={style}>{children}</div>;
};

export default Card;
