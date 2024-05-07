import { Typography } from "@mui/material";
import codeIcon from "../assets/images/codeDuo.png";
import { ImageLogoWrapper, Nav } from "../styles/styledComponent/styled";

function NavBar() {
  return (
    <Nav>
      <ImageLogoWrapper>
        <img src={codeIcon} alt="image" height={50} />
        <Typography variant="h1">Code Duo</Typography>
      </ImageLogoWrapper>
    </Nav>
  );
}

export default NavBar;
