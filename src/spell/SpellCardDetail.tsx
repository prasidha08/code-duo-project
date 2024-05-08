import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { Chip, Divider, Stack, Typography } from "@mui/material";
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
  SchoolText,
} from "../styles/styledComponent/styled";
import { Spell } from "../model/spell";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

type MaxWidthDialogProps = {
  spellIndexToOpenDialog: string;
  handleClose: () => void;
};

export default function SpellDetailComponent({
  spellIndexToOpenDialog,
  handleClose,
}: MaxWidthDialogProps) {
  const { data } = useGetSpellsByURL(spellIndexToOpenDialog);

  const { data: favouriteSpells, isPending: isFavouritePending } =
    useGetFavouriteSpells();

  const { mutateAsync: addToFavouriteToLocalStorage } =
    useAddToFavouriteToLocalStorage();

  const { name, desc, school, level, range, duration, url, index, components } =
    data ?? {};

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
              <Typography color="primary" variant="h1">
                {name}
              </Typography>

              <Typography variant="body1">
                {duration} duration, {range} range
              </Typography>

              <Typography variant="body2">Level {level}</Typography>
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

          <SchoolText>
            <SchoolIcon color="primary" />

            <Typography fontWeight={"bold"}>{school?.name}</Typography>
          </SchoolText>

          <Divider>
            <Typography color="primary" variant="h2">
              Description
            </Typography>
          </Divider>

          <Column gap="1.4em">
            {desc?.map((description: string) => (
              <Typography component={"li"}>{description}</Typography>
            ))}
          </Column>
        </CardContainer>
      </Dialog>
    </React.Fragment>
  );
}
