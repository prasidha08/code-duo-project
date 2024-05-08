import React from "react";
import { Grid } from "../styles/styledComponent/styled";
import { Box, Skeleton } from "@mui/material";

export default function SkeletonCard() {
  return (
    <Grid>
      {Array.from(new Array(4)).map((index) => (
        <CustomSkeletion key={index} />
      ))}
    </Grid>
  );
}

export function CustomSkeletion() {
  return (
    <Box padding={3} sx={{ backgroundColor: "whitesmoke", height: 300 }}>
      <Box>
        <Skeleton animation="wave" width={150} height={50} key="title" />
        <Skeleton
          height={200}
          animation="wave"
          variant="rectangular"
          key="descripition"
        />
        <Skeleton animation="wave" width={150} height={50} key="button" />
      </Box>
    </Box>
  );
}
