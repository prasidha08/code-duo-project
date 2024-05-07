import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import { useGetSpellsByURL } from "../api/spell";

type SpellCardProps = {
  index: string;
  handleClickOpen?: (index: string) => void;
};

export default function SpellCard({ index, handleClickOpen }: SpellCardProps) {
  const { data, isPending } = useGetSpellsByURL(index);

  if (isPending) {
    return null;
  }

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography variant="h2">{data.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {data.desc[0]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex" }}>
        <Button
          size="small"
          color="primary"
          onClick={() => handleClickOpen && handleClickOpen(index)}
        >
          Show Detail
        </Button>
      </CardActions>
    </Card>

  );
}
