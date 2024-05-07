import { Typography } from "@mui/material";
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

  const { name, desc, value, school, level, range, duration, url, index } =
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
  return (
    <React.Fragment>
      <Dialog maxWidth="md" open={!!spellIndexToOpenDialog}>
        <CardContainer>
          <Row>
            <Box>
              <Typography color="primary" fontSize="1.5em" fontWeight="bold">
                {name}
              </Typography>
              <Typography>
                {duration} duration, {range} range
              </Typography>
            </Box>

            <Box alignSelf="flex-start">
              {!isFavouriteSpellAdded(index, favouriteSpells ?? []) ? (
                <StyledIconButton
                  onClick={() =>
                    addToFavourite(
                      { index, level, name, url },
                      favouriteSpells ?? []
                    )
                  }
                >
                  <FavoriteBorderIcon />
                </StyledIconButton>
              ) : (
                <StyledIconButton
                  onClick={() =>
                    addToFavourite(
                      { index, level, name, url },
                      favouriteSpells ?? []
                    )
                  }
                >
                  <FavoriteIcon />
                </StyledIconButton>
              )}
              <IconButton color="error" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Row>

          <Box display={"flex"} alignItems={"center"} gap="10px">
            <SchoolIcon color="primary" />
            <Typography fontWeight={"bold"}>{school?.name}</Typography>
          </Box>
          <Box>
            <hr />
          </Box>
          <Typography color="primary" fontWeight="bold">
            Description
          </Typography>
          <Box display="flex" flexDirection="column" gap="20px">
            {desc?.map((description: string) => (
              <li>{description}</li>
            ))}
          </Box>
        </CardContainer>
      </Dialog>
    </React.Fragment>
  );
}
