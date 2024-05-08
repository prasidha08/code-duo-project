import { Chip, Divider, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import {
  useAddToFavouriteToLocalStorage,
  useGetFavouriteSpells,
  useGetSpellsByURL,
} from "../api/spell";
import {
  StyledIconButton,
  CardContainer,
  Row,
  Column,
} from "../styles/styledComponent/styled";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Spell } from "../model/spell";

type MaxWidthDialogProps = {
  spellIndexToOpenDialog: string;
  handleClose: () => void;
};

export default function SpellDetailComponent({
  spellIndexToOpenDialog,
  handleClose,
}: MaxWidthDialogProps) {
  const { data, isPending } = useGetSpellsByURL(spellIndexToOpenDialog);

  const { data: favouriteSpells, isPending: isFavouritePending } =
    useGetFavouriteSpells();

  const { mutateAsync: addToFavouriteToLocalStorage } =
    useAddToFavouriteToLocalStorage();

  const {
    name,
    desc,
    value,
    school,
    level,
    range,
    duration,
    url,
    index,
    components,
  } = data ?? {};

  const isFavouriteSpellAdded = (id: string, storedSpells: Spell[]) => {
    return storedSpells.find(({ index }) => index === id);
  };

  const addToFavourite = async (
    spell: Spell,
    previousStoredFavourite: Spell[]
  ) => {
    const favouriteSpellsToBeUpdated = isFavouriteSpellAdded(
      spell.index,
      previousStoredFavourite
    )
      ? previousStoredFavourite.filter(({ index }) => index !== spell.index)
      : [...previousStoredFavourite, spell];

    addToFavouriteToLocalStorage(favouriteSpellsToBeUpdated);
  };

  function renderFavouriteIcon(isFavAdded?: Spell) {
    if (!isFavAdded) {
      return (
        <StyledIconButton
          onClick={() =>
            addToFavourite({ index, level, name, url }, favouriteSpells ?? [])
          }
        >
          <FavoriteBorderIcon />
        </StyledIconButton>
      );
    }
    return (
      <StyledIconButton
        onClick={() =>
          addToFavourite({ index, level, name, url }, favouriteSpells ?? [])
        }
      >
        <FavoriteIcon />
      </StyledIconButton>
    );
  }

  return (
    <React.Fragment>
      <Dialog maxWidth="md" open={!!spellIndexToOpenDialog}>
        <CardContainer>
          <Row>
            <Box>
              <Typography variant="body1">Level {level}</Typography>
              <Typography color="primary" fontSize="1.5em" fontWeight="bold">
                {name}
              </Typography>
              <Typography>
                {duration} duration, {range} range
              </Typography>
            </Box>

            <Box alignSelf="flex-start">
              {renderFavouriteIcon(
                isFavouriteSpellAdded(index, favouriteSpells ?? [])
              )}
              <IconButton color="error" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Row>

          <Box marginTop={2}>
            <Typography variant="body1">Component</Typography>
            <Stack direction="row" spacing={1}>
              {components.map((component: string) => (
                <Chip label={component} key={component} size="small" />
              ))}
            </Stack>
          </Box>

          <Box display="flex" alignItems="center" gap="10px" marginTop={2}>
            <SchoolIcon color="primary" />
            <Typography fontWeight={"bold"}>{school?.name}</Typography>
          </Box>
          <Divider>
            <Typography color="primary" fontWeight="bold">
              Description
            </Typography>
          </Divider>
          <Column gap="1.4">
            {desc?.map((description: string) => (
              <Typography component={"li"}>{description}</Typography>
            ))}
          </Column>
        </CardContainer>
      </Dialog>
    </React.Fragment>
  );
}
