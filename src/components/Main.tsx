import { useState } from "react";
import SpellLists from "../spell/SpellLists";
import { Box, Divider, Typography } from "@mui/material";
import ScrollableTabs, { alphateIndex } from "./Tabs";
import { Column } from "../styles/styledComponent/styled";

export default function Main() {
  const [value, setValue] = useState("A");

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(alphateIndex[newValue]);
  };

  return (
    <Column width="80%" margin="auto" gap="3" padding="8">
      <Divider>
        <Typography variant="h1">Spell Card</Typography>
      </Divider>

      <ScrollableTabs value={value} handleChange={handleChange} />

      <SpellLists value={value} />
    </Column>
  );
}
