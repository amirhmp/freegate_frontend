import Box from "@mui/material/Box";
import React from "react";

const OnlineState: React.FC<{ online?: boolean }> = ({ online }) => {
  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: 12,
        display: "inline-block",
        backgroundColor: online ? "lightgreen" : "gray",
      }}
    />
  );
};

export default OnlineState;
