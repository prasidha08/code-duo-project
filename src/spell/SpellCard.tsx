import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useGetSpellsByURL } from "../api/spell";
import { CardWrapper } from "../styles/styledComponent/styled";

type SpellCardProps = {
  index: string;
  handleClickOpen: (index: string) => void;
};

export default function SpellCard({ index, handleClickOpen }: SpellCardProps) {
  const { data, isPending } = useGetSpellsByURL(index);

  if (isPending) {
    return null;
  }

  return (
    <CardWrapper
      sx={{
        ":hover": {
          boxShadow: "-17px 12px 15px -3px rgb(133, 179, 219)",
          transition: " 0.3s ease-in-out",
        },
      }}
    >
      <Typography variant="h2">{data.name}</Typography>

      <Box minHeight="160px">
        <Typography variant="subtitle1">
          {data.desc[0].substring(0, 200)}...
        </Typography>
      </Box>

      <Box>
        <Button size="small" onClick={() => handleClickOpen(index)}>
          <Typography variant="h3">Show Detail</Typography>
        </Button>
      </Box>
    </CardWrapper>
    // </Grid>
  );
}
