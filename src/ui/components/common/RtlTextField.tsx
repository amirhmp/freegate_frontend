import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import RtlMui from "./RtlMui";

const RtlTextField = () => {
  const [value, setValue] = useState();

  React.useLayoutEffect(() => {
    document.body.setAttribute("dir", "rtl");
  }, []);

  return (
    <RtlMui>
      <TextField
        value={value}
        onChange={(event: any) => setValue(event.target.value)}
        label={"Email"}
      />
    </RtlMui>
  );
};

export default RtlTextField;
