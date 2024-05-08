import * as React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import { whitesmoke } from "../styles/theme";
type ScrollableTabsButtonForceProps = {
  value: string;
  handleChange: (_: React.SyntheticEvent, newValue: number) => void;
};

export const alphateIndex = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function ScrollableTabs({
  value,
  handleChange,
}: ScrollableTabsButtonForceProps) {
  const [tabIndex, setTabIndex] = React.useState<number>(0);

  React.useEffect(() => {
    setTabIndex(alphateIndex.findIndex((tab) => tab === value));
  }, [value]);

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable tabs"
        sx={{
          backgroundColor: whitesmoke,
        }}
      >
        {alphateIndex.map((item) => {
          return <Tab label={item} key={item} />;
        })}
      </Tabs>
    </Box>
  );
}
