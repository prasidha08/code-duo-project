import { Box, Button } from "@mui/material";
import { useGetSpellsByURL } from "../api/spell";
import Typography from "@mui/material/Typography";
import theme, { whitesmoke } from "../styles/theme";
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
      <Typography variant="h1">{data.name}</Typography>

      <Box minHeight="160px">
        <Typography variant="subtitle1">
          {data.desc[0].substring(0, 200)}...
        </Typography>
      </Box>

      <Box>
        <Button
          size="small"
          sx={{ fontWeight: "bold", fontSize: "12px", letterSpacing: 1 }}
          onClick={() => handleClickOpen(index)}
        >
          Show Detail
        </Button>
      </Box>
    </CardWrapper>
    // </Grid>
  );
}
