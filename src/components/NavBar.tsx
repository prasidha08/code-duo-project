import React from "react";
import codeIcon from "../assets/images/codeDuo.png";
import { Box } from "@mui/material";

function NavBar() {
  return (
    <Box position={"fixed"} width="100%" sx={{ backgroundColor: "rgb(133, 179, 219)" }} zIndex={1}>
      <Box
        color={"whitesmoke"}
        display="flex"
        alignItems="center"
        width="96%"
        margin="auto"
      >
        <img src={codeIcon} alt="image" height={50} />
        <h3>Code Duo</h3>
      </Box>
    </Box>
  );
}

export default NavBar;
