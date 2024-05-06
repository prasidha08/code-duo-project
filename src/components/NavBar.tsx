import React from "react";
import codeIcon from "../assets/images/codeDuo.png";
import { Box } from "@mui/material";
import theme from "../styles/theme";

function NavBar() {
  return (
    <Box position="sticky" sx={{ backgroundColor: "rgb(133, 179, 219)" }}>
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
