import SpellCard from "./SpellCard";
import { Spell } from "../model/spell";
import React, { useEffect, useState } from "react";
import { Divider, Typography } from "@mui/material";
import SpellDetailComponent from "./SpellCardDetail";
import { Grid } from "../styles/styledComponent/styled";
import { useGetAllSpells, useGetFavouriteSpells } from "../api/spell";

function SpellLists({ value }: { value: string }) {
  const { data, isPending: isAllSpellsPending } = useGetAllSpells();
  const { data: favouriteSpellsList, isPending } = useGetFavouriteSpells();

  const [spellIndexToOpenDialog, setStoreSpellIndexToOpenDialog] =
    React.useState<string>("");

  const [filteredSpellByName, setFilteredSpellByName] = useState<Spell[]>([]);

  const handleClickOpen = (spellId: string) => {
    setStoreSpellIndexToOpenDialog(spellId);
  };

  const handleClose = () => {
    setStoreSpellIndexToOpenDialog("");
  };

  useEffect(() => {
    if (data) {
      const filteredResponse = data.results.filter((data) => {
        return data.index.startsWith(value.toLowerCase());
      });
      setFilteredSpellByName(filteredResponse);
    }
  }, [data, value]);

  return (
    <>
      {filteredSpellByName.length === 0 && !isAllSpellsPending && (
        <Typography align="center" variant="h1">
          No data found !
        </Typography>
      )}

      <CommonSpellCard
        handleClickOpen={handleClickOpen}
        spells={filteredSpellByName}
      />
      {favouriteSpellsList?.length === 0 && !isPending && (
        <Typography align="center" variant="h1">
          No data found !
        </Typography>
      )}
      {favouriteSpellsList && (
        <>
          <Divider>
            <Typography variant="h1">Favourite Card</Typography>
          </Divider>
          <CommonSpellCard
            handleClickOpen={handleClickOpen}
            spells={favouriteSpellsList}
          />
        </>
      )}

      {spellIndexToOpenDialog && (
        <SpellDetailComponent
          spellIndexToOpenDialog={spellIndexToOpenDialog}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

export default SpellLists;

function CommonSpellCard({
  spells,
  handleClickOpen,
}: {
  spells: Spell[];
  handleClickOpen: (spellId: string) => void;
}) {
  return (
    <Grid>
      {spells.map(({ index: spellId }, index) => {
        return (
          <SpellCard
            index={spellId}
            key={`${spellId}_${index}`}
            handleClickOpen={handleClickOpen}
          />
        );
      })}
    </Grid>
  );
}
