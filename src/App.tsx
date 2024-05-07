import { Box, Typography } from "@mui/material";
import "./App.css";
import NavBar from "./components/NavBar";
import ScrollableTabs, { alphateIndex } from "./components/Tabs";
import SpellLists from "./spell/SpellLists";
import { useState } from "react";

function App() {
  return (
    <>
      <NavBar />
      <Main />
    </>
  );
}
export default App;

function Main() {
  const [value, setValue] = useState("A");

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(alphateIndex[newValue]);
  };

  return (
    <Box
      width="80%"
      margin="auto"
      display="flex"
      flexDirection="column"
      gap={6}
      padding={10}
    >
      <Typography variant="h1">Spell Card</Typography>
      <ScrollableTabs value={value} handleChange={handleChange} />
      <SpellLists value={value} />
    </Box>
  );
}
